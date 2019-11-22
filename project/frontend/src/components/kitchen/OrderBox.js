import React, {Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {completeOrder} from '../../actions/order';
function OrderBox(props) {
	
	const order = props.order;
	const new_order_items = props.order_items.filter( o=>o.order === order.id)
	
	const styles = {
		width: '30%'
	};

	return (
		<div className="card p-2 m-1" style={styles}>
			<h5>OR# {order.or_number}</h5>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>ITEM</th>
						<th>QTY</th>
					</tr>				
				</thead>
				<tbody>
					{
						new_order_items.map( o => (
							<tr key={o.item}>
								<td>{props.items.filter( i=> i.id === o.item).map( i => i.name).join()}</td>
								<td>{o.quantity}</td>
							</tr>
						))
					}
				</tbody>
			</table>
			<button 
				className="btn text-light bg-success"
				onClick={() => props.completeOrder(order)}
			>
				Complete <i className="fas fa-check-circle"></i>
			</button>
		</div>
	);
}

OrderBox.propTypes = {
	items: PropTypes.array.isRequired,
	order_items: PropTypes.array.isRequired,
	completeOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	items: state.items.items,
	order_items: state.order.order_items,
})

export default connect(mapStateToProps,{completeOrder})(OrderBox)
