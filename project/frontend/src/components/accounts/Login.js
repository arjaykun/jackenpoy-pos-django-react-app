import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/auth'
import PropTypes from 'prop-types';

function Login(props) {
	const propTypes = {
		login: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool  
	}

	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const onSubmit = e => {
		e.preventDefault()
		props.login(username, password);
	}

	return (

		props.isAuthenticated? 
		 	<Redirect to="/" />
		:
			 <div className="container p-5">
				 <form className="p-5 border bg-secondary" onSubmit={onSubmit}>
				  <div className="form-group">
				    <h3 className="text-light">Username:</h3>
				    <input 
				    	type="text" 
				    	className="form-control" 
				    	value={username}
				    	onChange={ e => setUsername(e.target.value)}
				    />
				  </div>
				  <div className="form-group">
				    <h3 className="text-light">Password:</h3>
				    <input 
				    	type="password" 
				    	className="form-control" 
				    	value={password}
				    	onChange={ e => setPassword(e.target.value)} />
				  </div>
				  <button type="submit" className="btn btn-primary">Login</button>
				</form> 
			 </div>
	);
}
const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);