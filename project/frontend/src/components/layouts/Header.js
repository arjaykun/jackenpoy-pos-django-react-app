import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout }  from '../../actions/auth' 

class Header extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired,
		logout: PropTypes.func.isRequired,
	}

	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<Fragment>
				 <span className="text-light">{user?user.username: ""}</span>
			     <button className="btn btn-small btn-link text-light"
			     		onClick ={this.props.logout}>
			     	Logout <i className=""> </i>
			     </button>
		     </Fragment>
		   
		);

		const guestLinks = (
			<Link className="nav-link" to="/login">
		        <button className="btn btn-small btn-link text-light">
		        	Login <i className=""> </i>
		        </button>
		     </Link>
		);

		return (
			 <nav className="navbar navbar-expand-md bg-dark navbar-dark">
				<div className="container">
				  {/*<!-- Brand -->*/}
				  <a className="navbar-brand" href="#">Jack en Poy</a>

				  {/*<!-- Navbar links -->*/}
				  	<ul className="navbar-nav ml-auto">
				      <li className="nav-item">	
						   { isAuthenticated? authLinks: guestLinks }
				       </li>
				    </ul>
				</div>
			</nav> 
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header)
