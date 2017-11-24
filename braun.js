'use strict'

const h = require('./helpers')

const braunProject = (point, opt) => {
	h.assertValidUnprojected(point)
	opt = h.options(opt)

	point = h.addMeridian(point, opt.meridian)
	return {
		x: h.rad(point.lon) / (2 * Math.PI) + 0.5,
		y: (h.tan(opt.latLimit / 2) - h.tan(point.lat / 2)) / Math.PI
	}
}

const braunInverse = (point, opt) => {
	h.assertValidProjected(point)
	opt = h.options(opt)

	const result = {
		lon: h.deg((2 * point.x - 1) * Math.PI),
		lat: h.deg(2 * Math.atan(h.tan(opt.latLimit / 2) - point.y * Math.PI))
	}
	return h.addMeridian(result, opt.meridian * -1)
}

module.exports = {
	project: braunProject,
	inverse: braunInverse
}
