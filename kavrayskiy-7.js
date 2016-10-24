'use strict'

const h = require('./helpers')

const kavrayskiy7 = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		point = h.addMeridian(point, opt.meridian)
		return {
			x: h.rad(point.lon)*Math.sqrt(1/3-Math.pow(h.rad(point.lat)/Math.PI, 2)) * Math.sqrt(3)/(2*Math.PI)+0.5,
			y: (Math.PI/2-h.rad(point.lat)) / (Math.sqrt(3)*Math.PI)
		}
	}
	else{
		const lat = Math.PI/2 - point.y*Math.sqrt(3)*Math.PI
		const result = {
			lon: h.deg((2*point.x-1)*Math.PI/(Math.sqrt(1/3-Math.pow(lat/Math.PI, 2))*Math.sqrt(3))),
			lat: h.deg(lat)
		}
		return h.addMeridian(result, opt.meridian*(-1))
	}
}

module.exports = kavrayskiy7
