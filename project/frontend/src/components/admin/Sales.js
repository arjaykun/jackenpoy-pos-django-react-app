import React, { Fragment, useState } from 'react';
import {  connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminNav from './AdminNav';
import DailySales from './sales/DailySales';
import MonthlySales from './sales/MonthlySales';
import YearlySales from './sales/YearlySales';
import Loader from '../layouts/Loader';
function Sales(props) {
	const [option, setOption] = useState('daily');
	const dateFiltering = (option === "daily" ? 
								<DailySales sales={props.daily} /> :
						  option === "monthly" ?
						  		<MonthlySales sales={props.monthly} /> :
						  		<YearlySales sales={props.yearly} />	
						  )
	return(
		<Fragment>
			{	
				props.loading ? <Loader />: 
				<div className="container my-3 p-3 border">
					<AdminNav option="sales" />
					<br />
					<div className="d-flex p-1 flex-wrap">
						<div className="mb-1 card py-2 bg-light mr-2">
							<div className="p-1">
								<h4 className="text-center">Filter Sales</h4>
								  <ul className="list-group list-group-flush">
									  <li className="list-group-item">
									  		<button className="btn btn-link text-dark"
												onClick={() => setOption("daily")}				  			
									  		>Daily Sales</button>
									  	</li>
									  <li className="list-group-item">
									  		<button className="btn btn-link text-dark"
									  			onClick={() => setOption("monthly")}
									  		>Monthly Sales</button>
									  </li>
									  <li className="list-group-item">
									  		<button className="btn btn-link text-dark"
									  			onClick={() => setOption("yearly")}
									  		>Yearly Sales</button>
									  </li>
								 </ul> 
							</div>
						</div>
						<div className="card py-2 flex-grow-1">
							<div className="d-flex justify-content-end mb-2">
								<button className="btn btn-danger mr-2">
									Export to PDF
								</button>

								<button className="btn btn-success">
									Export to EXCEL
								</button>
							</div>
							<div className="px-2">
								{dateFiltering}
							</div>
						</div>
						
					</div>
				</div>
			}
		</Fragment>
	)
}

Sales.propTypes = {
	loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
	daily: state.sales.daily_sales,
	monthly: state.sales.monthly_sales,
	yearly: state.sales.yearly_sales,
	loading: state.sales.loading,
})

export default connect(mapStateToProps)(Sales);