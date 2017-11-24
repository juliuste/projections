'use strict'

const h = require('./helpers')

const gallPetersProject = (point, opt) => {
	h.assertValidUnprojected(point)
	opt = h.options(opt)

	point = h.addMeridian(point, opt.meridian)
	return {
		x: h.rad(point.lon) / (2 * Math.PI) + 0.5,
		y: (1 - h.sin(point.lat)) / Math.PI
	}
}

const gallPetersInverse = (point, opt) => {
	h.assertValidProjected(point)
	opt = h.options(opt)

	const result = {
		lon: h.deg((2 * point.x - 1) * Math.PI),
		lat: h.deg(Math.asin(1 - point.y * Math.PI))
	}
	return h.addMeridian(result, opt.meridian * -1)
}

module.exports = {
	project: gallPetersProject,
	inverse: gallPetersInverse
}
