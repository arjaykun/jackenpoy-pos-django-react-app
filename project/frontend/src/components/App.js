import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import Header from "./layouts/Header";
import Alerts from "./layouts/Alerts";

import Items from "./shop/Items"

import { Provider } from "react-redux";
import store from "../store";

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

//alert options
const alertOptions = {
	timeout: 3000,
	postion:'bottom',
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<AlertProvider template={AlertTemplate} {...alertOptions}>
					<Fragment>
						<Header />
						<Alerts />
						<Items />
					</Fragment>
				</AlertProvider>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'))
