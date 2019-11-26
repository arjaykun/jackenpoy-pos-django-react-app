import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {changePassword} from '../../actions/users';
import PropTypes from 'prop-types';

function ChangePasswordForm(props) {
	const [passwords, setPasswords] = useState({password:'', confirm: ''})
	const [inputError, setInputError] = useState('');

	useEffect( ()=> {
		setInputError('');
	},[]) 
	
	useEffect( () => {
		props.close()
	}, [props.loading])

	const handleSubmit = e => {
		e.preventDefault();
		if(passwords.password !== '' && passwords.confirm !== '') {
			if(passwords.password === passwords.confirm) {
				if(passwords.password.length >= 6) {
					setPasswords({password:'', confirm: ''})
					setInputError('')
					props.changePassword(props.user.id, passwords.password)		
				} else {
					setInputError("Password must be at least 6 characters long.")
				}
			} else {
				setInputError("Password does not match.")
			}
		} else {
			setInputError('Fill up both fields.');
		}

	}
	return (
			<Fragment>

		<h4> Change Password ({props.user.username})
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
		    <div className="form-group">

		      <label>New Password</label>
		      <input type="password" className="form-control" 
		      	value={passwords.password}
		      	onChange={(e)=> setPasswords({...passwords, password:e.target.value})} />
		    </div>

		    <div className="form-group">

		      <label>Confirm Password</label>
		      <input type="password" className="form-control" 
		      	value={passwords.confirm}
		      	onChange={(e)=> setPasswords({...passwords, confirm:e.target.value})} />
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
}

const mapToStateToProps = state => ({
	error: state.errors,
	loading: state.users.loading
})

export default connect(mapToStateToProps, 
	{changePassword})(ChangePasswordForm);