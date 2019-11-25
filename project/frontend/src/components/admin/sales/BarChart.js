import React, { Fragment, useState } from 'react';
import Panel from './Panel'
import {Bar} from 'react-chartjs-2'
function BarChart(props) {

	const data = {
		labels: props.labels,
		datasets: [
			{
				label: props.label,
				data: props.data,
				backgroundColor: props.bg_color,
			}
		]
	}

	return (
		<Fragment>
			<div className="card p-2"> 
				<Bar
					data={data}
					options={{ maintainAspectRatio: false }}
					height={300}
				/>
			</div>
			
		</Fragment>
	);
}


export default BarChart
