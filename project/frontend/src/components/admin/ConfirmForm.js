import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {deleteUser} from '../../actions/users';
import {deleteItem} from '../../actions/items';
import {completeOrder, deleteOrder} from '../../actions/order';
import {deleteCategory} from '../../actions/categories';
import PropTypes from 'prop-types';

function ConfirmForm(props) {
	const handleClick = () => {
		switch(props.title) {
			case 'users':
				props.deleteUser(props.id);
				break;
			case 'items':
				props.deleteItem(props.id);
				break;
			case 'orders':
				props.completeOrder(props.id);
				break;
			case 'd_orders':
				props.deleteOrder(props.id);
				break;
			case 'categories':
				props.deleteCategory(props.id);
				break;
		}
		props.close();
	}
	return (
		<Fragment>
			<h5 className="text-center mt-2">
				{props.text}
			</h5>
			<hr />
			<div className="modal-body d-flex justify-content-center">
		         	<button 
		         		className="btn btn-primary mx-1"
		         		onClick={ () => handleClick() }
		         	>Confirm</button>
		         	<button 
		         		className="btn btn-danger mx-1"
		         		onClick={ () => props.close()}
		         	>Cancel</button>
		        </div>
		        
		</Fragment>
	)
}

ConfirmForm.propTypes = {
	deleteUser: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired,
	completeOrder: PropTypes.func.isRequired,
	deleteOrder: PropTypes.func.isRequired,
	deleteCategory: PropTypes.func.isRequired,
}

const mapToStateToProps = state => ({
	error: state.errors
})

export default connect(mapToStateToProps, 
	{deleteUser, deleteItem, completeOrder, deleteOrder, deleteCategory})(ConfirmForm);