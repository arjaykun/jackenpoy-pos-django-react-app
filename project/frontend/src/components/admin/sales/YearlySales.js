import React, { Fragment } from 'react';

function YearlySales(props) {
	return (
		<Fragment>

			  <table className="table">
				    <thead className="thead-dark">
				      <tr>
				        <th>Year</th>
				        <th>Order Count</th>
				        <th>Total Sales</th>
				      </tr>
				    </thead>
				    <tbody>
			     		{
			     			props.sales.map( (item, index) => (
			     				<tr key={index}>
			     					<td>{new Date(item.date).getFullYear()}</td>
			     					<td>{item.count}</td>
			     					<td>&#8369;{item.sales}</td>
			     				</tr>
			     			))
			     		}
			     		<tr>
			     			<td colSpan="2" className="text-right">
			     				<strong>TOTAL</strong> 
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


export default YearlySales
