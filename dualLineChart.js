barChart = function(_target, _targetWidth, _targetHeight, _data) {
	function init() {
		svgWorld = d3.select(targetDiv).insert("svg").attr("class", "svg-world").attr("width", currentWidth).attr("height", currentHeight),
			barGroup = svgWorld.append("g").attr("class", "bar-group");
		var bg = barGroup.append("g").attr("class", "block block--a");
		bg.append("rect"),
			bg.append("text").text(""),
			bg = barGroup.append("g").attr("class", "block block--b"),
			bg.append("rect"),
			bg.append("text").text(""),
			indicatorBar = svgWorld.append("line").attr("class", "indicator"),
			update(currentData, 500)
	}
	function update(_data, _aniSpeed) {
		currentData = _data,
			xMapping.domain([0, currentData.total]),

			barGroup.select(".block--a").select("rect").attr("width", settings.blockSize - 2 * settings.blockPadding).attr("height", currentHeight - 2 * settings.blockPadding).attr("transform", function() {
				return "translate(" + settings.blockPadding + ", " + settings.blockPadding + ")"
			}),

			barGroup.select(".block--a").select("text").attr("transform", function() {
				return "translate(" + settings.blockSize / 2 + ", " + (currentHeight / 2 + settings.textOffset) + ")"
			}).text(function() {
				var val = currentData.a / currentData.total * 100;
				return val = val % Math.floor(val) == .5 ? Math.ceil(val).toFixed(0) : val.toFixed(0),
					isNaN(val) ? "0%" : val + "%"
			}),
			barGroup.select(".block--b").attr("transform", function() {
				return "translate(" + (currentWidth - settings.blockSize) + ", 0)"
			}),
			barGroup.select(".block--b").select("rect").attr("width", settings.blockSize - 2 * settings.blockPadding).attr("height", currentHeight - 2 * settings.blockPadding).attr("transform", function() {
				return "translate(" + settings.blockPadding + ", " + settings.blockPadding + ")"
			}),
			barGroup.select(".block--b").select("text").attr("transform", function() {
				return "translate(" + settings.blockSize / 2 + "," + (currentHeight / 2 + settings.textOffset) + ")"
			}).text(function() {
				var val = currentData.b / currentData.total * 100;
				return val = val % Math.floor(val) == .5 ? Math.floor(val).toFixed(0) : val.toFixed(0),
					isNaN(val) ? "0%" : val + "%"
			}),
			indicatorBar.transition().duration(_aniSpeed).attr("x1", xMapping(d3.max([currentData.a, 0]))).attr("x2", xMapping(d3.max([currentData.a, 0]))).attr("y1", settings.blockPadding).attr("y2", currentHeight - settings.blockPadding)
	}
	function resize(_newWidth) {
		currentWidth = _newWidth,
			svgWorld.attr("width", currentWidth),
			xMapping.rangeRound([settings.blockSize, currentWidth - settings.blockSize]),
			update(currentData, 0)
	}
	var svgWorld, barGroup, indicatorBar, targetDiv = _target, currentWidth = _targetWidth, currentHeight = _targetHeight, currentData = _data, settings = {
		blockSize: 50,
		textOffset: 6,
		blockPadding: 4
	}, xMapping = d3.scaleLinear().rangeRound([settings.blockSize, currentWidth - settings.blockSize]).domain([0, currentData.total]).clamp(!0);
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