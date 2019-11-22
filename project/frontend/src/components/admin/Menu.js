import React, { useState } from 'react';
import {  connect } from 'react-redux';
import AdminNav from './AdminNav';
import AddItemForm from './AddItemForm';
import ConfirmForm from './ConfirmForm';
import UpdateItemForm from './UpdateItemForm';
import PropTypes from 'prop-types';
import Rodal from 'rodal';

function Menu(props) {
	const items = props.items;
	const categories = props.categories;
	const [addModal, setAddModal] = useState(false);
	const [confirmModal, setConfirmModal] = useState(false);
	const [updateModal, setUpdateModal] = useState(false);
	const [selected, setSelected] = useState({});


	const handleDelete = item => {
		setSelected(item);
		setConfirmModal(true);
	}
	const handleUpdate = item => {
		setSelected(item);
		setUpdateModal(true);
	}

	return(
	  <div className="container my-3 p-3 border">
		 <AdminNav option="menu" />
		 <br />
		 <button className="btn btn-primary btn-small float-right"
		 	onClick={()=> setAddModal(true)}>
		 	Add New <i className="fas fa-plus "> </i>
		 </button>
		 <br />
		 <table className="table mt-3">
		    <thead className="thead-dark">
		      <tr>
		        <th>ID</th>
		        <th>Item</th>
		        <th>Price</th>
		        <th>Status</th>
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
								<i className="fas fa-times "></i>
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
	  </div>
	)
}

Menu.propTypes = {
	items: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
	items: state.items.items,
	categories: state.categories.categories,
})

export default connect(mapStateToProps)(Menu);