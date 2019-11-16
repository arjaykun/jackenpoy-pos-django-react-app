import axios from 'axios';
import { CREATE_ORDER, CLEAR_CART } from './types';
import { createMessage } from './messages';
import createHeader from './createHeader';

// CREATE ORDER
export const createOrder = (order, orderitems) => (dispatch, getState) => {
	console.log('creating order');
	
	// create header
	const config = createHeader(getState().auth.token);

	axios.post('api/orders/', order, config)
		.then( res => {
			orderitems.forEach( item => {
				axios.post('api/orderitems/',
					{	
						item:item.id, 
						quantity:item.quantity,
						subtotal:item.subtotal, 
						discounted_price: item.discounted_price,
						order:res.data.id
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


