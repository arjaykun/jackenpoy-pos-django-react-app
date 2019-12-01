import React, { Fragment } from 'react';
import Panel from './Panel'

function SalePanels(props) {
	const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
					'September', 'October', 'November', 'December']
	return (
		<Fragment>
			<div className="row mt-3 px-1">

				 <div className="col-sm-3 mb-1">
				 	<Panel 
				 		title="Daily Sales" 
				 		subtitle={ new Date().toDateString()}
				 		color="primary"
				 		icon="fas fa-ruble-sign">
			                &#8369;{!props.loading? 
			                	props.daily.filter(s => new Date(s.date).toDateString() === new Date().toDateString())
			                			   .reduce( (a,b) => (
		     						a+ Number(b.sales)), 0).toFixed(2)
		                		: <div className="spinner-border text-light"></div>}
            		</Panel>
				 </div>


				 <div className="col-sm-3 mb-1">
				 	<Panel 
				 		title="Daily Order Count" 
				 		subtitle={ new Date().toDateString()}
				 		color="info"
				 		icon="fas fa-shopping-bag">
			                # {!props.loading? 
			                	props.daily.filter(s => new Date(s.date).toDateString() === new Date().toDateString())
			                			   .reduce( (a,b) => (
		     						a+ Number(b.count)), 0)
		                		: <div className="spinner-border text-light"></div>}
            		</Panel>
				 </div>

				
				 <div className="col-sm-3 mb-1">
					  <Panel 
					  	title="Yearly Sales" 
					  	subtitle={ new Date().getFullYear() }
					  	color="success"
					  	icon="fas fa-money-bill-alt">
					              &#8369;{!props.loading? 
			                	props.yearly.filter(s => new Date(s.date).getYear() === new Date().getYear())
			                			   .reduce( (a,b) => (
		     						a+ Number(b.sales)), 0).toFixed(2)
		                		: <div className="spinner-border text-light"></div>}
		            	</Panel>
				 </div>

				 <div className="col-sm-3 mb-1">
					 <Panel 
					 	title="Monthly Sales" 
					 	subtitle={ month[new Date().getMonth()] }
					 	color="danger"
					 	icon="fas fa-money-bill-wave">
				               &#8369;{!props.loading? 
		                	props.monthly.filter(s => new Date(s.date).getMonth() === new Date().getMonth() &&
		                		 new Date(s.date).getYear() === new Date().getYear())
		                			   .reduce( (a,b) => (
	     						a+ Number(b.sales)), 0).toFixed(2)
	                		: <div className="spinner-border text-light"></div>}
	            	</Panel>
				 </div>

			 </div>

			 <div className="row mt-3 px-1">
				 <div className="col-sm-3 mb-1">
					 <Panel 
					 	title="Monthly Order Count" 
					 	subtitle={ month[new Date().getMonth()] }
					 	color="warning"
					 	icon="fas fa-shopping-basket">
				               # {!props.loading? 
		                	props.monthly.filter(s => new Date(s.date).getMonth() === new Date().getMonth() &&
		                		 new Date(s.date).getYear() === new Date().getYear())
		                			   .reduce( (a,b) => (
	     						a+ Number(b.count)), 0)
	                		: <div className="spinner-border text-light"></div>}
	            	</Panel>
				 </div>

				 <div className="col-sm-3 mb-1">
					  <Panel 
					  	title="Yearly Order Count" 
					  	subtitle={ new Date().getFullYear() }
					  	color="dark"
					  	icon="fas fa-shopping-cart">
					              # {!props.loading? 
			                	props.yearly.filter(s => new Date(s.date).getYear() === new Date().getYear())
			                			   .reduce( (a,b) => (
		     						a+ Number(b.count)), 0)
		                		: <div className="spinner-border text-light"></div>}
		            	</Panel>
				 </div>
			 </div>

		</Fragment>
	);
}


export default SalePanels
