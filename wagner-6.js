'use strict'

const h = require('./helpers')
const kavrayskiy7 = require('./kavrayskiy-7')

const wagner6 = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		point = kavrayskiy7(point, opt)
		return {
			x: point.x,
			y: point.y*Math.sqrt(3)/2
		}
	}
	else{
		point = {
			x: point.x,
			y: point.y*2/Math.sqrt(3)
		}
		return kavrayskiy7(point, opt)
	}
}

module.exports = wagner6
