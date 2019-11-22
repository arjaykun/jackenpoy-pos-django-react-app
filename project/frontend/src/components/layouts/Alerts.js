import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

export class Alerts extends Component {

	componentDidUpdate(prevProps) {
		const { error,alert, message } = this.props;
		if( error !== prevProps.error ) {
			// if(error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
			// if(error.msg.username) alert.error(error.msg.username);
		}

		if(message !== prevProps.message) {		
			if(message.ItemRemoved) alert.success(message.ItemRemoved);
			if(message.CartCleared) alert.success(message.CartCleared);
			if(message.orderSucess) alert.success(message.orderSucess);
			if(message.userAdded) alert.success(message.userAdded);
			if(message.userDeleted) alert.success(message.userDeleted);
			if(message.userUpdated) alert.success(message.userUpdated);
			if(message.itemAdded) alert.success(message.itemAdded);
			if(message.itemDeleted) alert.success(message.itemDeleted);
			if(message.orderCompleted) alert.success(message.orderCompleted);
		}
	}

	render() { 
		return <Fragment />;
	}
}

const mapStateToProps = state => ({
	message: state.messages,
	error: state.errors
});

export default connect(mapStateToProps)(withAlert()(Alerts));
 