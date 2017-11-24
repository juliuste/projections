'use strict'

const h = require('./helpers')

const millerProject = (point, opt) => {
	h.assertValidUnprojected(point)
	opt = h.options(opt)

	point = h.addMeridian(point, opt.meridian)
	return {
		x: h.rad(point.lon) / (2 * Math.PI) + 0.5,
		y: (Math.atanh(h.sin(opt.latLimit * 4 / 5)) - Math.atanh(h.sin(point.lat * 4 / 5))) / (2 * Math.PI) * (5 / 4)
	}
}

const millerInverse = (point, opt) => {
	h.assertValidProjected(point)
	opt = h.options(opt)

	// mercator(4/5)*5/4?
	const result = {
		lon: h.deg((2 * point.x - 1) * Math.PI),
		lat: h.deg((5/4) * Math.asin(Math.tanh((Math.atanh(h.sin(opt.latLimit * 4 / 5)) - 8 * Math.PI * point.y / 5))))
	}
	return h.addMeridian(result, opt.meridian * -1)
}

module.exports = {
	project: millerProject,
	inverse: millerInverse
}
