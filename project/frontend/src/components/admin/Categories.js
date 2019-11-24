import React, { Fragment, useState } from 'react';
import {  connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminNav from './AdminNav';
import AddCategoryForm from './AddCategoryForm';
import Rodal from 'rodal';

function Categories(props) {
	const [addModal, setAddModal] = useState(false);
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
											
										>
											<i className="fas fa-trash "></i>
										</button>
				  						<button className="btn text-light bg-info rounded-circle mr-1" 
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
		</Fragment>
	)
}

Categories.propTypes = {
}

const mapStateToProps = state => ({
	categories: state.categories.categories	
})

export default connect(mapStateToProps)(Categories);