'use strict'

const h = require('./helpers')

const equirectangularProject = (point, opt) => {
	h.assertValidUnprojected(point)
	opt = h.options(opt)

	point = h.addMeridian(point, opt.meridian)
	return {
		x: h.rad(point.lon) * h.cos(opt.standardParallel) / (2 * Math.PI) + 0.5,
		y: 0.25 - (h.rad(point.lat) - h.rad(opt.standardParallel)) / (2 * Math.PI)
	}
}

const equirectangularInverse = (point, opt) => {
	h.assertValidProjected(point)
	opt = h.options(opt)

	const result = {
		lon: h.deg((2 * point.x - 1) * Math.PI * h.cos(opt.standardParallel)),
		lat: h.deg((0.25 - point.y) * 2 * Math.PI + h.rad(opt.standardParallel))
	}
	return h.addMeridian(result, opt.meridian * -1)
}

module.exports = {
	project: equirectangularProject,
	inverse: equirectangularInverse
}
