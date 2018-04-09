const chart = function() {

	let width = window.innerWidth - 100
	let height
	let x, y

	const barHeight = 40

	const chart = d3.select('#chart')
		.append('svg')

	const content = chart.append('g')
		.attr('class', 'content')

	function init (data) {

		chart
			.attr('height', data.length * barHeight)
			.attr('width', width)

		update(data)
	}

	function update(data) {

		width = window.innerWidth - 100
		x = d3.scaleLinear().range([0, Math.max(10, width)])
		y = d3.scaleBand().rangeRound([0, barHeight])

		const bars = chart.selectAll('.bar-group')
			.data(data)

		bars.exit().remove()

		const barsEntry =
			bars
				.entry()
					.attr('transform', (d, i) => `translate(0, ${i * y.bandwidth()})`)
					.attr('y', d => y(d.value))
					.attr('height', y.bandwidth())

		bars
			.attr('transform', (d, i) => `translate(0, ${i * y.bandwidth()})`)
			.attr('y', d => y(d.value))
	}

	return {
		init,
		update
	}

}

const myChart = chart.init()