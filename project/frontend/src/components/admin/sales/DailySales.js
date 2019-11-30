import React, { Fragment } from 'react';

function DailySales(props) {
	return (
		<Fragment>

			  <table className="table">
				    <thead className="thead-dark">
				      <tr>
				        <th>
				        	<div className="d-flex">
				        		<div className="mr-2">Date</div>
					        	<div  className="text-light"
					        		style={{cursor:"pointer"}}
					        		onClick={ ()=> props.getSales('api/dsales?ordering=date')}>
					        		<i className="fas fa-arrow-up"></i>
					        	</div>
					        	<div className="text-light"
					        		style={{cursor:"pointer"}}
					        		onClick={ ()=> props.getSales('api/dsales?ordering=-date')}>
					        		<i className="fas fa-arrow-down"></i>
					        	</div>
				        	</div>
				        </th>
				        <th>Order Count</th>
				        <th>Total Sales</th>
				      </tr>
				    </thead>
				    <tbody>
			     		{
			     			props.sales.map( (item, index) => (
			     				<tr key={index}>
			     					<td>{new Date(item.date).toDateString()}</td>
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
			     				), 0).toFixed(2)}
			     			</td>
			     		</tr>
				    </tbody>
			  </table>

		</Fragment>
	);
}


export default DailySales
