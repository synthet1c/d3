import * as d3 from 'd3'
import data from './data'

console.log(d3)
// resort the data by value property
data.sort((a, b) => b.value - a.value)
console.log(data)

const margin = {
	top: 50,
	right: 50,
	bottom: 50,
	left: 50,
}

const barHeight = 25
const headerHeight = 60
const axisHeight = 40
const footerHeight = 40
const width = 800 - margin.left - margin.right

const prop = x => o => o[x]

const setColor = d => {
	switch (true) {
		case d.value > -5 && d.value < 5:
			return 'teal'
		case d.value <= 5:
			return 'purple'
		default:
			return 'blue'
	}
}

function render(data, animate) {

  console.log('data', data)
  const height = barHeight * data.length + (margin.top + margin.bottom + headerHeight + axisHeight)

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .range([0, width])

  const y = d3
    .scaleBand()
    .rangeRound([0, barHeight])
    .padding(0.2)

  const chart = d3.select('.chart')
    // apply the margins to the height and width
    .attr('viewBox', [
      0,
      0,
      width + margin.left + margin.right,
      height,
    ].join(' '))
    // add a group to translate by the margin
    .append('g')
    .attr('class', 'chart__inner')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const circles = [
    {x: 40, color: '#9f3b7e', colorName: 'purple', text: 'Tightening'},
    {x: width / 2, color: '#03a5ad', colorName: 'teal', text: 'No Change'},
    {x: width - 40, color: '#3f51b5', colorName: 'blue', text: 'Easing'}
  ]

  const Header = chart
    .append('g')
    .attr('class', 'chart__header')

  Header
    .append('line')
    .style('stroke-width', 3)
    .style('stroke', '#3b3b3b')
    .attr('x1', 40)
    .attr('y1', 0)
    .attr('x2', width - 40)
    .attr('y2', 0)

  const toggleActive = d => {
    d3.event.stopPropagation()
    const [clazz, color] = chart.attr('class').split(' ')
    if (color === d.colorName) {
      chart.attr('class', 'chart__inner')
    }
    else {
      chart.attr('class', `chart__inner ${d.colorName}`)
    }
  }

  Header
    .selectAll('circle')
    .data(circles)
    .enter().append('circle')
    .attr('class', d => `chart__trigger ${d.colorName}`)
    .attr('stroke', d => d.color)
    .attr('stroke-width', 3)
    .attr('cx', d => d.x)
    .attr('r', 12)
    .on('click', toggleActive)

  Header
    .selectAll('text')
    .data(circles)
    .enter()
    .append('text')
    .attr('class', 'chart__trigger__label')
    .attr('x', d => d.x)
    .attr('y', 30)
    .attr('text-anchor', 'middle')
    .on('click', toggleActive)
    .text(d => d.text)

  // bar groups
  const Bar = chart
    .append('g')
      .attr('class', 'chart__content')
      .selectAll('g')
      .attr('class', 'chart__header')
      .data(data)
      .enter()
        .append('g')
          .attr('class', d => `chart__bar ${setColor(d)}`)
          .attr('transform', (d, i) => `translate(0, ${i * barHeight + headerHeight})`)

  // bar
  const Bars = Bar.append('rect')
    .attr('class', d => `bar ${setColor(d)}`)
    .attr('height', 19)

  if (!animate) {
    Bars
      .attr('width', d => Math.abs(x(d.value) - x(0)))
      .attr('x', d => x(Math.min(0, d.value)))
  }
  else {
    Bars
      .attr('width', 0)
      .attr('x', d => d.value < 0 ? x(0) : x(Math.min(0, d.value)))
      .attr('y', d => y(d.value))
      .transition()
      .attr('width', d => Math.abs(x(d.value) - x(0)))
      .attr('x', d => d.value < 0 ? x(Math.min(d.value)) : x(0))
      .duration(1000)
      .delay((d, i) => i * 60)
  }

// percentage
  const Percentage = Bar.append('text')
    .attr('class', d => `percentage ${setColor(d)}`)
    .attr('text-anchor', d => d.value < 0 ? 'end' : 'start')
    .attr('x', d => d.value > 0 ? x(d.value) + 5 : x(d.value) - 5)
    .attr('y', barHeight / 2)
    .attr('dy', '.1em')
    .text(d => d.value + '%')


  // label
  const Label = Bar.append('text')
    .attr('class', 'label')
    .attr('text-anchor', d => d.value < 0 ? 'start' : 'end')
    .attr('x', d => d.value < 0 ? x(0) + 10 : x(0) - 10)
    .attr('y', barHeight / 2)
    .attr('dy', '.1em')
    .text(d => d.name)


  const axis = d3.axisBottom(x)

  const Axis = chart
    .append('g')
    .attr('class', 'chart__axis')
    .attr('transform', `translate(0, ${height - 120})`)
    .call(axis)


  const Footer = chart
    .append('g')
      .attr('class', 'chart__footer')
      .attr('transform', `translate(0, ${height - 80})`)

  Footer
    .append('rect')
      .attr('class', 'chart__trigger__all')
      .attr('stroke', '#B1B3B6')
      .attr('stroke-width', 3)
      .attr('width', 25)
      .attr('height', 25)
      .on('click', d => chart.attr('class', 'chart__inner'))

  Footer.append('text')
    .attr('y', 15)
    .attr('x', 40)
    .attr('class', 'chart__trigger__label--all')
    .on('click', d => chart.attr('class', 'chart__inner'))
    .text('Show All Industries')

  if (animate) {
    fadeInEach(Header, 400, 70 * data.length)
    fadeInEach(Percentage, 1000)
    fadeInEach(Label)
    fadeInEach(Axis, 400, 70 * data.length)
    fadeInEach(Footer, 400, 70 * data.length)
  }
}

function fadeInEach(obj, time, delay) {
  return obj
   .attr('opacity', 0)
   .transition()
   .attr('opacity', 1)
   .duration(400)
   .delay((d, i) => i * 60)
}

function renderMobile(data, animate) {

  const margin = {
    top: 50,
    right: 0,
    bottom: 50,
    left: 0,

  }
  const barHeight = 50
  console.log('datas', data)
  const height = barHeight * data.length + (margin.top + margin.bottom + headerHeight + axisHeight)
  const sidebarWidth = 200
  const width = 800 - margin.left - margin.right - sidebarWidth

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .range([0, width - sidebarWidth - 100])

  const y = d3
    .scaleBand()
    .rangeRound([0, barHeight])
    .padding(0.2)

  const chart = d3.select('.chart')
    // apply the margins to the height and width
    .attr('viewBox', [
      0,
      0,
      width + margin.left + margin.right + sidebarWidth,
      height,
    ].join(' '))
    // add a group to translate by the margin
    .append('g')
    .attr('class', 'chart__inner')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const controls = [
    { x: 40, color: '#9f3b7e', colorName: 'purple', text: 'Tightening' },
    { x: (width + sidebarWidth) / 2, color: '#03a5ad', colorName: 'teal', text: 'No Change' },
    { x: (width + sidebarWidth) - 40, color: '#3f51b5', colorName: 'blue', text: 'Easing' }
  ]

  const Header = chart
    .append('g')
      .attr('class', 'chart__header')

  Header
    .append('line')
    .style('stroke-width', 3)
    .style('stroke', '#3b3b3b')
    .attr('x1', 40)
    .attr('y1', 0)
    .attr('x2', width + sidebarWidth - 40)
    .attr('y2', 0)

  const toggleActive = d => {
    d3.event.stopPropagation()
    const [clazz, color] = chart.attr('class').split(' ')
    if (color === d.colorName) {
      chart.attr('class', 'chart__inner')
    }
    else {
      chart.attr('class', `chart__inner ${d.colorName}`)
    }
  }

  // chart controls
  Header
    .selectAll('circle')
    .data(controls)
    .enter()
      .append('circle')
        .attr('class', d => `chart__trigger ${d.colorName}`)
        .attr('stroke', d => d.color)
        .attr('stroke-width', 3)
        .attr('cx', d => d.x)
        .attr('r', 12)
        .on('click', toggleActive)

  // chart control labels
  Header
    .selectAll('text')
    .data(controls)
    .enter()
      .append('text')
        .attr('class', 'chart__trigger__label')
        .attr('x', d => d.x)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .on('click', toggleActive)
        .text(d => d.text)

  const LabelsGroup =
    chart
      .append('g')
      .attr('class', 'chart__labels')

  const Labels =
    LabelsGroup
      .selectAll('text')
      .data(data)
      .enter()
        .append('text')
        .attr('transform', (d, i) => `translate(0, ${i * barHeight + headerHeight + 15})`)
        .attr('width', 300)
        .text(d => d.name)

  // bar groups
  const Content = chart
    .append('g')
      .attr('class', 'chart__content')
      .attr('transform', `translate(${sidebarWidth * 2}, 0)`)


  const BarGroups =
    Content
      .selectAll('g')
        .data(data)
        .enter()
          .append('g')
            .attr('class', d => `chart__bar ${setColor(d)}`)
            .attr('transform', (d, i) => `translate(0, ${i * barHeight + headerHeight})`)

  // bar
  const Bars = BarGroups.append('rect')
    .attr('class', d => `bar ${setColor(d)}`)
    .attr('height', barHeight - 10)

  if (!animate) {
    Bars
      .attr('width', d => Math.abs(x(d.value) - x(0)))
      .attr('x', d => x(Math.min(0, d.value)))
  }
  else {
    Bars
      .attr('width', 0)
      .attr('x', d => d.value < 0 ? x(0) : x(Math.min(0, d.value)))
      .attr('y', d => y(d.value))
      .transition()
        .attr('width', d => Math.abs(x(d.value) - x(0)))
        .attr('x', d => d.value < 0 ? x(Math.min(d.value)) : x(0))
        .duration(1000)
        .delay((d, i) => i * 60)
  }

  // percentage
  const Percentage = BarGroups.append('text')
    .attr('class', d => `percentage ${setColor(d)}`)
    .attr('text-anchor', d => d.value < 0 ? 'end' : 'start')
    .attr('x', d => d.value > 0 ? x(d.value) + 5 : x(d.value) - 5)
    .attr('y', barHeight / 2)
    .attr('dy', '.1em')
    .text(d => d.value + '%')

  const axis = d3.axisBottom(x)

  const Axis = chart
    .append('g')
    .attr('class', 'chart__axis')
    .attr('width', width + (sidebarWidth))
    .attr('transform', `translate(${sidebarWidth * 2}, ${height - 120})`)
    .call(axis)


  const Footer = chart
    .append('g')
      .attr('class', 'chart__footer')
      .attr('transform', `translate(0, ${height - 80})`)

  Footer
    .append('rect')
      .attr('class', 'chart__trigger__all')
      .attr('stroke', '#B1B3B6')
      .attr('stroke-width', 3)
      .attr('width', 25)
      .attr('height', 25)
      .on('click', d => chart.attr('class', 'chart__inner'))

  Footer
    .append('text')
      .attr('y', 15)
      .attr('x', 40)
      .attr('class', 'chart__trigger__label--all')
      .on('click', d => chart.attr('class', 'chart__inner'))
      .text('Show All Industries')

  if (animate) {
    fadeInEach(Header, 400, 70 * data.length)
    fadeInEach(Percentage, 1000)
    fadeInEach(Labels)
    fadeInEach(Axis, 400, 70 * data.length)
    fadeInEach(Footer, 400, 70 * data.length)
  }
}


renderMobile(data.filter(d => d.value > 5), true)
