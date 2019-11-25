import React, { Fragment, useState } from 'react';
import Panel from './Panel'
import {Pie} from 'react-chartjs-2'
function PieChart(props) {

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
				<Pie
					data={data}
					options={{ maintainAspectRatio: false }}
					height={300}
				/>
			</div>
			
		</Fragment>
	);
}


export default PieChart
