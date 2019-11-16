import React, { Fragment,  } from 'react';
import {  connect } from 'react-redux';
import PropTypes from 'prop-types';
import ERROR_404 from '../layouts/ERROR_404';
import AdminNav from './AdminNav';
function AdminDashboard(props) {
	const user = props.user;
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

export default connect(mapStateToProps)(AdminDashboard);