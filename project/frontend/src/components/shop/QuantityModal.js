import React, { Fragment, useState } from 'react';

function QuantityModal(props) {

	const {item, quantity} = props.data;
	const handleClick = () => {
		if(/^[0-9]+$/.test(quantity)) {		
			props.onClick();
		}

		props.close();
	}
	return(
		<Fragment>	 
		     <h4 className="modal-title">Enter {item.name} order quantity.</h4>
		        		    
	         <input 
         		className="p-3 form-control" 
         		value={quantity} 
         		onChange={e => props.onChange(e.target.value)}
	         />
	        
	          <button type="button" 
	          	className="btn btn-primary btn-block mt-2"
	          	onClick={ () => handleClick() }
	          >Save Changes</button>
		</Fragment>
	)
}

export default QuantityModal;
