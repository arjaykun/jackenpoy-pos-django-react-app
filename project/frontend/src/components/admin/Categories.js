import React, { Fragment, useState } from 'react';
import {  connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminNav from './AdminNav';
import AddCategoryForm from './AddCategoryForm';
import ConfirmForm from './ConfirmForm';
import UpdateCategoryForm from './UpdateCategoryForm';
import Rodal from 'rodal';

function Categories(props) {
	const [addModal, setAddModal] = useState(false);
	const [selected, setSelected] = useState({category:"asdsa", color:"P"});
	const [confirmModal, setConfirmModal] = useState(false);
	const [updateModal, setUpdateModal] = useState(false);

	const categories = props.categories
	const color = {
		P: 'primary',
		I: 'info',
		W: 'warning',
		SE: 'secondary',
		S: 'success',
		DK: 'dark',
		DR: 'danger',
	};

	const color_name = {
		P: 'Blue',
		I: 'Light Blue',
		W: 'Yellow',
		SE: 'Light Gray',
		S: 'Green',
		DK: 'Black',
		DR: 'Red',
	};

	const handleDelete = cat => {
		setSelected(cat)
		setConfirmModal(true)
	}
	const handleUpdate = cat => {
		setSelected(cat)
		setUpdateModal(true)
	}
	return(
		<Fragment>
			{
				<div className="container my-3 p-3 border">
					<AdminNav option="categories" />
					<br />


					 <button 
					 	className="btn btn-primary btn-small float-right mb-2" 
					 	onClick={() => setAddModal(true)}
					 	>
					 	Add New <i className="fas fa-plus "> </i>
					 </button>
					<table className="table mt-3">
					    <thead className="thead-dark">
					      <tr>
					        <th>ID</th>
					        <th>Category</th>
					        <th>Color Theme</th>
					        <th>Actions</th>
					      </tr>
					    </thead>
					    <tbody>
				     		{ categories.map( cat => (
				     			<tr key={cat.id}>
				     				<td>{cat.id}</td>
				     				<td>{cat.category}</td>
				     				<td>
					     				<div className={`text-light p-2 w-50 badge badge-pill badge-${color[cat.color]}`}>
											{color_name[cat.color]}
										</div>
									</td>
									<td>	
				  						<button 
											className="btn text-light bg-danger rounded-circle mr-1"
												onClick={() => handleDelete(cat)}
										>
											<i className="fas fa-trash "></i>
										</button>
				  						<button className="btn text-light bg-info rounded-circle mr-1" 
										 		onClick={() => handleUpdate(cat)}		
										 >
										 	<i className="fas fa-pen"></i>
										 </button>
	  								</td>
				     			</tr>
				     			))
				     		}
					    </tbody>
				  </table>
				</div>
			}

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
			 		<AddCategoryForm close={() => setAddModal(false)}/>
			 </Rodal>
			{/*update modal form*/}
			 <Rodal 
			 	visible={updateModal} 
			 	onClose={ () => setUpdateModal(false)}
			 	closeOnEsc={true}
			 	width={500}
			 	height={420}
			 	animation="flip"
			 	leaveAnimation="door"
			 	>
			 		<UpdateCategoryForm 
				 		item={selected}
				 		close={() => setUpdateModal(false)}/>
			 </Rodal>
			{/*delete confirmation form*/}
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
			 			text={`Are you sure you want to delete ${selected.category.toLowerCase()}?`}
			 			id={selected.id}
			 			title="categories" 
			 			close={() => setConfirmModal(false)}/>
			 </Rodal>
		</Fragment>
	)
}

Categories.propTypes = {
}

const mapStateToProps = state => ({
	categories: state.categories.categories	
})

export default connect(mapStateToProps)(Categories);