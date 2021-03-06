import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {createCategory } from '../../actions/categories';
import PropTypes from 'prop-types';

function AddCategoryForm(props) {
	const initialItem = {
		category: '',
		color: '0',
	};
	const [category, setCategory] = useState(initialItem);
	const [inputError, setInputError] = useState('');

	useEffect( () => {
		if(!props.loading)		
			props.close();
	}, [props.loading])
	
	const handleSubmit = e => {
		e.preventDefault();
		if(category.category !== ""  && category.color !==  "0") {
			props.createCategory(category);
			setInputError('');
		}
		else 
			setInputError('Fill up all fields.')
	}
	
	return (
		<Fragment>

		<h4> Add New Category
			{ props.loading ? 
				<span><i className="fas fa-spinner fa-pulse"> </i></span>
				:<span></span>} 
		</h4>
		<hr />

	  	{ inputError !== '' ? 
			<div className="alert alert-danger text-center">{inputError}</div>:
			<span></span>
		}

	 	<form onSubmit={handleSubmit}>
	    <div className="form-group">

	      <label>Category</label>
	      <input type="text" className="form-control" 
	      	value={category.category}
	      	onChange={(e)=> setCategory({...category, category:e.target.value})} />
	    </div>


		<div className="form-group">
			<label>Color Theme</label>
			<select className="custom-select" 
				onChange={e=> setCategory({...category, color: e.target.value})}
			>
		        <option value="0">Choose Color</option>
		       	<option value="P">Blue</option>
		       	<option value="I">Light Blue</option>
		       	<option value="W">Yellow</option>
		       	<option value="S">Green</option>
		       	<option value="DR">Red</option>
		       	<option value="DK">Black</option>
		       	<option value="SE">Light Gray</option>
		       }
		    </select>
		</div>
	 
		  <hr />
		  <button type="submit" className="btn btn-dark btn-block"> 
		  	ADD
		  </button>
		</form>

	</Fragment>
	)
}

AddCategoryForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	createCategory:PropTypes.func.isRequired,
}

const mapToStateToProps = state => ({
	error: state.errors,
	loading: state.categories.loading
})

export default connect(mapToStateToProps, {createCategory})(AddCategoryForm);