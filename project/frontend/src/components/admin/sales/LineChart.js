import React, { Fragment, useState } from 'react';
import {Line} from 'react-chartjs-2'
function BarChart(props) {

	const data = {
		labels: props.labels,
		datasets: [
			{
				label: props.label,
				data: props.data,
				backgroundColor: props.bgColor
			}
		]
	}

	return (
		<Fragment>
			<div className="card p-2"> 
				<Line
					data={data}
					options={{ maintainAspectRatio: false }}
					height={300}
				/>
			</div>
			
		</Fragment>
	);
}


export default BarChart
