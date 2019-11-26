import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from "./layouts/Header";
import Alerts from "./layouts/Alerts";

import Menu from "./admin/Menu";
import AdminDashboard from "./admin/AdminDashboard";
import Users from "./admin/Users";
import Orders from "./admin/Orders";
import Sales from "./admin/Sales";
import Categories from "./admin/Categories";
import Dashboard from "./Dashboard";
import Items from "./shop/Items";
import OrderView from "./kitchen/OrderView";
import Login from "./accounts/Login";
import Profile from "./accounts/Profile";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import  {loadUser} from '../actions/auth';

//alert options
const alertOptions = {
	timeout: 3000,
	postion:'top center',
}

class App extends Component {

	componentDidMount() {
		store.dispatch(loadUser());
	}

	render() {
		return (
			<Provider store={store}>
				<AlertProvider template={AlertTemplate} {...alertOptions}>
					<Router>
						<Fragment>
							<Header />
							<Alerts />
								<Switch>
									<PrivateRoute exact path="/" component={Dashboard} />
									<PrivateRoute exact path="/shop" component={Items} />
									<PrivateRoute exact path="/orders" component={OrderView} />
									<PrivateRoute exact path="/admin" component={AdminDashboard} />
									<PrivateRoute exact path="/admin/users" component={Users} />
									<PrivateRoute exact path="/admin/categories" component={Categories} />
									<PrivateRoute exact path="/admin/menu" component={Menu} />
									<PrivateRoute exact path="/admin/orders" component={Orders} />
									<PrivateRoute exact path="/admin/sales" component={Sales} />
									<PrivateRoute exact path="/profile" component={Profile} />
									<Route exact path="/login" component={Login} />
								</Switch>
						</Fragment>
					</Router>
				</AlertProvider>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
