import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createOrder } from '../../actions/order';
import Loader from './Loader';
import $ from 'jquery';


var hideModal = () => {
  $("#orderModal").hide();
};

function OrderModal(props) {

	const cart = props.cart;
	const order = props.order;
	const [payment, setPayment] = useState(0);
	const [change, setChange] = useState(0);
	const [error, setError] = useState("");
	const [dine, setDine] = useState(true);

	const hangeChange = (value) => {
		setPayment(value);
		if(/^[0-9 ]+$/.test(value)) {
			
			const newChange = Number(value) - Number(cart.total);
			if(newChange >= 0) {
				setChange(newChange);
			} else {
				setChange(0);
			}
			setError('');
		} else {
			setPayment(value);
			setChange(0);
			setError("Invalid characters on payment.");
		}
	}

	const handeSubmit = (event) => {
		event.preventDefault();
		if(payment !== '') {
			if(payment < cart.total ) {
				setError("Invalid payment value.")
				return;
			}
		} else {
			setError("Payment has no value.")
		}
		console.log(payment)
		// hideModal();
		// props.createOrder(
		// 	{ 
		// 		'user': props.user.id, 
		// 		'total_price': cart.total, 
		// 		'discounted_price': cart.discounted,
		// 		'is_dine': dine,
		// 	}, 
		// 	cart.items
		// )
	}


	return(
		<Fragment>
		  <div className="modal fade" id="orderModal">
		    <div className="modal-dialog modal-md">
		      <div className="modal-content bg-light">
		      
		        <div className="modal-header">
		          <h3 className="modal-title text-center">
		          	Tendering <i className="fas fa-calculator text-primary"> </i>
		          </h3>
		          <button type="button" className="close" data-dismiss="modal">&times;</button>
		        </div>
		        <form className="form">
			        <div className="modal-body">
			        	<div className="bg-info p-3 card text-light mb-1">
			        		<h1>Amount Due: <strong>&#8369;{cart.total}</strong></h1>
			        	</div>
			        	<div className="bg-dark p-3 card text-light">	
				        	<h3>Customer Bill/ Payment: </h3>
				        	<input 
				        		className="form-control text-center mb-1" 
				        		value={payment} 
				        		onClick={(e) => e.target.value = ""}
				        		onChange={(e) => hangeChange(e.target.value)} />
				        	{error !== "" ? 
				        		<div className="alert alert-danger">
				        			<strong>Warning! </strong>
				        			{error}
				        		</div>:''
				        	}
			        		<div className="mt-2 d-flex">
				        		<h3 className="w-50 border border-light p-2 ">
				        			Discounted: <br/><strong>&#8369; {cart.discounted}</strong>
				        		</h3>
				        		<h3 className="w-50 border border-light p-2">
				        			Change: <br/><strong>&#8369; {change}</strong>
				        		</h3>
			        		</div>

							<div className="form-group float-right">
							    <div className="form-check">
							      <input className="form-check-input" type="checkbox" id="take-out" 
							        value={dine}
							      	onChange={(e)=> setDine(!e.target.checked)}/>
							      <label className="form-check-label" htmlFor="take-out">
							         Take out <i className="fas fa-basket"></i>
							       </label>
							    </div>
						  </div>
			        	</div>
			        </div>

			        <div className="modal-footer">
				          <button type="button" 
				          	className="btn btn-primary"
				          	disabled={error}
				          	data-dismiss="modal"
				          	onClick={handeSubmit}
				          >Tender</button>
				          <button 
				          	type="button" 
				          	className="btn btn-secondary" 
				          	data-dismiss="modal">
				          		Cancel
				           </button>
			      	 </div>
		         </form>
		      </div>
		    </div>
		  </div>
		</Fragment>
	)
}

OrderModal.propTypes = {
	cart: PropTypes.object.isRequired,
	order: PropTypes.object.isRequired,
	createOrder: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	cart: state.cart,
	order: state.order,
	user: state.auth.user,
});


export default connect(mapStateToProps, { createOrder })(OrderModal);
