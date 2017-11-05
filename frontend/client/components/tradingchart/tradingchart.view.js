import React from 'react';
import TradingChart from './trading.chart';
import getStock from "./getstock";
import { getBuys, getSells } from "./gettrades";
import PropTypes from 'prop-types';

export default class AreaChartView extends React.Component {

	constructor() {
		super();

		this.state = {
			buys: null,
			stock: null,
			sells: null
		};
	}

	componentDidMount() {
		const id =  `${this.props.match.params.date}/${this.props.match.params.stock}`;
		Promise.all([getStock(id), getBuys(id), getSells(id)]).then((results) => {
			this.setState({
				stock: results[0],
				buys: results[1],
				sells: results[2]
			});
		});
	}

	componentWillUpdate(nextProps, nextState) {
		console.log('Will update areachart.view');
	}

	render() {
		if (this.state.buys === null || this.state.stock === null || this.state.sells === null) {
			return <div>Loading...</div>
		}

		return (
			<TradingChart
				stock={this.state.stock}
				buys={this.state.buys}
				sells={this.state.sells}
			/>
		);
	}
}

AreaChartView.propTypes = {
	match: PropTypes.object.isRequired
};