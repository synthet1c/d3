mport * as d3 from 'd3'
console.log(d3)

const data = [4, 8, 15, 16, 23, 42].reverse()

/*
 d3.select('.chart')
 .selectAll('div')
 .data(data)
 .enter().append('div')
 .style('width', d => d * 10 + 'px')
 .text(d => d)
 */

// a scaler allows use to scale a value to a specified range
const x = d3
// create a scaler function
  .scaleLinear()
  // set the min and max values for your data
  .domain([0, d3.max(data)])
  // set the chart max scale
  .range([0, 420])

// select the root element for the chart
d3.select('.chart')
  // create a fake selection to create virtual elements to join data
  .selectAll('div')
  // join the data to the virtual elements
  .data(data)
  // don't know what this does
  .enter()
  // probably every element in your data set runs this
  .append('div')
  // style the data element using a function to calculate
  .style('width', d => x(d) + 'px')
  // set a label for the data
  .text(d => d)
