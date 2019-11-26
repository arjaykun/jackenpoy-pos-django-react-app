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
				<li className="navbar-text text-light">

			    <Link to="/profile">
					{ isAuthenticated? user.username.toUpperCase() : ''}
			    </Link> |
			    
				</li>
				 <li className="nav-item">	
				     <button className="btn btn-small btn-link text-light"
				     		onClick ={this.props.logout}>
				     	 Logout <i className="fas fa-sign-out-alt"> </i>
				     </button>
			      </li>
		     </Fragment>
		   
		);

		const guestLinks = (
			<Link className="nav-link" to="/login">
		        <li className="nav-item">	
					 <button className="btn btn-small btn-link text-light">
				        	Login <i className=""> </i>
				      </button>
			      </li>
		     </Link>
		);

		return (
			 <nav className="navbar navbar-expand-md bg-dark navbar-dark">
				<div className="container">
				  {/*<!-- Brand -->*/}
				  <a className="navbar-brand" href="#">Jack en Poy</a>

				  {/*<!-- Navbar links -->*/}
				  	<ul className="navbar-nav ml-auto">
						   { isAuthenticated? authLinks: guestLinks }
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
