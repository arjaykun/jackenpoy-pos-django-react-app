import React, { Fragment, useEffect } from 'react';
import {  connect } from 'react-redux';
import PropTypes from 'prop-types';
import ERROR_404 from '../layouts/ERROR_404';
import { getUsers } from '../../actions/users';
import AdminNav from './AdminNav';
import { getItems } from '../../actions/items';
import { getCategories } from '../../actions/categories';
import {getSales} from '../../actions/sales';
function AdminDashboard(props) {
	const user = props.user;

	useEffect( () => {
		props.getSales();
		props.getUsers();
		props.getItems();
		props.getCategories();
	}, [])

	return(
		<Fragment>
			{
				user.is_staff ?
				<div className="container my-3 p-3 border">
					<AdminNav option="home" />
					 <div className="row mt-3 px-3">
						 <div className="col-md-4 mb-1">
							 <div className="box bg-primary">
				                <h2 className="desc">
					                &#8369;{!props.s_loading? 
					                	props.daily.filter(s => new Date(s.date).getDate() === new Date().getDate())
					                			   .reduce( (a,b) => (
				     						a+ Number(b.sales)), 0)
				                		: <div class="spinner-border text-light"></div>}
				                </h2>
				                <span className="title">Daily Sales</span>
				                <i className="fas fa-ruble-sign"></i>
				                <span className="info">More Info <span className="fas fa-arrow-circle-right"></span></span>
		            		</div>
						 </div>

						 <div className="col-md-4 mb-1">
							 <div className="box bg-danger">
				                <h2 className="desc">
				                	 &#8369;{!props.s_loading? 
					                	props.daily.filter(s => new Date(s.date).getMonth() === new Date().getMonth())
					                			   .reduce( (a,b) => (
				     						a+ Number(b.sales)), 0)
				                		: <div class="spinner-border text-light"></div>}
				                </h2>
				                <span className="title">Monthly Sales</span>
				                <i className="fas fa-money-bill-alt"></i>
				                <span className="info">More Info <span className="fas fa-arrow-circle-right"></span></span>
		            		</div>
						 </div>

						 <div className="col-md-4 mb-1">
							 <div className="box bg-success">
				                <h2 className="desc">
				                	&#8369;{!props.s_loading? 
					                	props.daily.filter(s => new Date(s.date).getYear() === new Date().getYear())
					                			   .reduce( (a,b) => (
				     						a+ Number(b.sales)), 0)
				                		: <div class="spinner-border text-light"></div>}
				                </h2>
				                <span className="title">Annual Sales</span>
				                <i className="fas fa-money-bill-wave"></i>
				                <span className="info">More Info <span className="fas fa-arrow-circle-right"></span></span>
		            		</div>
						 </div>
					 </div>
				</div>
				 : 
				 	<ERROR_404 />
			}
		</Fragment>
	)
}

AdminDashboard.propTypes = {
	user: PropTypes.object.isRequired,
	daily: PropTypes.array.isRequired,
	monthly: PropTypes.array.isRequired,
	yearly: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
	user: state.auth.user,
	daily: state.sales.daily_sales,
	monthly: state.sales.monthly_sales,
	yearly: state.sales.yearly_sales,
	s_loading: state.sales.loading,
})

export default connect(mapStateToProps, {getUsers, getItems, getCategories, getSales})(AdminDashboard);