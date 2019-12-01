import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from '../../actions/items';
import {  addInCart  } from '../../actions/cart';
import ItemBox from './ItemBox';
import CategoryBox from './CategoryBox';
import OrderSummary from './OrderSummary';
import Loader from '../layouts/Loader';
function Items(props) {
	const [search, setSearch] = useState('')
	useEffect ( ()=> {
		props.getItems('api/aitems?ordering=name', true);
	}, []);


	return (
		<Fragment>
		{
		props.loading?
			<Loader />	
		:
		<Fragment>
			<div className="input-group mb-2">
				  <input type="text" className="form-control" value={search} 
				 	 placeholder="Search here..." 
				 	 onChange={ (e) => setSearch(e.target.value) }/>
				  <div className="input-group-append">
				    <button className="btn btn-primary" type="button"
				    	onClick={ 
				    		()=> props.getItems(`api/aitems?search=${search}`, true)}
				    >
				    	<i className="fas fa-search"></i>
				    </button>
				  </div>
		     </div>

			<div className="card p-2 d-flex flex-column">
				{/*Category items*/}
					<div className="d-flex border-bottom flex-wrap pb-2 mb-2">
						<div
							className="mr-1 mb-1 text-light bg-dark 
							text-center d-flex flex-column justify-content-center category"
							onClick={() => props.getItems(`api/aitems?ordering=name`, true)}
							style={{width:'70px', height:'70px', cursor: 'pointer'}}
						>
							<div>ALL</div>
						</div>
						{	
							props.categories.map(cat => (
								<CategoryBox 
									categories={cat} 
						 			key={cat.id} 
						 			onClick={() => props.getItems(`api/aitems?category=${cat.id}`, true)}
								/>									
							))
						}
					</div>
				{/*Menu Items*/}
				<div>
			 		<div className="d-flex flex-wrap">
			 		{
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

				 		}
			 		</div>
				</div>
			 </div>
			</Fragment>
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
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	items: state.items.items,
	categories: state.items.categories,
	loading: state.items.loading, 
	isAuthenticated: state.auth.isAuthenticated,
	next: state.items.next,
	previous: state.items.previous,
});


export default connect(
	mapStateToProps, 
	{getItems, addInCart })
	(Items);
