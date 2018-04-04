export function fadeInEach(obj, time, delay) {
	return obj
		.attr('opacity', 0)
		.transition()
		.attr('opacity', 1)
		.duration(400)
		.delay((d, i) => i * 60)
}

export function fadeInEachCss(obj, time, delay) {
	return obj
		.attr('opacity', 0)
		.transition()
		.attr('class', obj.attr('class') + ' fadein')
		.delay((d, i) => i * 60 + 400)
}
