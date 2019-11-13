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
			 <div className="px-1 row my-5">
				 <div className="col-md-4"></div>
				 {/*Login form*/}
				 <div className="col-md-4 d-flex flex-column">
				 	<div className="bg-dark text-center text-white p-3">
				 		<h4>Jack En Poy</h4>
				 	</div>
					 <form className="p-3 border" onSubmit={onSubmit}>
					  <div className="form-group">
					    <span className="text-dark">Username:</span>
					    <input 
					    	type="text" 
					    	className="form-control" 
					    	value={username}
					    	onChange={ e => setUsername(e.target.value)}
					    />
					  </div>
					  <div className="form-group">
					    <span className="text-dark">Password:</span>
					    <input 
					    	type="password" 
					    	className="form-control" 
					    	value={password}
					    	onChange={ e => setPassword(e.target.value)} />
					  </div>
					  <button type="submit" className="btn btn-dark mx-auto d-block btn-small">Login</button>
					</form> 
				</div>
				{/*end login form*/}
				 <div className="col-md-4"></div>
			 </div>
	);
}
const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);