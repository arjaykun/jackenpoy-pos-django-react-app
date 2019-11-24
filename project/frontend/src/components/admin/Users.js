import React, { useEffect, useState } from 'react';
import {  connect } from 'react-redux';
import AdminNav from './AdminNav';
import UserForm from './UserForm';
import UpdateForm from './UpdateForm';
import ConfirmForm from './ConfirmForm';
import PropTypes from 'prop-types';
import Rodal from 'rodal';

function Users(props) {
	const users = props.users;
	const [visible, setVisible] = useState(false);
	const [update, setUpdate] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [choice, setChoice] = useState({});


	const handleUpdate = user => {
		setChoice(user);
		setUpdate(true);
	}
	const handleDelete = user => {
		setChoice(user);
		setConfirm(true);
	}
	return(
	  <div className="container my-3 p-3 border">
		 <AdminNav option="users" />
		 <br />
		 <button 
		 	className="btn btn-primary btn-small float-right" 
		 	onClick={ () => setVisible(true)}>
		 	Add New <i className="fas fa-plus "> </i>
		 </button>

		 {/*modal here*/}
		 <Rodal 
		 	visible={visible} 
		 	onClose={ () => setVisible(false)}
		 	closeOnEsc={true}
		 	width={500}
		 	height={520}
		 	animation="flip"
		 	leaveAnimation="door"
		 	>
		 		<UserForm title="Add New User" close={() => setVisible(false)}/>
		 </Rodal>

		 <br />
		 <table className="table mt-3">
		    <thead className="thead-dark">
		      <tr>
		        <th>Username</th>
		        <th>Name</th>
		        <th>Email</th>
		        <th>Staff Status</th>
		        <th>Password</th>
		        <th>Actions</th>
		      </tr>
		    </thead>
		    <tbody>
		  		{
		  		users?
	  			users.map( user => (
	  				<tr key={user.id}>
	  					<td>{user.username}</td>
	  					<td>{`${user.first_name} ${user.last_name}`}</td>
	  					<td>{user.email}</td>
	  					<td>{user.is_staff? 
	  						<i className="fas fa-check"></i>:
	  						<i className="fas fa-times"></i>}
	  					</td>

	  					<td><button className="btn btn-primary btn-small">
	  						change 
	  					</button></td>
	  					<td>	
	  						<button 
								className="btn text-light bg-danger rounded-circle mr-1"
								onClick={() => handleDelete(user)}
							>
								<i className="fas fa-trash "></i>
							</button>
	  						<button className="btn text-light bg-info rounded-circle mr-1" 
							 		onClick={()=> handleUpdate(user)}>
							 	<i className="fas fa-pen"></i>
							 </button>
	  					</td>
	  				</tr>
	  			)):
	  			<tr><td colSpan="6">No User As of the Moment :D</td></tr>
		  		}
		    </tbody>
		  </table>


		{/*modal here*/}
		 <Rodal 
		 	visible={update} 
		 	onClose={ () => setUpdate(false)}
		 	closeOnEsc={true}
		 	width={500}
		 	height={420}
		 	animation="flip"
		 	leaveAnimation="door"
		 	>
		 	<UpdateForm user={choice} close={() => setUpdate(false)}/>
		</Rodal>
		<Rodal 
		 	visible={confirm} 
		 	onClose={ () => setConfirm(false)}
		 	closeOnEsc={true}
		 	width={500}
		 	height={150}
		 	animation="flip"
		 	>
		 	<ConfirmForm
	 			text="Are you sure you want to delete this user?"
	 			id={choice.id}
	 			title="users" 
	 			close={() => setConfirm(false)} />
		 </Rodal>

	  </div>
	)
}

Users.propTypes = {
	users: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
	users: state.users.users
});

export default connect(mapStateToProps)(Users);