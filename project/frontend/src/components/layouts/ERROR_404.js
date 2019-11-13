import React, { Fragment } from 'react';
import { connect } from 'react-redux';

function ERROR_404(props) {

	return(
		<Fragment>
			<div className="jumbotron d-flex justify-content-center flex-column text-center">
				<h3>
					{props.error.msg}
				</h3>
			</div>
		</Fragment>
	)
}

const mapStateToProps = state => ({
	error: state.errors,
});

export default connect(mapStateToProps)(ERROR_404);
