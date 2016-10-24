'use strict'

const h = require('./helpers')

const centralCylindrical = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		point = h.addMeridian(point, opt.meridian)
		return {
			x: h.rad(point.lon)/(2*Math.PI)+0.5,
			y: (h.tan(opt.latLimit)-h.tan(point.lat))/(2*Math.PI)
		}
	}
	else{
		const result = {
			lon: h.deg((2*point.x-1)*Math.PI),
			lat: h.deg(Math.atan(h.tan(opt.latLimit)-2*Math.PI*point.y))
		}
		return h.addMeridian(result, opt.meridian*(-1))
	}
}

module.exports = centralCylindrical
