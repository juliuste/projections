'use strict'

const h = require('./helpers')
const kavrayskiy7 = require('./kavrayskiy-7')

const wagner6Project = (point, opt) => {
	h.assertValidUnprojected(point)
	opt = h.options(opt)

	point = kavrayskiy7.project(point, opt)
	return {
		x: point.x,
		y: point.y * Math.sqrt(3) / 2
	}
}

const wagner6Inverse = (point, opt) => {
	h.assertValidProjected(point)
	opt = h.options(opt)

	point = {
		x: point.x,
		y: point.y * 2 / Math.sqrt(3)
	}
	return kavrayskiy7.inverse(point, opt)
}

module.exports = {
	project: wagner6Project,
	inverse: wagner6Inverse
}
