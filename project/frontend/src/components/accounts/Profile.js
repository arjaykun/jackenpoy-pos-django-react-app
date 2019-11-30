import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../layouts/Loader';
import Rodal from 'rodal';
import ChangePasswordForm from './ChangePasswordForm';
import UpdateForm from '../admin/UpdateForm';

function Profile(props) {
	const [passwordForm, setPasswordForm] = useState(false);
	const [update, setUpdate] = useState(false);
	const user = props.user;

	return (
		<div className="d-flex justify-content-center align-items-center vh-100">
			<div className="container w-50 my-3 p-3 border">		
				<h3>
					<i className="fas fa-smile text-primary"> </i> {user.first_name} {user.last_name} 
				</h3>
				<hr />
				<div>
					<div className="d-flex mb-2">
						{
							user.is_superuser? 
							<button className="btn btn-link text-dark"
									onClick={ ()=> setUpdate(true)}>
								<u>Update Profile <i className="fas fa-user-edit"></i></u>
							 </button> 
							 :
							 <span></span>
						}
						<button className="btn btn-link text-dark"
							onClick={ ()=> setPasswordForm(true)}
							>
							<u>Change Password <i className="fas fa-lock"></i></u>
						</button>
					</div>
					<div className="container">
						<div className="d-flex">
							<span className="mr-5"><strong> First Name: </strong> {user.first_name} </span>
							<span><strong> Last Name: </strong> {user.last_name}  </span>
						</div>
						<div className="d-flex">
							<span className="mr-5"><strong> Username: </strong> {user.username} </span>
							<span><strong>Email: </strong> {user.email}  </span>
						</div>			
						<strong>Staff Status: </strong> {user.is_staff? 
			  						<i className="fas fa-check-circle text-success"></i>:
			  						<i className="fas fa-times-circle text-danger"></i>
			  					}
					</div>

				</div>
			</div>

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
			 	<UpdateForm user={user} close={() => setUpdate(false)}/>
			</Rodal>
			<Rodal 
			 	visible={passwordForm} 
			 	onClose={ () => setPasswordForm(false)}
			 	closeOnEsc={true}
			 	width={500}
			 	height={420}
			 	animation="flip"
			 	leaveAnimation="door"
		 	>
		 		<ChangePasswordForm user={user} close={() => setPasswordForm(false)}/>
			</Rodal>
		</div>
	);
}

Profile.propTypes = {
	user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	user: state.auth.user,
})

export default connect(mapStateToProps)(Profile);