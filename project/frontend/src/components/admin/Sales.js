import React, { Fragment, useState, useEffect } from 'react';
import {  connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminNav from './AdminNav';
import DailySales from './sales/DailySales';
import MonthlySales from './sales/MonthlySales';
import YearlySales from './sales/YearlySales';
import Loader from '../layouts/Loader';
import {getSales} from '../../actions/sales';
import DatePicker from 'react-datepicker' 
import moment from 'moment'; 

function Sales(props) {

	useEffect( () => {
		props.getSales()
	}, [])

	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const [option, setOption] = useState('daily');
	const dateFiltering = (option === "daily" ? 
								<DailySales sales={props.daily} getSales={(url) => props.getSales(url)} /> :
						  option === "monthly" ?
						  		<MonthlySales sales={props.monthly} /> :
						  		<YearlySales sales={props.yearly} />	
						  )
	const handleDailySales = () => {
		const start = moment(startDate).format("YYYY-MM-DD")
		const end = moment(endDate).format("YYYY-MM-DD")
		
		props.getSales(`api/dsales?date_after=${start}&date_before=${end}`)
	}

	const handle15DaysFilter = () => {
		const start = moment().subtract(14, 'days').format("YYYY-MM-DD")
		const end = moment().format("YYYY-MM-DD")

		props.getSales(`api/dsales?date_after=${start}&date_before=${end}`)
	}

	const handle7DaysFilter = () => {
		const start = moment().subtract(6, 'days').format("YYYY-MM-DD")
		const end = moment().format("YYYY-MM-DD")

		props.getSales(`api/dsales?date_after=${start}&date_before=${end}`)
	}

	const handleThisMonth = () => {
	 	const start =  moment().startOf('month').format("YYYY-MM-DD");
		const end  = moment().endOf("month").format("YYYY-MM-DD");

		props.getSales(`api/dsales?date_after=${start}&date_before=${end}`)
	}

	const handleLastMonth = () => {
		const last_month = moment().subtract(1, "month");
	 	const start =  moment(last_month).startOf('month').format("YYYY-MM-DD");
		const end  = moment(last_month).endOf("month").format("YYYY-MM-DD");

		props.getSales(`api/dsales?date_after=${start}&date_before=${end}`)
	}




	return(
		<Fragment>
			{	
				props.loading ? <Loader />: 
				<div className="container my-3 p-3 border">
					<AdminNav option="sales" />
					<br />
					<div className="d-flex p-1 flex-wrap">
						<div className="mb-1 card py-2 bg-light w-25">
							<div className="p-1">
								<h4 className="text-center">Filter Sales</h4>
								 <div id="accordion">
								  <div className="card">
								    <div className="card-header bg-dark" id="headingOne">
								      <h5 className="mb-0">
								        <button className="btn btn-link text-light" 
								        	onClick={() => setOption("daily")}
								        	data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								       		Daily Sales
								        </button>
								      </h5>
								    </div>

								    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
								      <div className="d-flex flex-column justify-content-center align-items-center">
								      	
								      	<div className="my-1">
								      		<span>Start Date:</span> <br />
											<DatePicker 
												dateFormat="yyyy-MM-dd"
												selected={startDate} 
												onChange={date => setStartDate(date)}
											 />
								      	</div>

								      	<div>
								      		<span>End Date:</span> <br />
											<DatePicker 
												dateFormat="yyyy-MM-dd"
												selected={endDate} 
												onChange={date => setEndDate(date)}
											 />
								      	</div>

								      	<button 
								      		onClick={ () => handleDailySales() }
								      		className="btn w-75 my-2 px-2 btn-primary">
								      		Filter
								      	</button>

								      </div>
								      <ul className="list-group list-group-flush mt-2">
											<li className="list-group-item">
													<button className="btn btn-link text-dark"
														onClick={ ()=> handle7DaysFilter()}				  							  			
											  		>Last 7 Days</button>
											</li>
											<li className="list-group-item">
													<button className="btn btn-link text-dark"
														onClick={ ()=> handle15DaysFilter()}				  							  			
											  		>Last 15 Days</button>
											</li>
											<li className="list-group-item">
													<button className="btn btn-link text-dark"				  			
											  			onClick={ ()=> handleThisMonth()}
											  		>This Month</button>
											</li>	
											<li className="list-group-item">
													<button className="btn btn-link text-dark"
														onClick={ ()=> handleLastMonth()}				  			
											  		>Last Month</button>
											</li>
									   </ul>

								    </div>
								  </div>
								  <div className="card">
								    <div className="card-header bg-dark" id="headingTwo">
								      <h5 className="mb-0">
								        <button className="btn btn-link collapsed text-light" 
								        	onClick={() => setOption("monthly")}
								         data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
								          MonthlySales
								        </button>
								      </h5>
								    </div>
								    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
								     
								    </div>
								  </div>
								  <div className="card">
								    <div className="card-header bg-dark" id="headingThree">
								      <h5 className="mb-0">
								        <button className="btn btn-link collapsed text-light" 
								        onClick={() => setOption("yearly")}
								        data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								          Yearly Sales
								        </button>
								      </h5>
								    </div>
								    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
								      
								    </div>
								  </div>
								</div>
							</div>
						</div>
						<div className="card py-2 w-75">
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
	getSales: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	daily: state.sales.daily_sales,
	monthly: state.sales.monthly_sales,
	yearly: state.sales.yearly_sales,
	loading: state.sales.loading,
})

export default connect(mapStateToProps, {getSales})(Sales);