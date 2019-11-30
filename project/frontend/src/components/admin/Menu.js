import React, { useState, useEffect, Fragment } from 'react';
import {  connect } from 'react-redux';
import AdminNav from './AdminNav';
import AddItemForm from './AddItemForm';
import ConfirmForm from './ConfirmForm';
import UpdateItemForm from './UpdateItemForm';
import { getItems } from '../../actions/items';
import PropTypes from 'prop-types';
import Rodal from 'rodal';
import Loader from '../layouts/Loader';

function Menu(props) {
	const items = props.items;
	const categories = props.categories;
	const [addModal, setAddModal] = useState(false);
	const [confirmModal, setConfirmModal] = useState(false);
	const [updateModal, setUpdateModal] = useState(false);
	const [selected, setSelected] = useState({});
	const [search, setSearch] = useState('');

	useEffect( () => {
		props.getItems()
	}, [])

	const handleDelete = item => {
		setSelected(item);
		setConfirmModal(true);
	}
	const handleUpdate = item => {
		setSelected(item);
		setUpdateModal(true);
	}

	return( 
	<Fragment>
	  {props.loading? <Loader />: 
	  <div className="container my-3 p-3 border">

	  	 <AdminNav option="menu" />
		 <br />
		 <div className="row">

				 <div className="col-md-3">
					<div className="card p-2 bg-light">
						<h4>Filter Items</h4>
						<div className="input-group mb-2">
						  <input type="text" className="form-control" value={search} 
						 	 placeholder="Search here..." 
						 	 onChange={ (e) => setSearch(e.target.value) }/>
						  <div className="input-group-append">
						    <button className="btn btn-outline-primary" type="button"
						    	onClick={ 
						    		()=> props.getItems(`api/items?search=${search}`)}
						    >
						    	<i className="fas fa-search"></i>
						    </button>
						  </div>
						</div>

						<button className="btn btn-primary btn-block"
							onClick={ ()=> props.getItems(`api/items`)}				  			
			  			>CLEAR 
			  		</button>

						<ul className="list-group list-group-flush mt-2">
							  <li className="list-group-item bg-dark text-light">
							  		Status
							  </li>
							  <li className="list-group-item">
						  			<button className="btn btn-link text-dark"
											onClick={ ()=> props.getItems("api/items?status=true")}				  			
								  		>Active</button>
							  </li>
							  <li className="list-group-item">
						  			<button className="btn btn-link text-dark"
											onClick={ ()=> props.getItems("api/items?status=false")}				  			
								  		>Inactive</button>
							  </li>
						</ul>

						<ul className="list-group list-group-flush mt-2">
									  <li className="list-group-item bg-dark text-light">
									  		Categories
									  </li>
									  {
									  	props.categories.map( cat => (
									  		<li className="list-group-item" key={cat.id}>
									  			<button className="btn btn-link text-dark"
														onClick={ ()=> props.getItems(`api/items?category=${cat.id}`)}				  			
											  		>{cat.category}</button>
									  		</li>
									  	))
									  }
								 </ul> 
					</div>
				</div>	

				<div className="col-md-9 card p-2">
					 <div className="d-flex flex-wrap justify-content-between align-items-center">
						 <h4>Item List ( results: {props.count} )</h4>
						 <button className="btn btn-primary btn-small float-right"
						 	onClick={()=> setAddModal(true)}>
						 	Add New <i className="fas fa-plus "> </i>
						 </button>
					</div>
					 <br />
					 <table className="table mt-1">
					    <thead className="thead-dark">
					      <tr>
					        <th>
					        	<div className="d-flex">
					        		<div className="mr-2">ID</div>
						        	<div  className="text-light"
						        		style={{cursor:"pointer"}}
						        		onClick={ ()=> props.getItems('api/items?ordering=id')}>
						        		<i className="fas fa-arrow-up"></i>
						        	</div>
						        	<div className="text-light"
						        		style={{cursor:"pointer"}}
						        		onClick={ ()=> props.getItems('api/items?ordering=-id')}>
						        		<i className="fas fa-arrow-down"></i>
						        	</div>
					        	</div>
					        </th>
					        <th>
					        	<div className="d-flex">
					        		<div className="mr-2">Item</div>
						        	<div  className="text-light"
						        		style={{cursor:"pointer"}}
						        		onClick={ ()=> props.getItems('api/items?ordering=name')}>
						        		<i className="fas fa-arrow-up"></i>
						        	</div>
						        	<div className="text-light"
						        		style={{cursor:"pointer"}}
						        		onClick={ ()=> props.getItems('api/items?ordering=-name')}>
						        		<i className="fas fa-arrow-down"></i>
						        	</div>
					        	</div>
					        </th>
					        <th>
					        	<div className="d-flex">
					        		<div className="mr-2">Price</div>
						        	<div  className="text-light"
						        		style={{cursor:"pointer"}}
						        		onClick={ ()=> props.getItems('api/items?ordering=price')}>
						        		<i className="fas fa-arrow-up"></i>
						        	</div>
						        	<div className="text-light"
						        		style={{cursor:"pointer"}}
						        		onClick={ ()=> props.getItems('api/items?ordering=-price')}>
						        		<i className="fas fa-arrow-down"></i>
						        	</div>
					        	</div>
					        </th>
					        <th>Status</th>
					        <th>Actions</th>
					      </tr>
					    </thead>
					    <tbody>
					      {
					      	items.map( item => (
					      	   <tr key={item.id}>
						        <td>{item.id}</td>
						        <td>{item.name}</td>
						        <td>&#8369; {item.price}</td>
						        <td>
						        	{item.status? 
						     			<span className="badge badge-pill badge-success">active</span>
						     			:<span className="badge badge-pill badge-warning">inactive</span>
						     		}
						        </td>
						        <td>
						        <div className="d-flex">
										<button 
											className="btn text-light bg-danger rounded-circle mr-1"
											onClick={() => handleDelete(item)}
										>
											<i className="fas fa-trash "></i>
										</button>
										<button className="btn text-light bg-info rounded-circle mr-1" 
										 		onClick={() => handleUpdate(item)}>
										 	<i className="fas fa-pen"></i>
										 </button>
									</div>
						        </td>
						      </tr>
					      	))
					      }
					    </tbody>
					  </table>

					  { props.previous !== null || props.next !== null ?
					  	<div className="d-flex justify-content-center w-100">
					  	<button className="btn btn-info mx-1"
					  		disabled={props.previous!== null? false : true}
					  		onClick={ ()=> props.getItems(props.previous)} 
					  		>
					  		PREVIOUS
					  	</button>
					  	<button className="btn btn-info mx-1"
					  		disabled={props.next!== null? false : true}
					  		onClick={ ()=> props.getItems(props.next)} 
					  		>
					  		NEXT
					  	</button>
					 </div> : <span></span>
					  }
				</div>
			</div>
		   {/*modal here*/}
			 <Rodal 
			 	visible={addModal} 
			 	onClose={ () => setAddModal(false)}
			 	closeOnEsc={true}
			 	width={500}
			 	height={420}
			 	animation="flip"
			 	leaveAnimation="door"
			 	>
			 		<AddItemForm close={() => setAddModal(false)}/>
			 </Rodal>
			 <Rodal 
			 	visible={updateModal} 
			 	onClose={ () => setUpdateModal(false)}
			 	closeOnEsc={true}
			 	width={500}
			 	height={420}
			 	animation="flip"
			 	leaveAnimation="door"
			 	>
			 		<UpdateItemForm 
				 		item={selected}
				 		close={() => setUpdateModal(false)}/>
			 </Rodal>
			 <Rodal 
			 	visible={confirmModal} 
			 	onClose={ () => setConfirmModal(false)}
			 	closeOnEsc={true}
			 	width={500}
			 	height={150}
			 	animation="flip"
			 	leaveAnimation="door"
			 	>
			 		<ConfirmForm
			 			text="Are you sure you want to delete this item?"
			 			id={selected.id}
			 			title="items" 
			 			close={() => setConfirmModal(false)}/>
			 </Rodal> 			
	  </div> }
	  </Fragment >
	)
}

Menu.propTypes = {
	items: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	count: PropTypes.number.isRequired,
	getItems: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	items: state.items.items,
	categories: state.items.categories,
	loading: state.items.loading,
	next: state.items.next,
	previous: state.items.previous,
	count: state.items.count,
})

export default connect(mapStateToProps, {getItems})(Menu);