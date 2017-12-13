'use strict'

const h = require('./helpers')

const sinusoidalProject = (point, opt) => {
	h.assertValidUnprojected(point)
	opt = h.options(opt)

	point = h.addMeridian(point, opt.meridian)
	return {
		x: h.rad(point.lon) * h.cos(point.lat) / (2 * Math.PI) + 0.5,
		y: (Math.PI / 2 - h.rad(point.lat)) / (2 * Math.PI)
	}
}

const sinusoidalInverse = (point, opt) => {
	h.assertValidProjected(point)
	opt = h.options(opt)

	const lat = h.deg(Math.PI / 2 - 2 * Math.PI * point.y)
	const result = {
		lon: h.deg((2 * point.x - 1) * Math.PI / h.cos(lat)),
		lat: lat
	}
	return h.addMeridian(result, opt.meridian * -1)
}

module.exports = {
	project: sinusoidalProject,
	inverse: sinusoidalInverse
}
