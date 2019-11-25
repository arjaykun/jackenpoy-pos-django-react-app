import React, { Fragment } from 'react';

function MonthlySales(props) {
	const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
					'September', 'October', 'November', 'December']
	return (
		<Fragment>

			  <table className="table">
				    <thead className="thead-dark">
				      <tr>
				        <th>Month</th>
				        <th>Order Count</th>
				        <th>Total Sales</th>
				      </tr>
				    </thead>
				    <tbody>
			     		{
			     			props.sales.map( (item, index) => (
			     				<tr key={index}>
			     					<td>{month[new Date(item.date).getMonth()]}, {new Date(item.date).getFullYear()}</td>
			     					<td>{item.count}</td>
			     					<td>&#8369;{item.sales}</td>
			     				</tr>
			     			))
			     		}
			     		<tr>
			     			<td className="text-right">
			     				<strong>TOTAL</strong> 
			     			</td>
			     			<td>
			     				{props.sales.reduce( (a,b) => (
			     						a+ Number(b.count)
			     				), 0)}
			     			</td>
			     			<td>
			     				&#8369;{props.sales.reduce( (a,b) => (
			     						a+ Number(b.sales)
			     				), 0)}
			     			</td>
			     		</tr>
				    </tbody>
			  </table>

		</Fragment>
	);
}


export default MonthlySales
