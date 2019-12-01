import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


function ViewModal(props) {

	const order = props.order
	const o_items = props.order_items
		.filter( i=> i.order === order.id)
		.map( i => (
			<tr key={i.item}>
				<td>{props.items.find( i_ => i_.id === i.item).name}</td>
				<td>&#8369; {props.items.find( i_ => i_.id === i.item).price}</td>
				<td>{i.quantity}</td>
				<td>&#8369; {i.discounted_price? i.discounted_price :i.subtotal }</td>
			</tr>
		))
	return (
		<Fragment>
			<h5>OR# {order.or_number}</h5>
			<div className="overflow-auto">
				<table className="table table-striped mt-3">
					<thead>
						<tr>
							<th className="w-25">Item</th>
							<th className="<w-25></w-25>">Price</th>
							<th className="w-25">Qty</th>
							<th className="w-25">Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{o_items}
					</tbody>
				</table>
				<div className="text-right bg-secondary p-3">
					<h3>Discounted: <strong>&#8369;{order.discounted_price}</strong> </h3>
					<h3>Total: <strong>&#8369;{order.total_price}</strong> </h3>
				</div>
			</div>
		</Fragment>
	)
}

ViewModal.propTypes = {
	order_items: PropTypes.array.isRequired,
	items: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	order_items: state.order.order_items,
	items: state.items.items,
})

export default connect(mapStateToProps)(ViewModal);