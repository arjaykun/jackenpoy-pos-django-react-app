import React, { Fragment,  } from 'react';
import { Link } from 'react-router-dom';
function AdminDashboard(props) {
	const user = props.user;
	const option = props.option;
	return(
		<Fragment>
			<h1>Admin Dashboard <i className="fas fa-tachometer-alt"> </i></h1>
			<ul className="nav nav-tabs mt-3">
			  <li className="nav-item">
			    <Link className={`nav-link text-secondary 
			    	${option==="home"? "active":""}`} to="/admin">Home</Link>
			  </li>
			  <li className="nav-item ">
			    <Link className={`nav-link text-secondary
			    	${option==="menu"? "active":""}`} to="/admin/menu">Menu</Link>
			  </li>
			  <li className="nav-item">
			    <Link className={`nav-link text-secondary
			    ${option==="users"? "active":""}`} to="/admin/users">Users</Link>
			  </li>
			  <li className="nav-item">
			    <Link className="nav-link text-secondary" to="/admin/orders">Orders</Link>
			  </li>
			  <li className="nav-item">
			    <Link className="nav-link text-secondary" to="/admin/saes">Sales</Link>
			  </li>
			</ul>
		</Fragment>
	)
}

export default AdminDashboard;