import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			 <nav className="navbar navbar-expand-md bg-dark navbar-dark">
				<div className="container">
				  {/*<!-- Brand -->*/}
				  <a className="navbar-brand" href="#">Jack en Poy</a>

				  {/*<!-- Toggler/collapsibe Button -->*/}
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
				    <span className="navbar-toggler-icon"></span>
				  </button>

				  {/*<!-- Navbar links -->*/}
				  <div className="collapse navbar-collapse" id="collapsibleNavbar">
				    <ul className="navbar-nav ml-auto">
				      <li className="nav-item">
				        <a className="nav-link" href="#">Login</a>
				      </li>
				    </ul>
				  </div>
				</div>
			</nav> 
		);
	}
}

export default Header
