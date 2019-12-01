import React, { Fragment } from 'react';
import Moment from 'react-moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import CsvDownloader from 'react-csv-downloader';
import Reports from './Reports'
function DailySales(props) {
	const count = props.sales.reduce( (a,b) => (
 						a+ Number(b.count)), 0)
	const total = props.sales.reduce( (a,b) => (
			     		a+ Number(b.sales)), 0).toFixed(2)

	return (
		<Fragment>
		  <Reports sales={props.sales} />
		  <table className="table dtable">
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
			        <th>
			        	<div className="d-flex">
			        		<div className="mr-2">Order Count</div>
				        	<div  className="text-light"
				        		style={{cursor:"pointer"}}
				        		onClick={ ()=> props.getSales('api/dsales?ordering=count')}>
				        		<i className="fas fa-arrow-up"></i>
				        	</div>
				        	<div className="text-light"
				        		style={{cursor:"pointer"}}
				        		onClick={ ()=> props.getSales('api/dsales?ordering=-count')}>
				        		<i className="fas fa-arrow-down"></i>
				        	</div>
			        	</div>
			        </th>
			        <th>
			        	<div className="d-flex">
			        		<div className="mr-2">Sales</div>
				        	<div  className="text-light"
				        		style={{cursor:"pointer"}}
				        		onClick={ ()=> props.getSales('api/dsales?ordering=sales')}>
				        		<i className="fas fa-arrow-up"></i>
				        	</div>
				        	<div className="text-light"
				        		style={{cursor:"pointer"}}
				        		onClick={ ()=> props.getSales('api/dsales?ordering=-sales')}>
				        		<i className="fas fa-arrow-down"></i>
				        	</div>
			        	</div>
			        </th>
			      </tr>
			    </thead>
			    <tbody>
		     		{
		     			props.sales.map( (item, index) => (
		     				<tr key={index}>
		     					<td><Moment format="MM/DD/YYYY">{item.date}</Moment></td>
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
		     				{count}
		     			</td>
		     			<td>
		     				&#8369;{total}
		     			</td>
		     		</tr>
			    </tbody>
		  </table>

		</Fragment>
	);
}


export default DailySales
