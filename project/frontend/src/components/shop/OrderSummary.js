import React, { Fragment, useEffect, useState }from 'react';
import { connect } from 'react-redux';
import { getCart, removeInCart, clearCart, changeQuantity } from '../../actions/cart';
import PropTypes from 'prop-types';
import QuantityModal from '../layouts/QuantityModal';
import ConfirmModal from '../layouts/ConfirmModal';

function OrderSummary(props) {
	const propTypes = {
		cart: PropTypes.object.isRequired,
		getCart: PropTypes.func.isRequired,
		removeInCart: PropTypes.func.isRequired,
		changeQuantity: PropTypes.func.isRequired,
	}
	const cart = props.cart;
	const [modalData, setModalData] = useState({
		quantity: 0,
		item: {},
	})
	useEffect( ()=> {
		props.getCart();
	}, [])

	return (
		<Fragment>
			<h3 className="text-center">Order Summary <i className="text-primary fas fa-cart-plus"></i></h3>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Item</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Subtotal</th>
						<th>{
							(cart.items.length > 1) ?
							<button 
									className="btn btn-warning text-light"
									data-toggle="modal" 
								 	data-target="#confirmModal"
								>
								<i className="fas fa-trash"></i>
							</button>
							: <div></div>
						}</th>
					</tr>
				</thead>
				<tbody>
				{
				    (cart.items.length > 0) ? 
					cart.items.map( item => (
						<tr key={item.id}>
							<td>{item.name}</td>
							<td>&#8369;{item.price}</td>
							<td>
								{item.quantity}
								<button className="btn text-info" 
								 		data-toggle="modal" 
								 		data-target="#myModal"
								 		onClick={() => setModalData({
								 			quantity: item.quantity,
								 			item: item
								 		})}
								 		>
								 	<i className="fas fa-edit"></i>
								 </button>
							</td>
							<td>&#8369;{ item.price * item.quantity }</td>
							<td className="text-danger">
								<i 
									className="fas fa-window-close fa-2x"
									onClick={() => props.removeInCart(item.id, item.name)}
								></i>
							</td>
						</tr>
					))
					:<tr>
						<td colSpan="5" className="text-center">No Order Yet</td>
					</tr>
				}
				<tr>
					<td colSpan="5" className="text-right">
						<h3>Total: <strong>&#8369;{cart.total}</strong> </h3>
					</td>
				</tr>

				</tbody>
			</table>
			<QuantityModal 
				data={modalData}
				onClick={ () => props.changeQuantity(modalData.item, modalData.quantity)}
				onChange={ qty => setModalData({item: modalData.item, quantity:qty})}
			/>
			<ConfirmModal 

			/>
		</Fragment>
	)
}

const mapStateToProps = state => ({
	cart: state.cart,
});

export default connect(mapStateToProps, 
		{getCart, removeInCart, clearCart, changeQuantity})(OrderSummary);
