import React, { Fragment, useEffect, useState }from 'react';
import { connect } from 'react-redux';
import { getCart, 
		removeInCart, 
		clearCart, 
		changeQuantity, 
		addDiscount } from '../../actions/cart';
import PropTypes from 'prop-types';
// import QuantityModal from '../layouts/QuantityModal';
import QuantityModal from './QuantityModal';
import ConfirmModal from '../layouts/ConfirmModal';
import Order from './Order';
import Rodal from 'rodal';
function OrderSummary(props) {

	const cart = props.cart;
	const [modalData, setModalData] = useState({
		quantity: 0,
		item: {},
	})
	const [qtyModal, setQtyModal] = useState(false);

	useEffect( ()=> {
		props.getCart();
	}, [])

	const handleQtyClick = (item) => {
		setModalData({
			quantity: item.quantity,
			item: item
		})
		setQtyModal(true);
	}
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
									<span className="ml-1">&#8369;{item.discounted_price.toFixed(2)}</span>
								</div>
								:
									<span>&#8369;{ (item.price * item.quantity).toFixed(2) }</span>
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
									 		onClick={() => handleQtyClick(item)}
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
					<Order />
				:
					<div></div>
			}

			<Rodal 
			 	visible={qtyModal} 
			 	onClose={ () => setQtyModal(false)}
			 	closeOnEsc={true}
			 	width={300}
			 	height={250}
			 	animation="flip"
		 	>
		 		<QuantityModal 
		 			close={ ()=> setQtyModal(false)}
					data={modalData}
					onClick={ () => props.changeQuantity(modalData.item, modalData.quantity)}
					onChange={ qty => setModalData({item: modalData.item, quantity:qty})}
				/>
		 	</Rodal>
			
			<ConfirmModal 
				onClickYes={ () => props.clearCart()}
			/>
		</Fragment>
	)
}

OrderSummary.propTypes = {
	cart: PropTypes.object.isRequired,
	getCart: PropTypes.func.isRequired,
	removeInCart: PropTypes.func.isRequired,
	changeQuantity: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	cart: state.cart,
	items: state.items.items
});

export default connect(mapStateToProps, 
		{getCart, removeInCart, clearCart, changeQuantity, addDiscount})(OrderSummary);
