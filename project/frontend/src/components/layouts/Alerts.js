import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

export class Alerts extends Component {

	componentDidUpdate(prevProps) {
		const { error, alert, message } = this.props;

		if(message !== prevProps.message) {		
			if(message.ItemRemoved) alert.success(message.ItemRemoved);
			if(message.CartCleared) alert.success(message.CartCleared);
			if(message.orderSucess) alert.success(message.orderSucess);

		}
	}

	render() { 
		return <Fragment />;
	}
}

const mapStateToProps = state => ({
	message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
 