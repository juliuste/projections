'use strict'

const h = require('./helpers')

const miller = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		point = h.addMeridian(point, opt.meridian)
		return {
			x: h.rad(point.lon)/(2*Math.PI)+0.5,
			y: (Math.atanh(h.sin(opt.latLimit*4/5))-Math.atanh(h.sin(point.lat*4/5)))/(2*Math.PI)*(5/4)
		}
	}
	// mercator(4/5)*5/4?
	else{
		const result = {
			lon: h.deg((2*point.x-1)*Math.PI),
			lat: h.deg((5/4)*Math.asin(Math.tanh((Math.atanh(h.sin(opt.latLimit*(4/5)))-8*Math.PI*point.y/5))))
		}
		return h.addMeridian(result, opt.meridian*(-1))
	}
}

module.exports = miller
