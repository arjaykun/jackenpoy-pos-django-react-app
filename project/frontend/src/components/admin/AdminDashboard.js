import React, { Fragment, useEffect } from 'react';
import {  connect } from 'react-redux';
import PropTypes from 'prop-types';
import ERROR_404 from '../layouts/ERROR_404';
import { getUsers } from '../../actions/users';
import AdminNav from './AdminNav';
import { getCategories } from '../../actions/categories';
import {getSales} from '../../actions/sales';

import SalePanels from './sales/SalePanels'
import SaleCharts from './sales/SaleCharts'

function AdminDashboard(props) {
	const user = props.user;

	useEffect( () => {
		props.getSales();
		props.getUsers();
		props.getCategories();
	}, [])

	return(
		<Fragment>
			{
				user.is_staff ?
				<div className="container my-3 p-3 border">
					<AdminNav option="home" />

					 <hr />
					 <h3 className="text-center my-1 bg-secondary text-light py-2">Sales Status</h3>
					 <hr />

					<SalePanels 
						loading={props.s_loading} 
						daily={props.daily} 
						monthly={props.monthly} 
						yearly={props.yearly}
					 />

					 <hr />
					 <h3 className="text-center my-1 bg-secondary text-light py-2">Sales Charts</h3>
					 <hr />

					 <SaleCharts  
					 	daily={props.daily} 
						monthly={props.monthly} 
					 />
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

export default connect(mapStateToProps, {getUsers, getCategories, getSales})(AdminDashboard);