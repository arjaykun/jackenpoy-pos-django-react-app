import React, { Fragment, useEffect } from 'react';
import {  connect } from 'react-redux';
import PropTypes from 'prop-types';
import ERROR_404 from '../layouts/ERROR_404';
import { getUsers } from '../../actions/users';
import AdminNav from './AdminNav';
import { getItems } from '../../actions/items';
import { getCategories } from '../../actions/categories';
function AdminDashboard(props) {
	const user = props.user;

	useEffect( () => {
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
				</div>
				 : 
				 	<ERROR_404 />
			}
		</Fragment>
	)
}

AdminDashboard.propTypes = {
	user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps, {getUsers, getItems, getCategories})(AdminDashboard);