import axios from 'axios';
import { CREATE_ORDER, CLEAR_CART } from './types';
import { createMessage } from './messages';

// CREATE ORDER
export const createOrder = (order, orderitems) => dispatch => {
	console.log('creating order');
	axios.post('api/orders/', order)
		.then( res => {
			orderitems.forEach( item => {
				axios.post('api/orderitems/', 
					{	
						item:item.id, 
						quantity:item.quantity,
						subtotal:item.subtotal, 
						discounted_price: item.discounted_price,
						order:res.data.id
					})
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
