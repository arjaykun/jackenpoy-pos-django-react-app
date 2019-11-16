import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {deleteUser} from '../../actions/users';
import PropTypes from 'prop-types';

function ConfirmForm(props) {
	const handleClick = () => {
		props.deleteUser(props.user);
		props.close();
	}
	return (
		<Fragment>
			<h4 className="text-center">
				Are you sure you want to delete the selected user?
			</h4>
			<hr />
			<div className="modal-body d-flex justify-content-center">
		         	<button 
		         		className="btn btn-primary mx-1"
		         		onClick={ () => handleClick() }
		         	>YES</button>
		         	<button 
		         		className="btn btn-danger mx-1"
		         		onClick={ () => props.close()}
		         	>NO</button>
		        </div>
		        
		</Fragment>
	)
}

ConfirmForm.propTypes = {
	deleteUser: PropTypes.func.isRequired
}

const mapToStateToProps = state => ({
	error: state.errors
})

export default connect(mapToStateToProps, {deleteUser})(ConfirmForm);