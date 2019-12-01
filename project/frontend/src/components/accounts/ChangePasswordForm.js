import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {changeSelfPassword} from '../../actions/users';
import PropTypes from 'prop-types';

function ChangePasswordForm(props) {
	const [passwords, setPasswords] = useState({password:'', confirm: '', old:''})
	const [inputError, setInputError] = useState('');

	useEffect( ()=> {
		setInputError('');
	},[]) 
	
	useEffect( () => {
		if(!props.loading)		
			props.close();
	}, [props.loading])

	const handleSubmit = e => {
		e.preventDefault();
		if(passwords.password !== '' && passwords.confirm !== '' && passwords.old !== '') {
			if(passwords.password === passwords.confirm) {
				if(passwords.password.length >= 6) {
					setPasswords({password:'', confirm: '', old: ''})
					setInputError('')
					props.changeSelfPassword(props.user.id, passwords.old, passwords.password)		
				} else {
					setInputError("Password must be at least 6 characters long.")
				}
			} else {
				setInputError("Password does not match.")
			}
		} else {
			setInputError('Fill up all fields.');
		}

	}
	return (
			<Fragment>

		<h4> Change Password ({props.user.username})
			{ props.error.status === 200 ? props.loading ? 
				<span><i className="fas fa-spinner fa-pulse"> </i></span>
				:<span></span>:<span></span>} 
		</h4>
		<hr />

	  	{ 
	  		inputError !== '' || props.error.status !== 200 ?
	  			inputError !== '' ?
					<div className="alert alert-danger text-center">{inputError}</div>
				:	
					props.loading?
					<div className="alert alert-danger text-center">
						{typeof props.error.msg.old_password !== "undefined"?
						 props.error.msg.old_password.join() : <span></span>}
					</div> : <span></span>
				:
				<span></span>
		
		}
	 	<form onSubmit={handleSubmit}>

		    <div className="form-group">

		      <label>Old Password</label>
		      <input type="password" className="form-control" 
		      	value={passwords.old}
		      	onChange={(e)=> setPasswords({...passwords, old:e.target.value})} />
		    </div>

		    <div className="form-row"> 
			    <div className="form-group col-md-6">
			      <label>New Password</label>
			      <input type="password" className="form-control" 
			      	value={passwords.password}
			      	onChange={(e)=> setPasswords({...passwords, password:e.target.value})} />
			    </div>

			    <div className="form-group col-md-6">
			      <label>Confirm Password</label>
			      <input type="password" className="form-control" 
			      	value={passwords.confirm}
			      	onChange={(e)=> setPasswords({...passwords, confirm:e.target.value})} />
			    </div>
			 </div>
		
		  <hr />
		  <button type="submit" className="btn btn-dark btn-block"> 
		  	Change Password
		  </button>
		</form>

	</Fragment>
	)
}

ChangePasswordForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	changeSelfPassword: PropTypes.func.isRequired,
}

const mapToStateToProps = state => ({
	error: state.errors,
	loading: state.users.loading
})

export default connect(mapToStateToProps, {changeSelfPassword})(ChangePasswordForm);