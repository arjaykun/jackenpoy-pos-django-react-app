import axios from 'axios';
import { CREATE_ORDER, CLEAR_CART, GET_ORDERS, 
	ORDER_LOADING, COMPLETE_ORDER,
	ORDER_DELETE, VIEW_ORDER_ITEMS} from './types';
import { createMessage } from './messages';
import createHeader from './createHeader';

// CREATE ORDER
export const createOrder = (order, orderitems) => (dispatch, getState) => {
	console.log('creating order');
	
	// create header
	const config = createHeader(getState().auth.token);
	const d = new Date();
	const or_number =  d.getMonth() + "" + d.getDay() + "" + d.getHours()
	+ "" + d.getMinutes()  + "" +  Date.now().toString().substring(9)
	console.log(or_number)
	axios.post('api/orders/', {...order, or_number}, config)
		.then( res => {
			orderitems.forEach( item => {
				axios.post('api/orderitems/',
					{	
						item:item.id, 
						quantity:item.quantity,
						subtotal:item.subtotal, 
						discounted_price: item.discounted_price,
						order:res.data.id,
					}, config)
					.then( () => {
						dispatch(createMessage({orderSucess:'An order is completed successfully.'}));
						dispatch({
							type: CLEAR_CART
						})
					})
					.catch( error => console.log(error));
			})
		})
		.catch( error => console.log(error));	
}

//FETCH ALL ORDERS

export const getOrders = () => (dispatch, getState) => {

	// create header
	const config = createHeader(getState().auth.token);
	console.log('getting orders');
	// create user data
	dispatch({type:ORDER_LOADING})
	axios.get('api/orders', config)
		.then(res => {
			dispatch({
				type: GET_ORDERS,
				payload: res.data	
			})
		})	
		.catch(err => {
			dispatch(createError(err.response));
		})
}

//FETCH ALL SELECTED ORDER ITEMS

export const viewOrderItems = () => (dispatch, getState) => {

	// create header
	const config = createHeader(getState().auth.token);
	console.log('getting order items');
	// create user data
	dispatch({type:ORDER_LOADING})
	axios.get(`api/orderitems`, config)
		.then(res => {
			dispatch({
				type: VIEW_ORDER_ITEMS,
				payload: res.data	
			})
		})	
		.catch(err => {
			dispatch(createError(err.response));
		})
}

//COMPLETE THE ORDER BY SETTING STATUS TO COMPLETED

export const completeOrder = order => (dispatch, getState) => {

	// create header
	const config = createHeader(getState().auth.token);
	console.log('completing order');
	// create user data
	delete order.order_items
	const order_ = {...order, is_completed: true}
	dispatch({type:ORDER_LOADING})
	axios.put(`api/orders/${order_.id}`, order_, config)
		.then(res => {
			dispatch(createMessage({orderCompleted:"An order is completed successfully."}))
			dispatch({
				type: COMPLETE_ORDER,
				payload: res.data	
			})
		})	
		.catch(err => {
			console.log(err)
		})
}

//COMPLETE THE ORDER BY SETTING STATUS TO COMPLETED

export const deleteOrder = order => (dispatch, getState) => {

	// create header
	const config = createHeader(getState().auth.token);
	console.log('deleting order');
	// create user data
	dispatch({type:ORDER_LOADING})
	axios.delete(`api/orders/${order}`, config)
		.then(res => {
			dispatch(createMessage({orderDeleted:"An order is deleted successfully."}))
			dispatch({
				type: ORDER_DELETE,
				payload: order	
			})
		})	
		.catch(err => {
			console.log(err)
		})
}

