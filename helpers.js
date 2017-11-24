'use strict'

const rad = (deg) => deg * Math.PI / 180
const sin = (deg) => Math.sin(rad(deg))
const cos = (deg) => Math.cos(rad(deg))
const tan = (deg) => Math.tan(rad(deg))
const deg = (rad) => rad * 180 / Math.PI

const defaults = {
	meridian: 0,
	standardParallel: 0,
	latLimit: 85
}

const validatePoint = (point) => {
	if (('x' in point) && ('y' in point)) {
		if ('number' !== typeof point.x) throw new Error('point.x must be a number')
		if ('number' !== typeof point.y) throw new Error('point.y must be a number')
		if (point.x < 0) throw new Error('point.x must be >= 0')
		if (point.x > 1) throw new Error('point.x must be <= 1')
		return {x: point.x, y: point.y, wgs: false}
	}

	if (('lon' in point) && ('lat' in point)) {
		if ('number' !== typeof point.lon) throw new Error('point.lon must be a number')
		if ('number' !== typeof point.lat) throw new Error('point.lat must be a number')
		return {lon: point.lon, lat: point.lat, wgs: true}
	}

	throw new Error('point must either have x & y or lon & lat')
}

const options = (opt) => {
	return Object.assign({}, defaults, opt || {})
}

const addMeridian = (point, meridian) => {
	point = validatePoint(point)
	if (meridian !== 0) return validatePoint({
		lon: ((point.lon + 180 + 360 - meridian) % 360) - 180,
		lat: point.lat
	})
	return point
}

module.exports = {
	rad, sin, cos, tan, deg,
	options,
	validatePoint,
	addMeridian
}
