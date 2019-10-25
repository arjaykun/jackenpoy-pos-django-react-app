import React, { Fragment, useState } from 'react';

function ConfirmModal(props) {

	return(
		<Fragment>
		  <div className="modal fade" id="confirmModal">
		    <div className="modal-dialog modal-md">
		      <div className="modal-content">
		      
		        <div className="modal-header">
		          <h5 className="modal-title">Are you sure you want to clear all the item in the order list?</h5>
		          <button type="button" className="close" data-dismiss="modal">&times;</button>
		        </div>
		        
		        <div className="modal-body d-flex justify-content-center">
		         	<button className="btn btn-primary mx-1 px-2">YES</button>
		         	<button className="btn btn-danger mx-1 px-2">NO</button>
		        </div>
		        
		      </div>
		    </div>
		  </div>
		</Fragment>
	)
}

export default ConfirmModal;
