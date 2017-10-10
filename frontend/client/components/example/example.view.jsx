import React from 'react';
import ajax from '../ajax.js';
import Chart from './example.chart.jsx';

import { TypeChooser } from "react-stockcharts/lib/helper";
import { getData } from "./exampledata.js";

export default class Trades extends React.Component {

	constructor() {
		super();

		this.state = {
			stock: {},
			data: null
		};

		// ajax.get('/api/stock/disney')
		// 	.then((result) => {
		// 		this.setState({stock: result});
		// 	});
	}

	componentDidMount() {
		getData().then(data => {
			this.setState({ data })
		})
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('----');
		console.log('Will update');
		// console.log('Before update: ' + JSON.stringify(this.props) + ' ' + JSON.stringify(this.state));
		// console.log('After update: ' + JSON.stringify(nextProps) + ' ' + JSON.stringify(nextState));
	}

	render() {
		//import with routes and render output from a backend request
		if (this.state.data === null) {
			return <div>Loading...</div>
		}

		return (
		<TypeChooser>
			{type => <Chart type={type} data={this.state.data} />}
		</TypeChooser>
		);
	}
}