import * as d3 from 'd3'
console.log(d3)

const data = [
  { name: 'a', value: 4 },
  { name: 'b', value: 8 },
  { name: 'c', value: 15 },
  { name: 'd', value: 16 },
  { name: 'e', value: 23 },
  { name: 'f', value: 42 },
  { name: 'g', value: 38 },
]

const width = 420
const barHeight = 20

// create a scaler for the data
const x = d3
  .scaleLinear()
  .domain([0, d3.max(data, data => data.value)])
  .range([0, width])

// set the height and width of the chart element
const Chart = d3.select('.chart')
  .attr('width', width)
  .attr('height', barHeight * data.length)

// create the bars for the chart
const bar = Chart
// join the data
  .selectAll('g')
  .data(data)
  // append each row
  .enter().append('g')
  // set the bar offset
  .attr('transform', (d, i) => `translate(0, ${i * barHeight})`)

// append the bar rect
bar.append('rect')
  // set the width with the scaler
  .attr('width', d => x(d.value))
  // set the height of the rect
  .attr('height', barHeight - 1)

// append a text element
bar.append('text')
  // set the horizontal position of the text minus the right margin
  .attr('x', d => x(d.value) - 5)
  // set the height of the text
  .attr('y', barHeight / 2)
  // set the center offset of the text
  .attr('dy', '.35em')
  // set the text
  .text(d => d.value)


