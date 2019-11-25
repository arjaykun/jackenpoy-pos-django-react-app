import React, { Fragment } from 'react';
import BarChart from './BarChart'
import PieChart from './PieChart'

function SaleCharts(props) {
	const l = props.daily.length;
	const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
					'September', 'October', 'November', 'December']
	return (
		<Fragment>

			<div className="row mt-2 px-3">
				<div className="col-md-6">
					<BarChart 
						labels={props.daily.slice(-7).map( s => new Date(s.date).toLocaleDateString())} 
						label="Daily Sales"
						data={props.daily.slice(-7).map( s => s.sales)}
						bg_color={['#303f9f', '#c2185b', '#ffeb3b', '#9c27b0', '#ff5722', '#4caf50', '#2196f3']}
					/>
				</div>

				<div className="col-md-6">
					<PieChart 
						labels={props.daily.slice(-5).map( s => new Date(s.date).toLocaleDateString())} 
						label="Daily Sales"
						data={props.daily.slice(-5).map( s => s.count)}
						bg_color={['#303f9f', '#c2185b', '#ffeb3b', '#9c27b0', '#4caf50']}
					/>
				</div>
				
			</div>


			<div className="row mt-2 px-3">

				<div className="col-md-6">
					<PieChart 
						labels={props.monthly.slice(-5).map( s => month[new Date(s.date).getMonth()])} 
						label="Monthly Sales"
						data={props.monthly.slice(-5).map( s => s.count)}
						bg_color={['#303f9f', '#c2185b', '#ffeb3b', '#9c27b0', '#4caf50']}
					/>
				</div>


				<div className="col-md-6">
					<BarChart 
						labels={props.monthly.slice(-7).map( s => month[new Date(s.date).getMonth()])} 
						label="Monthly Sales"
						data={props.monthly.slice(-7).map( s => s.sales)}
						bg_color={['#303f9f', '#c2185b', '#ffeb3b', '#9c27b0', '#ff5722', '#4caf50', '#2196f3']}
					/>
				</div>
			</div>
		</Fragment>
	);
}


export default SaleCharts
