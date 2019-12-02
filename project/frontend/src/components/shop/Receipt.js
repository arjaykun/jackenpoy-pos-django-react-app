import React from 'react';

class Receipt extends React.Component {
	render() {
		const cart = this.props.cart
		return (
			<div className={`card p-2 ${ this.props.is_print?'w-50':''}`}>
				<div className="text-center">
					<small><u>OR# {this.props.or_number}</u></small> <br/>
					<strong>Jack En Poy</strong> <br/>
					<small>{ new Date().toDateString() }</small>
				</div>
				<table className='w-100'>
					<thead>
						<tr>
							<th className="w-25">QTY</th>
							<th className="w-25">ITEM</th>
							<th className="w-25">PRICE</th>
							<th className="w-25">SUBTOTAL</th>
						</tr>
					</thead>
					<tbody>
						{
							cart.items.map( i => (
								<tr key={i.id}>
									<td>{i.quantity}</td>
									<td>{i.name}</td>
									<td>&#8369;{i.price}</td>
									<td>
										&#8369;{i.discounted_price > 0 ? 
											i.discounted_price.toFixed(2): 
											i.subtotal.toFixed(2)  }
									</td>
								</tr>
							))
						}

						<tr className="border-top">
							<td colSpan="3" className="text-right">Total:</td>
							<td className="ml-1">&#8369;{(Number(cart.total) + Number(cart.discounted)).toFixed(2)}</td>
						</tr>
						<tr>
							<td colSpan="3" className="text-right">Discount:</td>
							<td className="ml-1">&#8369;{Number(cart.discounted).toFixed(2)}</td>
						</tr>

						<tr>
							<td colSpan="3" className="text-right"><h5><strong>Amount Due:</strong></h5></td>
							<td className="ml-1"><h5>&#8369;{Number(cart.total).toFixed(2)}</h5></td>
						</tr>

						<tr className="pt-2 border-top">
							<td colSpan="3" className="text-right">Payment:</td>
							<td className="ml-1"> &#8369;{props.payment}</td>
						</tr>

						<tr>
							<td colSpan="3" className="text-right">Change:</td>
							<td className="ml-1">&#8369;{this.props.change}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}


export default Receipt;
