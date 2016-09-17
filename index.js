'use strict'

const h = require('./helpers')

const braun = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		return {
			x: h.rad(point.lon)/(2*Math.PI)+0.5,
			y: (h.tan(opt.latLimit/2)-h.tan(point.lat/2))/(Math.PI)
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const centralcylindrical = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		return {
			x: (h.rad(point.lon)-h.rad(opt.meridian))/(2*Math.PI)+0.5,
			y: (h.tan(opt.latLimit)-h.tan(point.lat))/(2*Math.PI)
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const equirectangular = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		return {
			x: (h.rad(point.lon)-h.rad(opt.meridian))*h.cos(opt.standardParallel)/(2*Math.PI)+0.5,
			y: 0.25-(h.rad(point.lat)-h.rad(opt.standardParallel))/(2*Math.PI)
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const gall = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		return {
			x: h.rad(point.lon)/(2*Math.PI)+0.5,
			y: (h.tan(opt.latLimit/2)-h.tan(point.lat/2))/(2*Math.PI)*(1+Math.sqrt(2))
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const gallpeters = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		return {
			x: h.rad(point.lon)/(2*Math.PI)+0.5,
			y: (1-h.sin(point.lat))/Math.PI
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const lambert = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		return {
			x: (h.rad(point.lon)-h.rad(opt.meridian))/(2*Math.PI)+0.5,
			y: (1-h.sin(point.lat))/(2*Math.PI)
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const mercator = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		return {
			x: (h.rad(point.lon)-h.rad(opt.meridian))/(2*Math.PI)+0.5,
			y: (Math.atanh(h.sin(opt.latLimit))-Math.atanh(h.sin(point.lat)))/(2*Math.PI)
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const miller = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		return {
			x: h.rad(point.lon)/(2*Math.PI)+0.5,
			y: (Math.atanh(h.sin(opt.latLimit*4/5))-Math.atanh(h.sin(point.lat*4/5)))/(2*Math.PI)*(5/4)
		}
	}
	// mercator(4/5)*5/4?
	else throw new Error('Reverse conversion is not supported (yet).')
}

const sinusoidal = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		return {
			x: (h.rad(point.lon)-h.rad(opt.meridian))*h.cos(point.lat)/(2*Math.PI)+0.5,
			y: (Math.PI/2-h.rad(point.lat))/(2*Math.PI)
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

module.exports = {braun, centralcylindrical, equirectangular, gall, gallpeters, lambert, mercator, miller, sinusoidal}