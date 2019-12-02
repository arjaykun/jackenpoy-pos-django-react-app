import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createOrder } from '../../actions/order';
import Rodal from 'rodal';
import Receipt from './Receipt';
import ReactToPrint from 'react-to-print';

function OrderModal(props) {

	const cart = props.cart;
	const order = props.order;
	const [payment, setPayment] = useState(0);
	const [change, setChange] = useState(0);
	const [error, setError] = useState("");
	const [dine, setDine] = useState(true);
	const receiptRef = useRef()
	const [print, setPrint] = useState(false);
	useEffect( ()=> {
		setPayment(0)
		setChange(0)
	},[cart])

	useEffect( ()=> {
		if(!props.loading) {
			props.close()
		}
	}, [props.loading])

	const getOrNumber = () => {
		const d = new Date();
		const or_number =  d.getMonth() + "" + d.getDay() + "" + d.getHours()
		+ "" + d.getMinutes()  + "" +  Date.now().toString().substring(9);

		return or_number;
	}

	const hangeChange = (value) => {
		setPayment(value);
		if(/^[0-9\. ]+$/.test(value)) {
			
			const newChange = Number(value) - Number(cart.total);
			if(newChange >= 0) {
				setChange(newChange.toFixed(2));
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
			if(/^[0-9\. ]+$/.test(payment)) {
				if(payment < cart.total ) {
					setError("Invalid payment value.")
					return;
				}
				if(payment.split('').filter( char => char === '.').length > 1) {
					setError("Too many decimal points detected.")
					return;
				}
				props.createOrder(
					{ 
						'user': props.user.id, 
						'total_price': cart.total, 
						'discounted_price': cart.discounted,
						'is_dine': dine,
						'or_number': getOrNumber()
					}, 
					cart.items
				)

			} else {
				setError('Invalid characters on payment.')
			}	
		} else {
			setError("Payment has no value.")
		}

		
	}


	return(
		<Fragment>
	          <h3 className="modal-title text-center">
	          	Tendering <i className="fas fa-calculator text-primary"> </i>
	          </h3>
	         <div className="row p-1">
	         	<div className="col-md-6">
	         		<form className="form card p-2">
		        	<div className="bg-info p-3 card text-light mb-1">
		        		<h1>Amount Due: <strong>&#8369;{cart.total.toFixed(2)}</strong></h1>
		        	</div>

		        	<div className="bg-dark p-2 card text-light">	
			        	<h4>Customer Bill/ Payment: </h4>
			        	<input 
			        		className="form-control text-center mb-1" 
			        		value={payment} 
			        		onClick={(e) => e.target.value = ""}
			        		onChange={(e) => hangeChange(e.target.value)} />
			        	{error !== "" ? 
			        		<div className="alert alert-danger alert-small text-center">
			        			{error}
			        		</div>:''
			        	}
		        		<div className="mt-1 d-flex">
			        		<h3 className="w-50 border border-light p-2 ">
			        			Discounted: <br/><strong>&#8369; {cart.discounted.toFixed(2)}</strong>
			        		</h3>
			        		<h3 className="w-50 border border-light p-2">
			        			Change: <br/><strong>&#8369; {change.toFixed(2)}</strong>
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
					  <div className="d-flex justify-content-center">
					  	  <div>
							  <ReactToPrint 
							  	trigger={ ()=> <button className="btn btn-info">
							  						Print
							  					</button 	>}
								content={ ()=> receiptRef.current }
							   />
						  </div>
						  <div className="ml-1">
							  <button type="button" 
						          	className="btn btn-primary"
						          	onClick={handeSubmit}
						          	disabled={props.loading ? true : false}
						          >
						          	Tender 
						          	{ props.loading ? <i className="ml-2 fas fa-spinner fa-pulse"></i>:''}
							  </button>
						  </div>
					</div>	
		         </form>
	         	</div>
	         	<div className="col-md-6">
				  <Receipt cart={cart} ref={receiptRef} payment={payment}
				   change={change} is_print={print} or_number={getOrNumber()} />
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
	loading: state.order.loading,
});


export default connect(mapStateToProps, { createOrder })(OrderModal);
