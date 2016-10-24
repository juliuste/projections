'use strict'

const h = require('./helpers')

const sinusoidal = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		point = h.addMeridian(point, opt.meridian)
		return {
			x: h.rad(point.lon)*h.cos(point.lat)/(2*Math.PI)+0.5,
			y: (Math.PI/2-h.rad(point.lat))/(2*Math.PI)
		}
	}
	else{
		const lat = h.deg(Math.PI/2 - 2*Math.PI*point.y)
		const result = {
			lon: h.deg((2*point.x-1)*Math.PI/h.cos(lat)),
			lat: lat
		}
		return h.addMeridian(result, opt.meridian*(-1))
	}
}

module.exports = sinusoidal
