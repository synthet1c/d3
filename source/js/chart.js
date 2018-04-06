import * as d3 from 'd3'

import {
	fadeInEach,
	fadeInEachCss,
	setColor,
	prop,
	addClass,
	removeClass,
	handPath,
	handPalmPath,
} from "./helpers";

export default function chart(target, size, data) {

	const settings = {
		chart: {
			padding: {
				top: 5,
				right: 5,
				bottom: 5,
				left: 5
			}
		},
		content: {
			padding: {
				top: 60,
				right: 5,
				bottom: 60,
				left: 5
			}
		},
		header: {
			height: 60
		},
		bar: {
			height: 60,
			padding_bars: 5,
		},
		footer: {
			height: 40
		},
	}

	let currentData = data
	let currentWidth = window.innerWidth - 100
	let currentHeight = 0
	let toggleActive

	// global elements
	const Wrapper = d3.select(target).attr('class', 'chart')
	const SVG = Wrapper.insert('svg').attr('class', 'chart__svg')
	const Inner = SVG.append('g').attr('class', 'chart__inner')
	const Header = Inner.append('g').attr('class', 'chart__header')
	const Info  = Header.append('g').attr('class', 'chart__info')
	const Controls = Header.append('g').attr('class', 'chart__controls')
	const Hand = Info.append('path').attr('class', 'chart__hand')
	const InfoText = Info.append('text').attr('class', 'chart__info--text')
	const Content = Inner.append('g').attr('class', 'chart__content')
	const Footer = Inner.append('g').attr('class', 'chart__footer')
	const Labels = Wrapper.append('div').attr('class', 'chart__labels')
	// bars
	let Bars
	let Bar
	// conditional elements
	let Label

	// Scalers
	let xScale
	let yScale

	function el(type) {
		return function(className, attrs) {
			return function (data, ...children) {
				const node = d3.select('type')
					.attr('class', className)
				Object.keys(attrs).forEach(key => {
					node.attr(key, attrs[key])
				})
				children.forEach(child => {
					if (typeof child === 'function') {
						child.call({ parent: node, node }, data)
					}
					node.append(child)
				})
				return node
			}
		}
	}

	function init(data) {
		currentData = data
		setHeight()
		setWidth()
		initHeader()
		initContent()
		initSVG()
		initFooter()

		// set up the scalers
		xScale = d3
			.scaleLinear().domain(d3.extent(data, d => d.value))
			.range([0, currentWidth])

		yScale = d3.scaleBand()
			.rangeRound([0, settings.bar.height])
			.padding(0.2)
	}

	function setHeight() {
		return (
			currentHeight =
				data.length * (
						settings.content.padding.top
					+ settings.content.padding.bottom
					+ settings.header.height
					+ settings.footer.height
				)
		)
	}

	function setWidth() {
		return (
			currentWidth = (
					size
				- settings.chart.padding.left
				- settings.chart.padding.right
				- settings.content.padding.left
				- settings.content.padding.right
			)
		)
	}

	function initMobile(data) {
		// Mobile settings
		settings.content.padding.right = 205
		settings.bar.heigh = 50
		// set the svg size
		SVG.attr('height', currentHeight).attr('width', window.innerWidth - 100)
		Content.attr('transform', translate(settings.content.padding.right, settings.header.height))

		Labels.style('margin-top', settings.bar.padding_bars + 'px')

		// Data bind
		const Label = Labels
			.selectAll('.chart__label')
				.data(data)

		// Exit
		Label.exit().remove()
		// Enter
		Label.enter()
			.append('div')
				.attr('class', 'chart__label')
				.style('height', yScale.bandwidth())
				.style('transform', (d, i) => `translate(0px, ${(i * settings.bar.height) + settings.bar.padding}px)`)
				.text(d => d.name)
		// Update
		Label
			.attr('class', 'chart__label')
			.style('height', yScale.bandwidth())
			.style('transform', (d, i) => `translate(0px, ${(i * settings.bar.height) + settings.bar.padding}px)`)
			.text(d => d.name)

		// Data bind
		// Bars = Content.selectAll('.chart__bar').data(data)
		let newGroup = Content.selectAll('.chart__bar').data(data)
		newGroup.exit().remove()

		newGroup = newGroup
			.enter()
			.append('g')
				.attr('class', d => `chart__bar chart__bar--${setColor(d)}`)
				.attr('transform', (d, i) => `translate(0, ${i * yScale.bandwidth()})`)

		var a = newGroup.append('g').attr('class', 'chart__bar--container')

		a.append('rect')
				.attr('class', 'chart__bar--bar')
				.attr('y', d => yScale(d.value))
				.attr('height', yScale.bandwidth())

		var barEntry = Content.selectAll('.chart__bar')
			.data(currentData)
			.attr('transform', (d, i) => translate(
				settings.chart.padding.left,
				i * yScale.bandwidth() + 10
			))

			barEntry.select('.chart__bar--container')
				.attr('transform', d => translate(settings.bar.padding_bars, 0))

			barEntry.select('.chart__bar--bar')
				.attr('height', yScale.bandwidth())

			setMobileBarsWidth(data, barEntry.select('.chart__bar--bar'))


		/*
		// Exit
		Bars.exit().remove()
		// Enter
		const BarsEnter = Bars.enter()
			.append('g')
				.attr('class', d => `chart__bar chart__bar--${setColor(d)}`)
				.attr('transform', (d, i) => `translate(0, ${(i * settings.bar.height)})`)

		const BarRect = BarsEnter
			.enter()
			.append('rect')
				.attr('class', 'chart__bar--bar')
				.attr('y', d => yScale(d.value))
				.attr('height', yScale.bandwidth())

		BarRect.exit().remove()

		BarRect
			.attr('class', 'chart__bar--bar')
				.attr('y', d => yScale(d.value))
				.attr('height', yScale.bandwidth())
*/
		/*
		const BarText = BarsEnter
			.append('text')
				.attr('class', 'chart__bar--text')
				.attr('height', yScale.bandwidth())
				.text(d => d.name)

		console.log(Bar, BarText)
		*/

		// setMobileBarsWidth(data, BarRect)

		// Update
		/*
		Bars
			.attr('class', d => `chart__bar chart__bar--${setColor(d)}`)
			.select('rect')
				.attr('transform', (d, i) => translate(0, (i * settings.bar.height + settings.bar.padding_bars)))
				.attr('y', d => yScale(d.value))
				.attr('height', settings.bar.height)

		setMobileBarsWidth(data, Bars)
		*/
	}

	function setMobileBarsWidth(data, selection) {
		/*
		const [min, max] = d3.extent(data, d => d.value)
		if(min <= -5) {
			selection
				.attr('width', d => xScale(d.value))
				.attr('x', d => currentWidth - xScale(d.value))
		}
		else if (min > -5 && max < -5)	{
		*/
			selection
				.attr('width', d => Math.abs(xScale(d.value) - xScale(0)))
				.attr('x', d => xScale(Math.min(0, d.value)))
		/*
		}
		else {
			selection
				.attr('width', d => xScale(d.value))
				.attr('x', 0)
		}
		*/
	}

	function updateMobile(data) {



	}

	function initDesktop(data) {
		settings.content.padding.right = 5
		settings.bar.heigh = 20
		SVG.attr('viewBox', [
			0,
			0,
			(
				currentWidth
				+ settings.chart.padding.left
				+ settings.chart.padding.right
				+ settings.content.padding.left
				+ settings.content.padding.right
			),
			currentHeight,
		].join(' '))
	}

	function update(data) {
		const Bars = Content.selectAll()
	}

	return {
		init(data) {
			init(data)
			initMobile(data)
			/*
			if (window.innerWidth > 600) {
				initMobile(data)
			}
			else {
				initDesktop(data)
			}
			*/
		},
		resize(data) {

		},
		update(data) {
			currentData = data
			console.log('update', data)
			initMobile(data)
		}
	}

	/**
	 * initHeader
	 *
	 * create the header and attach to the svg dom
	 */
	function initHeader() {
		Info.attr('transform', `translate(275, 0)`)
		// hand svg
		Hand.attr('d', handPath).attr('stroke', '#9f3b7e')
		// palm svg
		Hand.append('path')
			.attr('d', handPalmPath)
			.attr('transform', 'translate(22 8)')
			.attr('stroke', '#9f3b7e')
		// header text
		Info.append('text')
			.attr('class', 'info__text')
			.text('Toggle along the slider to find out more')
			.attr('transform', 'translate(50, 20)')
	}

	function initContent() {
		Inner.attr('transform', translate(
			settings.chart.padding.left,
			settings.chart.padding.top
		))
		Content.attr('transform', translate(
			settings.content.padding.left,
			settings.header.height
		))
	}

	/**
	 * initSVG
	 *
	 * apply the padding to the chart
	 */
	function initSVG() {
		// SVG.attr('transform', `translate(${settings.content.padding.left}, ${settings.content.padding.right})`)
	}

	/**
	 * initFooter
	 *
	 * create and attach the footer to the svg
	 */
	function initFooter() {

		Footer.attr('transform', `translate(0, ${currentHeight - 160})`)

		Footer
			.append('rect')
			.attr('class', 'chart__trigger__all')
			.attr('stroke', '#B1B3B6')
			.attr('stroke-width', 3)
			.attr('width', 25)
			.attr('height', 25)
			.on('click', d => Chart.attr('class', 'chart__inner'))

		Footer.append('text')
			.attr('y', 15)
			.attr('x', 40)
			.attr('class', 'chart__trigger__label--all')
			.on('click', d => Chart.attr('class', 'chart__inner'))
			.text('Show All Industries')

		const Disclaimer =
			Footer
				.append('g')
				.attr('class', 'chart__disclaimer')
				.attr('transform', `translate(0, 60)`)

		Disclaimer
			.append('text')
			.text('AU: Source:')
			.style('font-weight', 'bold')

		Disclaimer
			.append('text')
			.text('SEEK Employment Trends. January - December 2017 vs. January - December 2016. Published April 2018.')
			.attr('transform', `translate(60, 0)`)

		Footer.append('svg:image')
			.attr('xlink:href', '/logo.svg')
			.attr('height', 68)
			.attr('width', 100)
			.attr('x', currentWidth - 200)
	}

	function translate(x, y) {
		return `translate(${x}, ${y})`
	}
}