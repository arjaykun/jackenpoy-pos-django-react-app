import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {createUser} from '../../actions/users';
import PropTypes from 'prop-types';

function UserForm(props) {
	const initialUser = {
			first_name:'',last_name:'', email:'', username:'', 
			password: '', is_staff: false, confPassword:''};
	const [user, setUser] = useState(initialUser);
	const [inputError, setInputError] = useState('');

	useEffect( () => {		
		props.close();
	}, [props.created])

	const handleSubmit = e => {
		e.preventDefault();
		if(user.first_name !== "" && user.last_name !== "" && user.email !== ""
			&& user.password !== "" && user.confPassword !== "") {
			if(user.password !== user.confPassword) {
				setInputError('Password does not match.');
				return;
			}
			delete user.confPassword;
			props.createUser(user);
			setInputError('');
			setUser(initialUser);
		} else {
			setInputError('Fill up all fields.');
		}

	}
	
	return (
		<Fragment>

		<h4> { props.title }
			{ props.loading ? 
				<span><i className="fas fa-spinner fa-pulse"> </i></span>
				:<span></span>} 
		</h4>
		<hr />

	  	{ inputError !== '' ? 
			<div className="alert alert-danger text-center">{inputError}</div>:
			<span></span>
		}
	 	<form onSubmit={handleSubmit}>
		  <div className="form-row">
		    <div className="form-group col-md-6">
		      <label>Firstname</label>
		      <input type="text" className="form-control" 
		      	value={user.first_name}
		      	onChange={(e)=> setUser({...user, first_name:e.target.value})} />
		    </div>
		    <div className="form-group col-md-6">
		      <label>Lastname</label>
		      <input type="text" className="form-control"
		      	value={user.last_name}
		      	onChange={(e)=> setUser({...user, last_name:e.target.value})} />
		    </div>
		  </div>


		 <div className="form-row">
			<div className="form-group col-md-6">
				<label htmlFor="username">Username</label>
				<input type="text" className="form-control" id="username"
					value={user.username}
			      	onChange={(e)=> setUser({...user, username:e.target.value})} />
			</div>

			<div className="form-group col-md-6">
				<label>E-mail</label>
				<input type="email" className="form-control"
				value={user.email}
		      	onChange={(e)=> setUser({...user, email:e.target.value})} />
			</div>
		 </div>

		  <div className="form-row">
		    <div className="form-group col-md-6">
		      <label>Password</label>
		      <input type="password" className="form-control" 
		      value={user.password}
		      	onChange={(e)=> setUser({...user, password:e.target.value})} />
		    </div>
		    <div className="form-group col-md-6">
		      <label>Confirm Password</label>
		      <input type="password" className="form-control" 
		      value={user.confPassword}
		      	onChange={(e)=> setUser({...user, confPassword:e.target.value})}/>
		    </div>
		  </div>

		  <div className="form-group">
		    <div className="form-check">
		      <input className="form-check-input" type="checkbox" id="staff" 
		        value={user.is_staff}
		      	onChange={(e)=> setUser({...user, is_staff:e.target.checked})}/>
		      <label className="form-check-label" htmlFor="staff">
		        Staff - <i>someone who could log in the admin page.</i>
		       </label>
		    </div>
		  </div>
		  <hr />
		  <button type="submit" className="btn btn-dark btn-block"> 
		  	ADD
		  </button>
		</form>

	</Fragment>
	)
}

UserForm.propTypes = {
	createUser: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
}

const mapToStateToProps = state => ({
	error: state.errors,
	loading: state.users.loading,
	created: state.users.created,
})

export default connect(mapToStateToProps, {createUser})(UserForm);