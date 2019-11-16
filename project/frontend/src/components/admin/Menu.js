import React, { useEffect } from 'react';
import {  connect } from 'react-redux';
import AdminNav from './AdminNav';
import PropTypes from 'prop-types';
import { getItems } from '../../actions/items';

function Menu(props) {
	const items = props.items;
	const categories = props.categories;
	useEffect ( ()=> {
		props.getItems();
	}, []);


	return(
	  <div className="container my-3 p-3 border">
		 <AdminNav option="menu" />
		 <br />
		 <button className="btn btn-primary btn-small float-right">
		 	Add New <i className="fas fa-plus "> </i>
		 </button>
		 <br />
		 <table className="table mt-3">
		    <thead className="thead-dark">
		      <tr>
		        <th>ID</th>
		        <th>Item</th>
		        <th>Price</th>
		        <th>Category</th>
		        <th></th>
		      </tr>
		    </thead>
		    <tbody>
		      {
		      	items.map( item => (
		      	   <tr key={item.id}>
			        <td>{item.id}</td>
			        <td>{item.name}</td>
			        <td>&#8369; {item.price}</td>
			        <td>{ categories
			        		.filter(c=> c.id === item.category)
			        		.map( c => c.category)
			        		.join('')
			        }</td>
			        <td>
			        <div className="d-flex">
							<button 
								className="btn text-light bg-danger rounded-circle mr-1"
							>
								<i className="fas fa-times "></i>
							</button>
							<button className="btn text-light bg-info rounded-circle mr-1" 
							 		data-toggle="modal" 
							 		data-target="#myModal">
							 	<i className="fas fa-pen"></i>
							 </button>
						</div>
			        </td>
			      </tr>
		      	))
		      }
		    </tbody>
		  </table>
	  </div>
	)
}

Menu.propTypes = {
	items: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired,
	getItems: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	items: state.items.items,
	categories: state.items.categories,
})

export default connect(mapStateToProps, {getItems})(Menu);