import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {updateUser} from '../../actions/users';
import PropTypes from 'prop-types';

function UpdateForm(props) {
	const initialUser = {
			first_name:'',last_name:'', email:'', username:'', 
			is_staff: false,};
	const [user, setUser] = useState(initialUser);
	const [inputError, setInputError] = useState('');
	useEffect( ()=> {
		setUser(props.user)
	}, [props.user]);

	useEffect( () => {
		if(!props.loading)
		props.close()
	}, [props.loading])

	const handleSubmit = e => {
		e.preventDefault();
		if(user.first_name !== "" && user.last_name !== "" && user.email !== "" &&
			user.username !== "") {
			props.updateUser(user, props.user.id)
			setInputError('')
		} else {
			setInputError('Fill up all fields.');
		}

	}
	const error = props.error
	return (
		<Fragment>

		<h4> Update User ({props.user.username})
			{ props.error.status === 200 ? props.loading ? 
				<span><i className="fas fa-spinner fa-pulse"> </i></span>
				:<span></span>:<span></span>} 	
		</h4>
		<hr />

	  	{ inputError !== '' || props.error.status !== 200 ?
	  			inputError !== '' ?
					<div className="alert alert-danger text-center">{inputError}</div>
				:	
					props.loading?
					<div className="alert alert-danger text-center">
						{typeof props.error.msg.username !== "undefined" ?
							 props.error.msg.username.join() : <span></span>}
					</div> : <span></span>
				:
				<span></span>
		}
	 	<form onSubmit={handleSubmit}>
		  <div className="form-row">
		    <div className="form-group col-md-6">
		      <label>Firstname</label>
		      <input type="text" className="form-control" name="first_name" 
		      	value={user.first_name || ''}
		      	onChange={(e)=> setUser({...user, first_name:e.target.value})} />
		    </div>
		    <div className="form-group col-md-6">
		      <label>Lastname</label>
		      <input type="text" className="form-control" name="last_name"
		      	value={user.last_name || ''} 
		      	onChange={(e)=> setUser({...user, last_name:e.target.value})} />
		    </div>
		  </div>


		 <div className="form-row">
			<div className="form-group col-md-6">
				<label htmlFor="username">Username</label>
				<input type="text" className="form-control" id="username" name="username"
					value={user.username || ''}
					onChange={(e)=> setUser({...user, username:e.target.value})} />
			</div>

			<div className="form-group col-md-6">
				<label>E-mail</label>
				<input type="email" className="form-control"
				value={user.email || ''}
		      	onChange={(e)=> setUser({...user, email:e.target.value})} />
			</div>
		 </div>

		  <div className="form-group">
		    <div className="form-check">
		      <input className="form-check-input" type="checkbox" id="staff" name="is_staff"
		      	checked={user.is_staff || false}  
		      	onChange={(e)=> setUser({...user, is_staff:e.target.checked})}/>
		      <label className="form-check-label" htmlFor="staff">
		        Staff - <i>someone who could log in the admin page.</i>
		       </label>
		    </div>
		  </div>
		  <hr />
		  <button type="submit" className="btn btn-dark btn-block"> 
		  	SAVE CHANGES
		  </button>
		</form>

	</Fragment>
	)
}

UpdateForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	updateUser: PropTypes.func.isRequired,
}

const mapToStateToProps = state => ({
	loading: state.users.loading,
	error: state.errors
})

export default connect(mapToStateToProps, {updateUser})(UpdateForm);