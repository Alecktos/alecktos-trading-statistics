/*
 ./client/index.js
 which is the webpack entry file
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TradingChart from './components/tradingchart/tradingchart.view';
import Menu from './components/menu/menu.view';

ReactDOM.render(
	<Router>
		<div>
			<Route path="/:date/:stock" component={TradingChart} />
			<Route exact path="/" component={Menu} />
		</div>
	</Router>,
	document.getElementById('root')
);