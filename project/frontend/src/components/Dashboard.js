import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';


function Dashboard() {
	useEffect( ()=> {
		localStorage.removeItem('login_date')
	},[])
	return (
		<div className="container d-flex align-items-center justify-content-center">
			<div className="mt-5 card p-5">
				<h1>Dashboard <i className="fas fa-tachometer-alt"> </i></h1> 
				<hr />
				<div className="d-flex justify-content-center flex-wrap">
					<Link className="btn btn-primary p-5 m-2" to="/shop">
						<i className="fas fa-cash-register fa-4x"></i> <br /><br />
						<h3>CASHIER</h3> 
					</Link>
					<Link className="btn btn-danger p-5 m-2" to="/orders">
						<i className="fas fa-utensils fa-4x"></i> <br /><br />
						<h3>ORDERS</h3> 
					</Link>

					<Link className="btn btn-info p-5 m-2" to="/admin"> 
						<i className="fas fa-key fa-4x"></i><br /><br />
						<h3>ADMIN</h3> 
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Dashboard