multiBarChartDrilldown = function(_target, _targetWidth, _data) {
	function init() {
		svgWorld = d3.select(targetDiv).insert("svg").attr("class", "svg-world svg-world--loading").attr("width", currentWidth).attr("height", currentHeight),
			barGroup = svgWorld.append("g").attr("class", "bar-groups"),
			labelGroup = d3.select(targetDiv).append("div").attr("class", "label-group"),
			update(currentData, 500)
	}
	function update(_data, _aniSpeed) {
		currentData = _data,
		currentData.length > 0 && svgWorld.attr("class", "svg-world"),
			currentHeight = d3.max([settings.bar.padding_groups * (.75 + _data.length), 120]),
			svgWorld.transition().duration(_aniSpeed).attr("height", currentHeight),
			xMapping.domain([0, d3.max(currentData, function(d) {
				return d3.max([d.a, d.b])
			})]);
		var newLabel = labelGroup.selectAll(".label").data(currentData);
		newLabel.exit().remove(),
			newLabel.enter().append("div").attr("class", "label").style("opacity", 0).style("width", settings.padding.left + "px").style("height", "50px"),
			labelGroup.selectAll(".label").transition().duration(_aniSpeed).style("opacity", 1).style("transform", function(d, index) {
				return "translate(0px," + settings.bar.padding_groups * (1 + index) + "px)"
			}),
			labelGroup.selectAll(".label").html(function(d) {
				return "<div>" + d.anno + "</div>"
			});
		var newGroup = barGroup.selectAll(".bar-group").data(currentData);
		newGroup.exit().remove(),
			newGroup = newGroup.enter().append("g").attr("class", function() {
				return "bar-group"
			});
		var a = newGroup.append("g").attr("class", "container container--a");
		a.append("rect").attr("class", "bar"),
			a.append("text").attr("class", "amount").attr("transform", function(d) {
				return "translate(0, " + settings.amount.ymargin + ")"
			});
		var b = newGroup.append("g").attr("class", "container container--b");
		b.append("rect").attr("class", "bar"),
			b.append("text").attr("class", "amount").attr("transform", function(d) {
				return "translate(0, " + settings.amount.ymargin + ")"
			});
		var barEntry = barGroup.selectAll(".bar-group").data(currentData).attr("transform", function(d, index) {
			return "translate(" + settings.padding.left + "," + settings.bar.padding_groups * (1 + index) + ")"
		});
		barEntry.select(".container--a").attr("transform", function() {
			return "translate(" + settings.bar.padding_label + ", 0)"
		}),
			barEntry.select(".container--a .bar").attr("height", settings.bar.height).transition().duration(_aniSpeed).attr("width", function(d) {
				return d3.max([xMapping(d.a), 0])
			}),
			barEntry.select(".container--a .amount").text(function(d) {
				return d.a.toFixed(1) + "%"
			}).transition().duration(_aniSpeed).attr("transform", function(d) {
				return "translate(" + (settings.amount.xpadding + d3.max([xMapping(d.a), 0])) + ", " + settings.amount.ymargin + ")"
			}),
			barEntry.select(".container--b").attr("transform", function() {
				return "translate(" + settings.bar.padding_label + "," + settings.bar.padding_bars + ")"
			}),
			barEntry.select(".container--b .bar").attr("height", settings.bar.height).transition().duration(_aniSpeed).attr("width", function(d) {
				return d3.max([xMapping(d.b), 0])
			}),
			barEntry.select(".container--b .amount").text(function(d) {
				return d.b.toFixed(1) + "%"
			}).transition().duration(_aniSpeed).attr("transform", function(d) {
				return "translate(" + (settings.amount.xpadding + d3.max([xMapping(d.b), 0])) + ", " + settings.amount.ymargin + ")"
			})
	}
	function resize(_newWidth) {
		currentWidth = _newWidth,
			svgWorld.attr("width", currentWidth),
			xMapping.rangeRound([0, currentWidth - (settings.padding.left + settings.padding.right + settings.bar.padding_label + settings.bar.padding_amount)]),
			update(currentData, 0)
	}
	var svgWorld, barGroup, labelGroup, targetDiv = _target, currentWidth = _targetWidth, currentHeight = 0, currentData = _data, settings = {
		padding: {
			left: 220,
			right: 10
		},
		bar: {
			height: 8,
			padding_bars: 14,
			padding_label: 10,
			padding_amount: 50,
			padding_groups: 45
		},
		amount: {
			xpadding: 5,
			ymargin: 9
		}
	};
	currentHeight = d3.max([settings.bar.padding_groups * (.75 + _data.length), 120]);
	var xMapping = d3.scaleLinear().rangeRound([2, currentWidth - (settings.padding.left + settings.padding.right + settings.bar.padding_label + settings.bar.padding_amount)]).clamp(!0);
	return {
		init: function() {
			init()
		},
		update: function(_newData) {
			update(_newData, 500)
		},
		resize: function(_newWidth) {
			resize(_newWidth)
		}
	}
}