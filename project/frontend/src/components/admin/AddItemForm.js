import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {createItem } from '../../actions/items';
import PropTypes from 'prop-types';

function AddItemForm(props) {
	const initialItem = {
		name: '',
		price: 0,
		category: 0,
		status: true,
	};
	const [item, setItem] = useState(initialItem);
	const [inputError, setInputError] = useState('');

	useEffect( () => {
		if(!props.loading)		
			props.close();
	}, [props.loading])
	
	const handleSubmit = e => {
		e.preventDefault();
		if(!/^[0-9.]+$/.test(item.price)){
			setInputError('Invalid Characters on Price.');
			return;	
		}
		if(item.name !== '' && (item.price !==0 || item.price !== '') 
		 && item.category !==  0) {
			props.createItem(item)
			setItem(initialItem);_
			setInputError('');
		}
		else 
			setInputError('Fill up all fields.')

	}
	
	return (
		<Fragment>

		<h4> Add New Item
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

	      <label>Item Name</label>
	      <input type="text" className="form-control" 
	      	value={item.name}
	      	onChange={(e)=> setItem({...item, name:e.target.value})} />
	    </div>


		 <div className="form-row">
			<div className="form-group col-md-6">
				<label htmlFor="price">Price</label>
				<input type="text" className="form-control" id="price"
					value={item.price}
			      	onChange={(e)=> setItem({...item, price:e.target.value})} />
			</div>

			<div className="form-group col-md-6">
				<label>Categories</label>
				<select className="custom-select mr-sm-2" 
					onChange={e=> setItem({...item, category: e.target.value})}
				>
			        <option value={0}>Choose Category...</option>
			       {
			       	props.categories.map( c => (
			       		<option key={c.id} value={c.id}>{c.category}</option>
			       	))
			       }
			    </select>
			</div>
		 </div>
		  <hr />
		  <button type="submit" className="btn btn-dark btn-block"> 
		  	ADD
		  </button>
		</form>

	</Fragment>
	)
}

AddItemForm.propTypes = {
	createItem: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	categories: PropTypes.array.isRequired,
}

const mapToStateToProps = state => ({
	error: state.errors,
	loading: state.items.loading,
	categories: state.categories.categories
})

export default connect(mapToStateToProps, {createItem})(AddItemForm);