import * as d3 from 'd3'
import data from './data'

console.log(data)

const width = 800
const barHeight = 25

const prop = x => o => o[x]
const setColor = d =>
  d.value < 5 && d.value > -5
    ? 'teal' : d.value >= 5
      ? 'blue'
      : 'purple'

const x = d3
  .scaleLinear()
  .domain(d3.extent(data, d => d.value))
  .range([0, width])

const y = d3
  .scaleBand()
  .rangeRound([0, barHeight])
  .padding(0.2)

const chart = d3.select('.chart')
  .attr('width', width)
  .attr('height', barHeight * data.length)

const bar = chart
  .selectAll('g')
  .data(data)
  .enter().append('g')
  .attr('transform', (d, i) => `translate(0, ${i * barHeight})`)

bar.append('rect')
  .attr('class', setColor)
  .attr('x', d => x(Math.min(0, d.value)))
  .attr('y', d => y(d.value))
  .attr('width', d => Math.abs(x(d.value) - x(0)))
  .attr('height', 19)

// percentage
bar.append('text')
  .attr('class', d => `text ${setColor(d)}`)
  .attr('x', d => d.value > 0 ? x(d.value) + 30 : x(d.value) - 5)
  .attr('y', barHeight / 2)
  .attr('dy', '.1em')
  .text(d => d.value + '%')

// label
bar.append('text')
  .attr('x', d => d.value < 0 ? width : width / 2 + 50)
  .attr('y', barHeight / 2)
  .attr('dy', '.1em')
  .attr('text-anchor', d => d.value < 0 ? 'start' : 'end')
  .text(d => d.name)
