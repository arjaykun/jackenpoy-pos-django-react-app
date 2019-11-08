import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {

	static propTypes = {
		error: PropTypes.object.isRequired,
	}

	componentDidUpdate(prevProps) {
		const { error, alert, message } = this.props;
		if(error !== prevProps.error) {
			if(error.msg.name) alert.error(`Name: ${error.msg.name.join()}`)
			if(error.msg.price) alert.error(`price: ${error.msg.price.join()}`)
			if(error.msg.category) alert.error(`category: ${error.msg.category.join()}`)
		}

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
	error: state.errors,
	message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
 