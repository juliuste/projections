'use strict'

const h = require('./helpers')

const braun = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		point = h.addMeridian(point, opt.meridian)
		return {
			x: h.rad(point.lon)/(2*Math.PI)+0.5,
			y: (h.tan(opt.latLimit/2)-h.tan(point.lat/2))/(Math.PI)
		}
	}
	else{
		const result = {
			lon: h.deg((2*point.x-1)*Math.PI),
			lat: h.deg(2*Math.atan(h.tan(opt.latLimit/2)-point.y*Math.PI))
		}
		return h.addMeridian(result, opt.meridian*(-1))
	}
}

module.exports = braun
