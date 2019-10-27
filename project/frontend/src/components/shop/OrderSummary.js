import React, { Fragment, useEffect, useState }from 'react';
import { connect } from 'react-redux';
import { getCart, removeInCart, clearCart, changeQuantity, addDiscount } from '../../actions/cart';
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
						<th className="w-25">Item</th>
						<th className="w-25">Price</th>
						<th className="w-25">Qty</th>
						<th className="w-25">Subtotal</th>
						<th className="w-25">{
							(cart.items.length > 1) ?
							<button 
									className="btn btn-warning text-light rounded-circle"
									data-toggle="modal" 
								 	data-target="#confirmModal"
								>
								<i className="fas fa-trash"></i>
							</button>
							: <div></div>
						}
					    </th>
						
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
							</td>
							<td>
								{(item.discounted_price) ?
								<div>
									<del className="text-secondary">
										&#8369;{ item.price * item.quantity }
									</del>
									<span className="ml-1">&#8369;{item.discounted_price}</span>
								</div>
								:
									<span>&#8369;{ item.price * item.quantity }</span>
								}
							</td>
							<td>
								<div className="d-flex">
									<button 
										className="btn text-light bg-danger rounded-circle mr-1"
										onClick={() => props.removeInCart(item.id, item.name)}
									>
										<i className="fas fa-times "></i>
									</button>
									<button className="btn text-light bg-info rounded-circle mr-1" 
									 		data-toggle="modal" 
									 		data-target="#myModal"
									 		onClick={() => setModalData({
									 			quantity: item.quantity,
									 			item: item
									 		})}
									 		>
									 	<i className="fas fa-pen"></i>
									 </button>
									 <button 
										className="btn text-light bg-success rounded-circle"
										onClick={() => props.addDiscount(item)}
										>
										{ item.discounted_price > 0 ?
											<i className="fas fa-tag "></i> : 
											<i className="fas fa-percent "></i>
										}
									</button>
								</div>
							</td>
						</tr>
					))
				
					:<tr>
						<td colSpan="5" className="text-center">No Order Yet</td>
					</tr>
				}
				</tbody>
			</table>
			
			{
				(cart.items.length> 0)?
					<Fragment>
						<div className="text-right bg-secondary p-3">
							<h3>Amount Due: <strong>&#8369;{cart.total}</strong> </h3>
						</div>
						<button className="btn btn-primary btn-block">
							Checkout <i className="fas fa-check-circle"></i> 
						</button>
					</Fragment>
				:
					<div></div>
			}
			<QuantityModal 
				data={modalData}
				onClick={ () => props.changeQuantity(modalData.item, modalData.quantity)}
				onChange={ qty => setModalData({item: modalData.item, quantity:qty})}
			/>
			<ConfirmModal 
				onClickYes={ () => props.clearCart()}
			/>
		</Fragment>
	)
}

const mapStateToProps = state => ({
	cart: state.cart,
});

export default connect(mapStateToProps, 
		{getCart, removeInCart, clearCart, changeQuantity, addDiscount})(OrderSummary);
