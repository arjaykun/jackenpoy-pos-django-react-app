import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderModal from '../layouts/OrderModal';


function Order(props) {
 const propTypes = {
 	cart: PropTypes.object.isRequired,
 	createOrder: PropTypes.func.isRequired,
 }
 const cart = props.cart;
 const order = props.order;
 return (
 	<Fragment>
		<div className="text-right bg-secondary p-3">
			<h3>Amount Due: <strong>&#8369;{cart.total}</strong> </h3>
		</div>
		<button 
			className="btn btn-primary btn-block"
			data-toggle="modal" 
			data-target="#orderModal" >
				Checkout <i className="fas fa-check-circle"></i> 
		</button>

		<OrderModal />
	</Fragment>
 )
}

const mapStateToProps = state => ({
	cart: state.cart,
	order: state.order,
});


export default connect(mapStateToProps)(Order);