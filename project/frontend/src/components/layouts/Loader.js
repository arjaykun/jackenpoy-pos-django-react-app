import React, { Fragment } from 'react';

function Loader() {
	return(
		<Fragment>
			<div className="loader fa-3x">
		      <div className="loader-item">
		      	<i className="fas fa-spinner fa-pulse"></i> <br/>
		      	<h1><strong>LOADING...</strong></h1>
		      </div>
		    </div>
		</Fragment>
	)
}

export default Loader;
