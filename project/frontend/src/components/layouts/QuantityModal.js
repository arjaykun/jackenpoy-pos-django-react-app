import React, { Fragment, useState } from 'react';

function QuantityModal(props) {

	const {item, quantity} = props.data;

	return(
		<Fragment>
		  <div className="modal fade" id="myModal">
		    <div className="modal-dialog modal-md">
		      <div className="modal-content">
		      
		        <div className="modal-header">
		          <h4 className="modal-title">Enter {item.name} order quantity.</h4>
		          <button type="button" className="close" data-dismiss="modal">&times;</button>
		        </div>
		        
		        <div className="modal-body">
		         	<input 
		         		className="p-3 form-control" 
		         		value={quantity} 
		         		onChange={e => props.onChange(e.target.value)}
		         	/>
		        </div>
		        
		        <div className="modal-footer">
		          <button type="button" 
		          	className="btn btn-primary" 
		          	data-dismiss="modal"
		          	onClick={ () => props.onClick() }
		          >Submit</button>
		          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
		        </div>
		        
		      </div>
		    </div>
		  </div>
		</Fragment>
	)
}

export default QuantityModal;
