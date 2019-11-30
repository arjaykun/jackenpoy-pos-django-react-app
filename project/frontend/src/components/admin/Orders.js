import React, { Fragment, useEffect, useState } from 'react';
import {  connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminNav from './AdminNav';
import {getOrders} from '../../actions/order';
import Loader from '../layouts/Loader';
import Rodal from 'rodal';
import ConfirmForm from './ConfirmForm';
import ViewModal from './ViewModal';
import {viewOrderItems} from '../../actions/order';

function Orders(props) {

	useEffect( () => {
		props.viewOrderItems();
		props.getOrders();
	}, []);

	const [confirmModal, setConfirmModal] = useState(false);
	const [confirmModal2, setConfirmModal2] = useState(false);
	const [viewModal, setViewModal] = useState(false);
	const [order, setOrder] = useState({});
	const [orderId, setOrderId] = useState(0);
	const [search, setSearch] =useState('');
	const [orderItems, setOrderItems] = useState([]);

	const handleComplete = order=> {
		setOrder(order);
		setConfirmModal(true);
	}

	const handleDelete = order=> {
		setOrderId(order);
		setConfirmModal2(true);
	}

	const handleView = (order, oi) => {
		setOrder(order);
		setOrderItems(oi)
		setViewModal(true);

	}

	return(
		<Fragment>
				{props.loading? <Loader />: 
				<div className="container my-3 p-3 border">
					<AdminNav option="orders" />
					<br />
					<div className="d-flex justify-content-between flex-wrap">
						<h4>Order Logs ( results: {props.count} )</h4>

						<div className="input-group w-25">
						  <input type="text" className="form-control" value={search} 
						 	 placeholder="Search here..." 
						 	 onChange={ (e) => setSearch(e.target.value) }/>
						  <div className="input-group-append">
						    <button className="btn btn-outline-primary" type="button"
						    	onClick={ 
						    		()=> props.getOrders(`api/orders?search=${search}`)}
						    >
						    	<i className="fas fa-search"></i>
						    </button>
						  </div>
						</div>	
					</div>

					<table className="table mt-3">
					    <thead className="thead-dark">
					      <tr>
					        <th>OR #</th>
					        <th>Taken By</th>
					        <th>Partial</th>
					        <th>Discounted</th>
					        <th>Total</th>
					        <th>
					        	<div className="d-flex">
					        		<div className="mr-2">Date</div>
						        	<div  className="text-light"
						        		style={{cursor:"pointer"}}
						        		onClick={ ()=> props.getOrders('api/orders?ordering=ordered_date')}>
						        		<i className="fas fa-arrow-up"></i>
						        	</div>
						        	<div className="text-light"
						        		style={{cursor:"pointer"}}
						        		onClick={ ()=> props.getOrders('api/orders?ordering=-ordered_date')}>
						        		<i className="fas fa-arrow-down"></i>
						        	</div>
					        	</div>
					        </th>
					        <th>Time</th>
					        <th>Type</th>
					        <th>Status</th>
					        <th>Actions</th>
					      </tr>
					    </thead>
					    <tbody>
					      {
					      	props.count > 0 ?
					      	props.orders.map( o => (
					      	   <tr key={o.id}>
						        <td>{o.or_number}</td>
						        <td>{props.users.find( u => u.id === o.user).username}</td>
						        <td>&#8369;
						        	{Number(o.total_price) + Number(o.discounted_price)}
						        </td>
						        <td>&#8369;{o.discounted_price}</td>
						        <td>&#8369;{o.total_price} </td>
						     	<td>
						     		{new Date(o.ordered_date).toDateString()}
						     	</td>
						     	<td>
						     		{new Date(o.ordered_date).toLocaleTimeString()}
						     	</td>
						     	<td>
						     		{o.is_dine? "Dine-in" : "Take-out"}
						     	</td>
						     	<td>
						     		{o.is_completed? 
						     			<span className="badge badge-pill badge-success">completed</span>
						     			:<span className="badge badge-pill badge-warning">ongoing</span>
						     		}
						     	</td>
						        <td>
						        <div className="d-flex">
										{o.is_completed?
										<span></span>
										:
										<button 
											className="btn text-light bg-success rounded-circle mr-1"
											onClick={() => handleComplete(o)}
										>
											<i className="fas fa-check"></i>
										</button>
										}
										<button 
											className="btn text-light bg-info rounded-circle mr-1"
											onClick={() => handleView(o, o.order_items)}
										>
											<i className="fas fa-list"></i>
										</button>

										<button 
											className="btn text-light bg-danger rounded-circle mr-1"
											onClick={() => handleDelete(o.id)}
										>
											<i className="fas fa-trash"></i>
										</button>
									</div>
						        </td>
						      </tr>
					      	)) :
					      	<tr>
					      		<td colSpan="10" className="text-center">
					      			<div className="jumbotron"><h1>No Search Results</h1></div>
					      		</td>
					      	</tr>
					      }
					    </tbody>
				  </table>
				  <div className="d-flex justify-content-center w-100">
				  	<button className="btn btn-info mx-1"
				  		disabled={props.previous!== null? false : true}
				  		onClick={ ()=> props.getOrders(props.previous)} 
				  		>
				  		PREVIOUS
				  	</button>
				  	<button className="btn btn-info mx-1"
				  		disabled={props.next!== null? false : true}
				  		onClick={ ()=> props.getOrders(props.next)} 
				  		>
				  		NEXT
				  	</button>
				  </div>
				</div>
			}

			<Rodal 
			 	visible={confirmModal} 
			 	onClose={ () => setConfirmModal(false)}
			 	closeOnEsc={true}
			 	width={400}
			 	height={170}
			 	animation="flip"
			 	leaveAnimation="door"
			 	>
			 		<ConfirmForm
			 			text="Are you sure you want to set this order completed?"
			 			id={order}
			 			title="orders" 
			 			close={() => setConfirmModal(false)}/>
			 </Rodal>

			 <Rodal 
			 	visible={confirmModal2} 
			 	onClose={ () => setConfirmModal2(false)}
			 	closeOnEsc={true}
			 	width={400}
			 	height={170}
			 	animation="flip"
			 	leaveAnimation="door"
			 	>
			 		<ConfirmForm
			 			text="Are you sure you want to delete this order?"
			 			id={orderId}
			 			title="d_orders" 
			 			close={() => setConfirmModal2(false)}/>
			 </Rodal>

			  <Rodal 
			 	visible={viewModal} 
			 	onClose={ () => setViewModal(false)}
			 	closeOnEsc={true}
			 	width={500}
			 	height={500}
			 	animation="flip"
			 	leaveAnimation="door"
			 	>
			 	 <ViewModal order={order} orderItems={orderItems} />
			 </Rodal>
		</Fragment>
	)
}

Orders.propTypes = {
	orders: PropTypes.array.isRequired,
	viewOrderItems: PropTypes.func.isRequired,
	getOrders: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	users: PropTypes.array.isRequired,
	count: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
	orders: state.order.orders, 
	count: state.order.count,
	next: state.order.next,
	previous: state.order.previous,
	loading: state.order.loading,
	users: state.users.users,
})

export default connect(mapStateToProps, {getOrders, viewOrderItems})(Orders);