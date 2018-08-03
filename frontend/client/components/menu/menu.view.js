import React from 'react';
import { getStocks } from "../../utils/getstock";
import PropTypes from 'prop-types';

export default class MenuView extends React.Component {

	constructor() {
		super();

		this.state = {
			stocks: null,
		};
	}

	componentDidMount() {
		getStocks().then(data => {
			this.setState({stocks: data});
		});
	}

	render() {
		console.log('rendering: ' + this.state.stocks);
		if (this.state.stocks === null ) {
			return <div>Loading...</div>
		}

		console.log('stugg');
		return <div> {this.state.stocks.map(stock => stock)} </div>
	}
}

MenuView.propTypes = {

};