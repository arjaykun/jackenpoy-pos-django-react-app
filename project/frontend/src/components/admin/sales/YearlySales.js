import React, { Fragment } from 'react';
import Reports from './Reports';
import LineChart from './LineChart';
import moment from 'moment'

function YearlySales(props) {
	return (
		<Fragment>
			<div className="row mb-2">
		  	  <div className="col-md-6">
				  <LineChart 
				  	label="Yearly Sales" 
				  	labels={props.sales.map( s => moment(s.date).format("YYYY"))} 					
				 	data={props.sales.map( s => s.sales)}
				 	bgColor="rgba(255,153,0,0.6)"	
				  />
			  </div>
			  <div className="col-md-6">
				  <LineChart 
				  	label="Yearly Order Count" 
				  	labels={props.sales.map( s => moment(s.date).format("YYYY"))} 					
				 	data={props.sales.map( s=> s.count)}
				 	bgColor="rgba(153,255,51,0.6)"
				  />
			  </div>
		  </div>
		  <Reports sales={props.sales} />
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
		     					<td>&#8369;{item.sales.toFixed(2)}</td>
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


export default YearlySales
