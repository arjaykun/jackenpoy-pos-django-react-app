import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems, filterItemsByCategory } from '../../actions/items';
import {  addInCart  } from '../../actions/cart';
import ItemBox from './ItemBox';
import CategoryBox from './CategoryBox';
import OrderSummary from './OrderSummary';
import Loader from '../layouts/Loader';
function Items(props) {

	useEffect ( ()=> {
		props.getItems();
	}, []);


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
					<div className="card p-2 d-flex flex-column">
					{/*Category items*/}
						<div className="d-flex border-bottom pb-2 mb-2">
							{	
								props.categories.map(cat => (
									<CategoryBox 
										categories={cat} 
							 			key={cat.id} 
							 			onClick={() => props.filterItemsByCategory(cat.id)}
									/>
								))
							}
						</div>
					{/*Menu Items*/}
						<div>
					 		<div className="d-flex justify-content-center">
					 		{
						 		props.items.length > 0 ?
							 		props.items
							 			.filter(item => item.status === true)
							 			.map( item => (
							 			<ItemBox 
								 			item={item} 
								 			key={item.id} 
								 			categories={props.categories}
								 			onClick={() => props.addInCart({
								 				id: item.id,
								 				name:item.name,
								 				price: item.price,
								 				discounted_price:0,
								 				quantity: 1,
								 			})} />
							 		))
						 		:
						 			<h5 className="jumbotron text-center">
						 				<small>Choose a category to see menu items under it.
						 					<br /> OR search an item via search box.
						 				</small>
						 			</h5>

						 		}
					 		</div>
						</div>
					</div>
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

Items.propTypes = {
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired,
	getItems: PropTypes.func.isRequired,
	addInCart: PropTypes.func.isRequired,
	filterItemsByCategory: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	items: state.items.filtered_items,
	categories: state.items.categories,
	loading: state.items.loading, 
	isAuthenticated: state.auth.isAuthenticated
});


export default connect(
	mapStateToProps, 
	{getItems, addInCart, filterItemsByCategory})
	(Items);
