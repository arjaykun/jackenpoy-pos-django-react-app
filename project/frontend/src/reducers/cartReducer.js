import { GET_CART, 
		ADD_ITEM_IN_CART, 
		REMOVE_ITEM_IN_CART,
		CLEAR_CART,
		CHANGE_QUANTITY, 
		ADD_DISCOUNT } from '../actions/types.js';

const initialState = {
	items: [],
	total: 0,
};

function getItems(p_items, item=null) {
	const new_items = item ? 
		p_items.filter(i => i.id === item.id).length >= 1 ?
			p_items.map( i=> {
				if(i.id === item.id)
					return {...i, quantity:i.quantity + 1}
				return i;
			}):
			[...p_items, item] : 
		p_items;
	const items = new_items.map( i => {
		const subtotal = Number(i.price) * i.quantity; 
		if(i.discounted_price > 0) {	
			const discounted_price =  subtotal - (subtotal * 0.20);
			return {...i, subtotal: subtotal, discounted_price};
		}
		return {...i, subtotal }
	});

	const total = items.reduce( (total, item) => {
		const subtotal = item.discounted_price > 0 ? 
			item.discounted_price : item.subtotal
		return total + subtotal;
	}, 0);
	return items ? { items, total }: {};
}

function removeItem(items, id) {
	const new_items = items.filter( i => i.id !== id );

	return new_items.length > 0 ? getItems(new_items): initialState; 
}

function changeQuantity(items, item, quantity) {
	const mapped_items = items.map( i => {
			if(i.id === item.id) {
				return {...i, quantity: quantity} 
			}
			return i;
		});

	return getItems(mapped_items);	
}

function addDiscount(items, item) {
	const isDiscounted = item.discounted_price > 0;
	const subtotal = Number(item.price) * Number(item.quantity);
	const discounted_price = isDiscounted ? 0 : subtotal - (subtotal * 0.20);
	const mapped_items = items.map( i => {
		if(i.id === item.id ){
			return isDiscounted ? {...i, discounted_price, subtotal}: {...i, discounted_price};
		}
		return i;
	});

	return getItems(mapped_items);
}


export default function(state=initialState, action) {
	switch(action.type) {
		case GET_CART:
			return {
				...state, 
				items: [],
				total: 0
			}
		case ADD_ITEM_IN_CART:
			return{
				...state,
				items: getItems(state.items, action.payload).items,
				total: getItems(state.items, action.payload).total
			}
		case REMOVE_ITEM_IN_CART:
			return {
				...state,
				items: removeItem(state.items, action.payload).items,
				total: removeItem(state.items, action.payload).total
			}
		case CHANGE_QUANTITY:
			return {
				...state, 
				items: changeQuantity(state.items, action.payload.item, action.payload.quantity).items,
				total: changeQuantity(state.items, action.payload.item, action.payload.quantity).total
			}
		case CLEAR_CART:
			return {
				items: [],
				total: 0,
			}
		case ADD_DISCOUNT:
			return {
				...state,
				items: addDiscount(state.items, action.payload).items,
				total: addDiscount(state.items, action.payload).total,
			}
		default:
			return state;
	}
}