import * as d3 from 'd3'
import data from './data'
import render from './render'
import { fadeInEach, fadeInEachCss } from "./helpers";


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

const handPath = `M 10.4878 13.3337L 11.195 12.6267C 10.8055 12.2371 10.1742 12.2359 9.78322 12.6242C 9.39226 13.0124 9.38898 13.6437 9.77587 14.036L 10.4878 13.3337ZM 14.0268 16.8737L 14.1473 17.8665C 14.5271 17.8204 14.8473 17.5617 14.9721 17.2C 15.0969 16.8384 15.0045 16.4373 14.734 16.1667L 14.0268 16.8737ZM 7.04784 17.7207L 6.92736 16.728C 6.88393 16.7333 6.8409 16.7414 6.79854 16.7523L 7.04784 17.7207ZM 4.96984 20.8227L 3.98138 20.9742L 3.98156 20.9754L 4.96984 20.8227ZM 7.93584 22.8837L 7.93584 23.8837C 7.97772 23.8837 8.01956 23.8811 8.06111 23.8759L 7.93584 22.8837ZM 18.2078 21.5867L 18.1328 20.5896C 18.116 20.5908 18.0993 20.5925 18.0826 20.5946L 18.2078 21.5867ZM 21.0128 21.1977L 21.0128 20.1977C 20.9587 20.1977 20.9047 20.2021 20.8513 20.2109L 21.0128 21.1977ZM 21.1298 21.1877L 21.1298 22.1877C 21.1785 22.1877 21.227 22.1842 21.2751 22.1771L 21.1298 21.1877ZM 23.8658 19.8277L 23.1587 19.1207L 23.1583 19.1211L 23.8658 19.8277ZM 29.6808 14.0117L 28.9741 13.3043L 28.9737 13.3047L 29.6808 14.0117ZM 30.5918 8.04274L 31.2984 7.33508C 31.2924 7.32907 31.2863 7.32314 31.2801 7.31729L 30.5918 8.04274ZM 23.2348 1.06274L 22.5275 1.76966C 22.5338 1.77592 22.5401 1.7821 22.5466 1.78819L 23.2348 1.06274ZM 17.2628 1.93474L 17.9424 2.66839C 17.9517 2.65972 17.9609 2.65087 17.9699 2.64185L 17.2628 1.93474ZM 11.3938 7.37074L 10.7138 8.10388C 11.0971 8.4595 11.6897 8.45972 12.0734 8.10439L 11.3938 7.37074ZM 4.01584 0.526742L 3.30922 1.23433C 3.31791 1.24301 3.32676 1.25153 3.33576 1.25988L 4.01584 0.526742ZM 0.86884 1.02974L 0.162027 0.32234L 0.161144 0.323224L 0.86884 1.02974ZM 0.57984 3.96174L -0.126297 4.66982C -0.120241 4.67586 -0.114108 4.68182 -0.107898 4.6877L 0.57984 3.96174ZM 10.7038 13.5527L 10.0161 14.2787C 10.4122 14.654 11.0361 14.6424 11.418 14.2527C 11.8 13.863 11.799 13.239 11.4158 12.8505L 10.7038 13.5527ZM 9.78063 14.0407L 13.3196 17.5807L 14.734 16.1667L 11.195 12.6267L 9.78063 14.0407ZM 13.9064 15.881L 6.92736 16.728L 7.16832 18.7135L 14.1473 17.8665L 13.9064 15.881ZM 6.79854 16.7523C 6.06959 16.94 5.12553 17.1845 4.51919 17.8983C 3.85971 18.6747 3.7907 19.7298 3.98138 20.9742L 5.9583 20.6713C 5.78998 19.5727 5.96947 19.2803 6.04349 19.1931C 6.17065 19.0434 6.44509 18.9085 7.29714 18.6892L 6.79854 16.7523ZM 3.98156 20.9754C 4.16756 22.1797 4.88756 22.9405 5.69686 23.3668C 6.4674 23.7728 7.32002 23.8837 7.93584 23.8837L 7.93584 21.8837C 7.51966 21.8837 7.01878 21.8027 6.62907 21.5974C 6.27812 21.4125 6.03112 21.1428 5.95812 20.6701L 3.98156 20.9754ZM 8.06111 23.8759L 18.3331 22.5789L 18.0826 20.5946L 7.81057 21.8916L 8.06111 23.8759ZM 18.2829 22.5839C 19.1198 22.5209 20.187 22.3462 21.1744 22.1846L 20.8513 20.2109C 19.8347 20.3773 18.8639 20.5345 18.1328 20.5896L 18.2829 22.5839ZM 21.0128 22.1977L 21.0628 22.1977L 21.0628 20.1977L 21.0128 20.1977L 21.0128 22.1977ZM 21.0628 22.1977C 21.1405 22.1977 21.2042 22.1893 21.2459 22.1823C 21.2669 22.1787 21.2843 22.1752 21.2959 22.1728C 21.3067 22.1705 21.3163 22.1682 21.3179 22.1679C 21.3218 22.167 21.3177 22.168 21.3124 22.1691C 21.3063 22.1704 21.2945 22.1728 21.2791 22.1754C 21.2485 22.1806 21.196 22.1877 21.1298 22.1877L 21.1298 20.1877C 21.0522 20.1877 20.9885 20.1962 20.9467 20.2032C 20.9258 20.2067 20.9084 20.2103 20.8968 20.2127C 20.886 20.215 20.8764 20.2172 20.8748 20.2176C 20.8709 20.2185 20.875 20.2175 20.8803 20.2164C 20.8864 20.2151 20.8982 20.2127 20.9136 20.2101C 20.9442 20.2049 20.9967 20.1977 21.0628 20.1977L 21.0628 22.1977ZM 21.2751 22.1771C 22.4708 22.0015 23.6377 21.4713 24.5734 20.5344L 23.1583 19.1211C 22.552 19.7282 21.7909 20.0799 20.9845 20.1984L 21.2751 22.1771ZM 24.573 20.5348L 30.388 14.7188L 28.9737 13.3047L 23.1587 19.1207L 24.573 20.5348ZM 30.3876 14.7192C 31.3954 13.7125 32.2507 12.5317 32.5387 11.2453C 32.8455 9.87488 32.4781 8.51295 31.2984 7.33508L 29.8853 8.75041C 30.6076 9.47154 30.7357 10.1441 30.587 10.8084C 30.4195 11.5567 29.8683 12.411 28.9741 13.3043L 30.3876 14.7192ZM 31.2801 7.31729L 23.9231 0.337292L 22.5466 1.78819L 29.9036 8.76819L 31.2801 7.31729ZM 23.9421 0.355821C 22.7678 -0.81912 21.4104 -1.19904 20.0393 -0.905179C 18.7494 -0.628733 17.5658 0.217568 16.5557 1.22763L 17.9699 2.64185C 18.8609 1.75092 19.7128 1.21022 20.4584 1.05041C 21.1228 0.908024 21.8009 1.0426 22.5275 1.76966L 23.9421 0.355821ZM 16.5833 1.20109L 10.7143 6.63709L 12.0734 8.10439L 17.9424 2.66839L 16.5833 1.20109ZM 12.0739 6.6376L 4.69592 -0.206399L 3.33576 1.25988L 10.7138 8.10388L 12.0739 6.6376ZM 4.72246 -0.180849C 4.13864 -0.763868 3.34628 -1.04245 2.49663 -0.938043C 1.67052 -0.836532 0.871756 -0.386797 0.162028 0.32234L 1.57565 1.73714C 2.06692 1.24628 2.47616 1.07951 2.74055 1.04703C 2.9814 1.01743 3.16204 1.08735 3.30922 1.23433L 4.72246 -0.180849ZM 0.161144 0.323224C -0.545155 1.0307 -0.975677 1.81001 -0.999019 2.64479C -1.02269 3.49129 -0.622279 4.17519 -0.126297 4.66982L 1.28598 3.25367C 1.05096 3.01929 0.996369 2.83769 1.0002 2.70069C 1.00436 2.55197 1.08384 2.22978 1.57654 1.73626L 0.161144 0.323224ZM -0.107898 4.6877L 10.0161 14.2787L 11.3916 12.8268L 1.26758 3.23578L -0.107898 4.6877ZM 11.4158 12.8505L 11.1998 12.6315L 9.77587 14.036L 9.99187 14.255L 11.4158 12.8505Z`


const handPalmPath = "M 11.5294 1.84464C 11.7126 1.32361 11.4387 0.752756 10.9176 0.569595C 10.3966 0.386434 9.82576 0.660329 9.6426 1.18136L 11.5294 1.84464ZM 9.923 3.399L 10.7862 3.90394C 10.8184 3.84887 10.8452 3.79084 10.8664 3.73064L 9.923 3.399ZM 8.894 5.158L 9.65268 5.80946C 9.69184 5.76386 9.72681 5.71482 9.75716 5.66294L 8.894 5.158ZM 5.844 8.71L 6.47704 9.48412C 6.52243 9.447 6.56448 9.40595 6.60268 9.36146L 5.844 8.71ZM 0.851 12.793L 1.27986 13.6964C 1.35289 13.6617 1.42145 13.6183 1.48404 13.5671L 0.851 12.793ZM 0 13.197L -0.428861 12.2936C -0.722537 12.433 -0.930113 12.7065 -0.985421 13.0269C -1.04073 13.3472 -0.936865 13.6745 -0.706937 13.9043L 0 13.197ZM 2.087 15.283L 1.38006 15.9903L 1.38019 15.9904L 2.087 15.283ZM 3.297 16.492L 4.00543 15.7862L 4.00381 15.7846L 3.297 16.492ZM 5.206 17.404L 5.10042 18.3984L 5.10392 18.3988L 5.206 17.404ZM 7.775 16.492L 7.06795 15.7848L 7.06739 15.7854L 7.775 16.492ZM 14.432 9.836L 15.1391 10.5432L 15.1391 10.5431L 14.432 9.836ZM 14.432 5.36L 13.725 6.06717L 13.7252 6.06739L 14.432 5.36ZM 9.77804 -0.707173C 9.38748 -1.09766 8.75432 -1.0976 8.36383 -0.707041C 7.97334 -0.31648 7.9734 0.316685 8.36396 0.707173L 9.77804 -0.707173ZM 9.6426 1.18136L 8.9796 3.06736L 10.8664 3.73064L 11.5294 1.84464L 9.6426 1.18136ZM 9.05985 2.89406L 8.03084 4.65306L 9.75716 5.66294L 10.7862 3.90394L 9.05985 2.89406ZM 8.13532 4.50654L 5.08532 8.05854L 6.60268 9.36146L 9.65268 5.80946L 8.13532 4.50654ZM 5.21096 7.93588L 0.217965 12.0189L 1.48404 13.5671L 6.47704 9.48412L 5.21096 7.93588ZM 0.422139 11.8896L -0.428861 12.2936L 0.428861 14.1004L 1.27986 13.6964L 0.422139 11.8896ZM -0.706937 13.9043L 1.38006 15.9903L 2.79394 14.5757L 0.706937 12.4897L -0.706937 13.9043ZM 1.38019 15.9904L 2.59019 17.1994L 4.00381 15.7846L 2.79381 14.5756L 1.38019 15.9904ZM 2.58857 17.1978C 3.29213 17.904 4.18635 18.3014 5.10042 18.3984L 5.31158 16.4096C 4.83165 16.3586 4.36987 16.152 4.00543 15.7862L 2.58857 17.1978ZM 5.10392 18.3988C 6.30525 18.5221 7.55799 18.1245 8.48261 17.1986L 7.06739 15.7854C 6.58802 16.2655 5.93875 16.4739 5.30808 16.4092L 5.10392 18.3988ZM 8.48205 17.1992L 15.1391 10.5432L 13.7249 9.12884L 7.06795 15.7848L 8.48205 17.1992ZM 15.1391 10.5431C 16.7667 8.91554 16.7657 6.27815 15.1388 4.65261L 13.7252 6.06739C 14.5703 6.91185 14.5713 8.28247 13.7249 9.12889L 15.1391 10.5431ZM 15.139 4.65283L 9.77804 -0.707173L 8.36396 0.707173L 13.725 6.06717L 15.139 4.65283Z";

function renderMobile(data, animate) {

	console.log('datas', data)

	d3.select('.chart').exit().remove()

  const margin = {
    top: 50,
    right: 5,
    bottom: 50,
    left: 5,
  }
  const barHeight = 50
  const height = barHeight * data.length + (margin.top + margin.bottom + headerHeight + axisHeight)
  const width = 500 - margin.left - margin.right
	const sidebarWidth = width / 2

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .range([0, width - (sidebarWidth * 1.5) - margin.left - margin.right])

  const y = d3
    .scaleBand()
    .rangeRound([0, barHeight])
    .padding(0.2)

	const Wrapper = d3.select('.chart')

	Wrapper.attr('class', Wrapper.attr('class') + ' mobile')

  const Chart = Wrapper
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height)
    // add a group to translate by the margin
    .append('g')
    .attr('class', 'chart__inner')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const controls = [
    { x: 50, color: '#9f3b7e', colorName: 'purple', text: 'Tightening' },
    { x: (width) / 2, color: '#03a5ad', colorName: 'teal', text: 'No Change' },
    { x: (width) - 40, color: '#3f51b5', colorName: 'blue', text: 'Easing' }
  ]

	const LabelsGroup =
    Wrapper
			.append('div')
				.attr('class', 'labels')
				.attr('height', x(barHeight) + 'px')
				.attr('width', sidebarWidth + 'px')

  const Labels =
    LabelsGroup
      .selectAll('div')
      .data(data)
      .enter()
        .append('div')
				.attr('class', 'label labels__label')
				.attr('style', `height: ${40}px`)
        .attr('style', (d, i) => `transform:translate(0px, ${(i * barHeight) + 30}px)`)
				.text(d => d.name)

  const Header = Chart
    .append('g')
      .attr('class', 'chart__header')

  const InfoSection =
    Header
      .append('g')
			.attr('class', 'info')
			.attr('transform', 'translate(100, -45)')

  const HandGroup =
    InfoSection
      .append('g')
      .attr('class', 'info__symbol hand')

	HandGroup
		.append('path')
		.attr('d', handPath)
		.attr('stroke', '#9f3b7e')

  HandGroup
    .append('path')
			.attr('d', handPalmPath)
      .attr('transform', 'translate(22 8)')
			.attr('stroke', '#9f3b7e')
		  .attr('fill', '#9f3b7e')

  InfoSection
    .append('text')
			.attr('class', 'info__text')
			.text('Toggle along the slider to find out more')
			.attr('transform', 'translate(50, 20)')

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
    const [clazz, color] = Chart.attr('class').split(' ')
    if (color === d.colorName) {
      Chart.attr('class', 'chart__inner')
    }
    else {
      Chart.attr('class', `chart__inner ${d.colorName}`)
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

  // bar groups
  const Content =
		Chart
			.append('g')
				.attr('class', 'chart__content')
				.attr('transform', `translate(0, 0)`)


  const BarGroups =
    Content
      .selectAll('g')
        .data(data)
        .enter()
          .append('g')
            .attr('class', d => `chart__bar ${setColor(d)}`)
            .attr('transform', (d, i) => `translate(${sidebarWidth}, ${i * barHeight + headerHeight})`)

  // bar
  const Bars =
		BarGroups.append('rect')
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
  const Percentage =
		BarGroups.append('text')
			.attr('class', d => `percentage ${setColor(d)}`)
			.attr('text-anchor', d => d.value < 0 ? 'end' : 'start')
			.attr('x', d => d.value > 0 ? x(d.value) + 5 : x(d.value) - 5)
			.attr('y', barHeight / 2)
			.attr('dy', '.1em')
			.text(d => d.value + '%')

  const axis = d3.axisBottom(x)

  const Axis =
		Chart
			.append('g')
			.attr('class', 'chart__axis')
			.attr('width', width + (sidebarWidth))
			.attr('transform', `translate(${x(sidebarWidth)}, ${height - 120})`)
			.call(axis)


  const Footer =
		Chart
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
      .on('click', d => Chart.attr('class', 'chart__inner'))

  Footer
    .append('text')
      .attr('y', 15)
      .attr('x', 40)
      .attr('class', 'chart__trigger__label--all')
      .on('click', d => Chart.attr('class', 'chart__inner'))
      .text('Show All Industries')

  if (animate) {
    fadeInEach(Header, 400, 70 * data.length)
    fadeInEach(Percentage, 1000)
    fadeInEachCss(Labels)
    fadeInEach(Axis, 400, 70 * data.length)
    fadeInEach(Footer, 400, 70 * data.length)
  }
}

// renderMobile(data.filter(d => d.value < -5), true)
// renderMobile(data.filter(d => d.value > -5 && d.value < 5), true)
renderMobile(data.filter(d => d.value > 5), true)
// render(data, true)

/*
setTimeout(() => {
	renderMobile(data.filter(d => d.value > 5), true)
}, 3000)
*/


