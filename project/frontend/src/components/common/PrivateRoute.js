import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../layouts/Loader';


const PrivateRoute = ({component:Component, auth, ...rest}) => (
	<Route
		{...rest}
		render={ props => {
			if(auth.isLoading) {
 				return <Loader />
			}
			else if(!auth.isAuthenticated) {
				return <Redirect to="/login" />
			}
			else
				return <Component {...props} />
		}}
	/>
)

const mapToStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapToStateToProps)(PrivateRoute);
