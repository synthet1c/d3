import chart from './chart'
import data from './data'

data.sort((a, b) => b.value - a.value)

const filtered = data.filter(d => d.value > 5)

const mychart = chart('.chart', 500, filtered)

mychart.init(filtered)

let current = 0

window.next = function() {
	/*
	switch (current) {
		case 0:
			mychart.update(data.filter(d => d.value < -5))
			break
		case 1:
			mychart.update(data.filter(d => d.value > -5 && d.value < 5))
			break
		case 2:
			mychart.update(data.filter(d => d.value < -5))
			break
	}
	*/
	switch (current) {
		case 0:
			mychart.update(data)
			break
		case 1:
			mychart.update(data.filter(d => d.value > 5))
	}
	current = (current + 1) % 2
}