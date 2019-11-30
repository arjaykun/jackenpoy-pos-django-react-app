import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import OrderModal from '../layouts/OrderModal';
import OrderModal from './OrderModal';
import Rodal from 'rodal';


function Order(props) {
 const [orderModal, setOrderModal] = useState(false);
 const cart = props.cart;
 return (
 	<Fragment>
		<div className="text-right bg-secondary p-3">
			<h3>Amount Due: <strong>&#8369;{cart.total}</strong> </h3>
		</div>
		<button 
			className="btn btn-primary btn-block"
			onClick={ () => setOrderModal(true) }
		>
				Checkout <i className="fas fa-check-circle"></i> 
		</button>

		<Rodal 
		 	visible={orderModal} 
		 	onClose={ () => setOrderModal(false)}
		 	closeOnEsc={true}
		 	width={850}
		 	height={600}
		 	animation="flip"
		 	>
		 	<OrderModal
	 			close={() => setOrderModal(false)} />
		 </Rodal>

		
	</Fragment>
 )
}


const mapStateToProps = state => ({
	cart: state.cart
});


export default connect(mapStateToProps)(Order);