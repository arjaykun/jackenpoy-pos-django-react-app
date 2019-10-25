import { GET_CART, 
		ADD_ITEM_IN_CART, 
		REMOVE_ITEM_IN_CART,
		CLEAR_CART,
		CHANGE_QUANTITY } from '../actions/types.js';

const initialState = {
	items: [],
	discount: 0, 
	total: 0,
};

function getItem(items, item) {
	if(items.filter(i => i.id === item.id).length > 0) {
		const mapped_items = items.map( i => {
			if(i.id === item.id) {
				return {...i, quantity: parseInt(i.quantity) + 1} 
			}
			return i;
		});

		return mapped_items;	
	}
	return [...items, item];
}

function changeQuantity(items, item, quantity) {
	const mapped_items = items.map( i => {
			if(i.id === item.id) {
				return {...i, quantity: quantity} 
			}
			return i;
		});

	return mapped_items;	
}

function getTotal(items, item) {
	const current_item_subtotal = parseFloat(item.price) * parseFloat(item.quantity);
	if(items.length !== 0){
		return items
			.map( i => (parseFloat(i.price) * parseFloat(i.quantity)))
			.reduce( (a,b) => a+b ) + current_item_subtotal;

	}
	return current_item_subtotal;
}

export default function(state=initialState, action) {
	switch(action.type) {
		case GET_CART:
			return {
				...state, 
				items: action.payload,
			}
		case ADD_ITEM_IN_CART:
			return{
				...state,
				items: getItem(state.items, action.payload.item),
				total: getTotal(state.items, action.payload.item),
			}
		case REMOVE_ITEM_IN_CART:
			return {
				...state,
				items: state.items.filter( i => i.id !== action.payload),
				total: getTotal(state.items.filter( i => i.id !== action.payload), 
					{price: 0, quantity: 0})
			}
		case CHANGE_QUANTITY:
			return {
				...state, 
				items: changeQuantity(state.items, action.payload.item, action.payload.quantity),
				total: getTotal(state.items.filter( i=> i.id !== action.payload.item.id), 
					{...action.payload.item, quantity: parseInt(action.payload.quantity)}),
			}
		case CLEAR_CART:
			return {
				items: [],
				total: 0,
				discount: 0,
			}
		default:
			return state;
	}
}