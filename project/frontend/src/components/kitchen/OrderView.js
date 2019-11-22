import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../layouts/Loader';
import OrderBox from './OrderBox';
import {getOrders, viewOrderItems} from '../../actions/order';
import {getItems} from '../../actions/items';

function OrderView(props) {
	useEffect( ()=> {
		props.getOrders();
		props.getItems();
		props.viewOrderItems();
	}, [])

	const filtered_order = props.orders.filter( o => o.is_completed === false);
	return (
		<div className="container my-4">
			{ props.o_loading &&  props.i_loading ? 
				<Loader />
			  :
			  <Fragment>
				{
					filtered_order.length > 0 ?
					  <div className="d-flex flex-wrap">
					  {
					  	filtered_order.map( order => (
					  		<OrderBox order={order} key={order.id} />
					  	))
					  }
					  </div>
					  :
					  <div className="jumbotron d-flex justify-content-center flex-column text-center vh-100">
						<h3>
							No Current Order.
						</h3>
					  </div>
				}
			  </Fragment>
			}
		</div>
	);
}

OrderView.propTypes = {
	getOrders: PropTypes.func.isRequired,
	getItems: PropTypes.func.isRequired,
	orders: PropTypes.array.isRequired,
	o_loading: PropTypes.bool.isRequired,
	i_loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	orders: state.order.orders,
	o_loading: state.order.loading,
	i_loading: state.items.loading,
});


export default connect(mapStateToProps,
	{getOrders, getItems,viewOrderItems})(OrderView);
