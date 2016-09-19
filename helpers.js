'use strict'

const rad = (deg) => deg*Math.PI/180
const sin = (deg) => Math.sin(rad(deg))
const cos = (deg) => Math.cos(rad(deg))
const tan = (deg) => Math.tan(rad(deg))
const deg = (rad) => rad*180/Math.PI

const defaults = {
	meridian: 0,
	standardParallel: 0,
	latLimit: 85
}

const check = (point) => {
	if(point.x!==undefined&&point.x>=0&&point.x<=1&&point.y!==undefined&&point.lon===undefined&&point.lat===undefined) return {x: +point.x, y: +point.y, wgs: false}
	if(point.lon!==undefined&&point.lat!==undefined&&point.x===undefined&&point.y===undefined) return {lon: +point.lon, lat: +point.lat, wgs: true}
	throw new Error('Invalid input point.')
}

const options = (opt) => {
	return Object.assign({}, defaults, opt || {})
}

const addMeridian = (point, meridian) => {
	point = check(point)
	if(meridian!==0) return check({lon: ((point.lon+180+360-meridian)%360)-180, lat: point.lat})
	return point
}

module.exports = {rad, sin, cos, tan, deg, addMeridian, check, options}