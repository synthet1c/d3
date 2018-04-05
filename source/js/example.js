import * as d3 from 'd3'
import data from './data'

var margin = {top: 20, right: 30, bottom: 40, left: 30},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
	.range([0, width]);

var y = d3
		.scaleBand()
    .rangeRound([0, height])
    .padding(0.1)

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function update(data) {
	x.domain(d3.extent(data, function(d) { return d.value; })).nice();
	y.domain(data.map(function(d) { return d.name; }));

	svg.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
		.attr("x", function(d) { return x(Math.min(0, d.value)); })
		.attr("y", function(d) { return y(d.name); })
		.attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
		.attr("height", y.bandwidth());
};

update(data)

function type(d) {
	d.value = +d.value;
	return d;
}