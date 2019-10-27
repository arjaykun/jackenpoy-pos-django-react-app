import { GET_CART, ADD_ITEM_IN_CART, 
		REMOVE_ITEM_IN_CART, CLEAR_CART, 
		CHANGE_QUANTITY, ADD_DISCOUNT } from './types';
import { createMessage } from './messages';

// GET ITEMS 
export const getCart = () => dispatch => {
	console.log('getting cart items');
	dispatch({
		type: GET_CART,
		payload: [],
	});	
}

//ADD ITEM IN CART
export const addInCart = item => dispatch => {
	console.log('add item in cart');
	dispatch({
		type: ADD_ITEM_IN_CART,
		payload: item,
	});
};

export const changeQuantity = (item, quantity) => dispatch => {
	console.log('change quantity by input');
	dispatch({
		type:CHANGE_QUANTITY,
		payload: {item, quantity},
	});
}

//REMOVE ITEM IN CART
export const removeInCart = (id, name) => dispatch => {
	console.log('remove item in cart');
	dispatch(createMessage({ItemRemoved:`${name} is removed in the order list.`}));
	dispatch({
		type: REMOVE_ITEM_IN_CART,
		payload: id,
	})
};

//CLEAR ALL ITEM IN CART
export const clearCart = () => dispatch => {
	console.log('clear all item in cart');	
	dispatch(createMessage({CartCleared: "Items in the order list is cleared."}));
	dispatch({
		type: CLEAR_CART,
	})	
};

//ADD DISCOUNT TO AN ITEM
export const addDiscount = item => dispatch => {
	console.log('add discount');
	dispatch({
		type: ADD_DISCOUNT,
		payload: item
	})
}