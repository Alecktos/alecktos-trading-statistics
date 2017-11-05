/*
 ./client/index.js
 which is the webpack entry file
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TradesView from './components/example/example.view.jsx';
import TradingChart from './components/tradingchart/tradingchart.view';

ReactDOM.render(
	<Router>
		<div>
			<Route path="/:date/:stock" component={TradingChart} />
			<Route exact path="/" component={TradingChart} />
			<Route path="/example" component={TradesView} />
		</div>
	</Router>,
	document.getElementById('root')
);