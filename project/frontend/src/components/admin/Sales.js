import React, { Fragment, useEffect } from 'react';
import {  connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminNav from './AdminNav';
import {getOrders} from '../../actions/order';

function Sales(props) {
	const user = props.user;

	useEffect( () => {
		props.getOrders();
	}, []);

	return(
		<Fragment>
			{
				<div className="container my-3 p-3 border">
					<AdminNav option="sales" />
					<br />
					<h4>Sales Logs</h4>
					<table className="table mt-3">
					    <thead className="thead-dark">
					      <tr>
					        <th>Date</th>
					        <th>Order Taken</th>
					        <th>Total Sales</th>
					      </tr>
					    </thead>
					    <tbody>
				     	
					    </tbody>
				  </table>
				</div>
			}
		</Fragment>
	)
}

Sales.propTypes = {
	user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps, {getOrders})(Sales);