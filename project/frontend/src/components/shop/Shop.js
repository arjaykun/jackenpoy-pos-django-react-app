import React, { useEffect, Fragment, useState } from 'react';
import Items from './items';
import OrderSummary from './OrderSummary';

function Shop(props) {

	return (
		<Fragment>
		{
		props.loading?
			<Loader />	
		:
		<div className="container mt-3 d-flex">
			<div>
				<div className="d-flex flex-column justify-content-center 
				 mr-3 card px-2 py-5 text-light bg-dark">
				<h1>M</h1>
				<h1>E</h1>
				<h1>N</h1>
				<h1>U</h1>
				</div>
			</div>
			<div className="row flex-fill">
				<div className="col-md-6 p-1">
					<Items />
				</div>
			 	<div className="col-md-6 p-1">
			 		<div className="card p-2">
			 			<OrderSummary />
			 		</div>
			 	</div>
		    </div>
		</div>
		}
		</Fragment>
	);
}


export default Shop
