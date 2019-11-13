import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from "./layouts/Header";
import Alerts from "./layouts/Alerts";
import Dashboard from "./Dashboard";
import Items from "./shop/Items";
import Login from "./accounts/Login";
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
