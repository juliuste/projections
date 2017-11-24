'use strict'

const h = require('./helpers')

const mercatorProject = (point, opt) => {
	h.assertValidUnprojected(point)
	opt = h.options(opt)

	point = h.addMeridian(point, opt.meridian)
	return {
		x: h.rad(point.lon) / (2 * Math.PI) + 0.5,
		y: (Math.atanh(h.sin(opt.latLimit)) - Math.atanh(h.sin(point.lat))) / (2 * Math.PI)
	}
}

const mercatorInverse = (point, opt) => {
	h.assertValidProjected(point)
	opt = h.options(opt)

	const result = {
		lon: h.deg((2 * point.x - 1) * Math.PI),
		lat: h.deg(Math.asin(Math.tanh((Math.atanh(h.sin(opt.latLimit)) - 2 * Math.PI *point.y))))
	}
	return h.addMeridian(result, opt.meridian * -1)
}

module.exports = {
	project: mercatorProject,
	inverse: mercatorInverse
}
