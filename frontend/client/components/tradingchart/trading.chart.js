import React from "react";
import PropTypes from "prop-types";
import { scaleTime } from "d3-scale";
import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { timeParse } from "d3-time-format";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";
import { last } from "react-stockcharts/lib/utils";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import * as d3 from "d3";

function formatTimeForChart(date) {
	return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

class D3Chart extends React.Component {

	componentDidMount() {
		this.createChart();
	}
	componentDidUpdate() {
		this.createChart();
	}

	createChart() {
		let svg = d3.select(this.node),
			margin = {top: 20, right: 20, bottom: 110, left: 40},
			margin2 = {top: 430, right: 20, bottom: 30, left: 40},
			width = +svg.attr("width") - margin.left - margin.right,
			height = +svg.attr("height") - margin.top - margin.bottom,
			height2 = +svg.attr("height") - margin2.top - margin2.bottom;

		//let parseDate = d3.timeParse("%b %Y");

		let x = d3.scaleTime().range([0, width]),
			x2 = d3.scaleTime().range([0, width]),
			y = d3.scaleLinear().range([height, 0]),
			y2 = d3.scaleLinear().range([height2, 0]);

		let xAxis = d3.axisBottom(x),
			xAxis2 = d3.axisBottom(x2),
			yAxis = d3.axisLeft(y);

		let brush = d3.brushX()
			.extent([[0, 0], [width, height2]])
			.on("brush end", brushed);

		let zoom = d3.zoom()
			.scaleExtent([1, Infinity])
			.translateExtent([[0, 0], [width, height]])
			.extent([[0, 0], [width, height]])
			.on("zoom", zoomed);

		let area = d3.area()
			.curve(d3.curveMonotoneX)
			.x(function(d) { return x(d.date); })
			.y0(height)
			.y1(function(d) { return y(d.price); });

		let area2 = d3.area()
			.curve(d3.curveMonotoneX)
			.x(function(d) { return x2(d.date); })
			.y0(height2)
			.y1(function(d) { return y2(d.price); });

		svg.append("defs").append("clipPath")
			.attr("id", "clip")
			.append("rect")
			.attr("width", width)
			.attr("height", height);

		let focus = svg.append("g")
			.attr("class", "focus")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		let context = svg.append("g")
			.attr("class", "context")
			.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

		x.domain(d3.extent(this.props.stock, function(d) { return d.date; }));
		y.domain([
			d3.min(this.props.stock, function(d) { return d.price; }),
			d3.max(this.props.stock, function(d) { return d.price; })
		]);
		x2.domain(x.domain());
		y2.domain(y.domain());

		focus.append("path")
			.datum(this.props.stock)
			.attr("class", "area")
			.attr("d", area);

		focus.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		focus.append("g")
			.attr("class", "axis axis--y")
			.call(yAxis);

		//added dot code
		focus.selectAll("dot")
			.data(this.props.buys)
			.enter()
			.append("circle")
			.attr("class", "buy-circle-color")
			.attr("r", 3.5)
			.attr("cx", function(d) { return x(d.date); })
			.attr("cy", function(d) { return y(d.price); });

		focus.selectAll("dot")
			.data(this.props.sells)
			.enter()
			.append("circle")
			.attr("class", "sell-circle-color")
			.attr("r", 3.5)
			.attr("cx", function(d) { return x(d.date); })
			.attr("cy", function(d) { return y(d.price); });

		context.append("path")
			.datum(this.props.stock)
			.attr("class", "area")
			.attr("d", area2);

		context.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + height2 + ")")
			.call(xAxis2);

		context.append("g")
			.attr("class", "brush")
			.call(brush)
			.call(brush.move, x.range());

		svg.append("rect")
			.attr("class", "zoom")
			.attr("width", width)
			.attr("height", height)
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.call(zoom);

		function brushed() {
			//Called on drag and on zoom i think
			if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
			var s = d3.event.selection || x2.range();
			x.domain(s.map(x2.invert, x2));
			focus.select(".area").attr("d", area);
			focus.select(".axis--x").call(xAxis);
			svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
				.scale(width / (s[1] - s[0]))
				.translate(-s[0], 0));

			setCirclePositions();
		}

		function zoomed() {
			if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
			var t = d3.event.transform;
			x.domain(t.rescaleX(x2).domain());
			focus.select(".area").attr("d", area);
			focus.select(".axis--x").call(xAxis);

			setCirclePositions();

			context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
		}

		function setCirclePositions() {
			//added dot code
			focus.selectAll("circle")
				.attr("cx", function(d) { return x(d.date); })
				.attr("cy", function(d) { return y(d.price); });
		}
	}

	render() {
		return (
			<div>
				<svg
					width="1200"
					height="500"
					ref={node => this.node = node}
				/>
				<p>
					<span className="buy-circle-color"> Bought </span>
					<span className="sell-circle-color"> Sold </span>
				</p>
			</div>
		);
	}
}

D3Chart.propTypes = {
	stock: PropTypes.array.isRequired,
	buys: PropTypes.array.isRequired,
	sells: PropTypes.array.isRequired
};

D3Chart.defaultProps = {
};

export default D3Chart;