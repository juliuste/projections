'use strict'

const defaults = {
	meridian: 0,
	standardParallel: 0,
	latLimit: 85
}

const rad = (deg) => deg*Math.PI/180
const sin = (deg) => Math.sin(rad(deg))
const cos = (deg) => Math.cos(rad(deg))
const tan = (deg) => Math.tan(rad(deg))

const check = (point) => {
	if(point.x!==undefined&&point.y!==undefined&&point.lon===undefined&&point.lat===undefined) return {x: +point.x, y: +point.y, wgs: false}
	if(point.lon!==undefined&&point.lat!==undefined&&point.x===undefined&&point.y===undefined) return {lon: +point.lon, lat: +point.lat, wgs: true}
	throw new Error('Invalid input point.')
}

const options = (opt) => {
	return Object.assign({}, defaults, opt || {})
}

const braun = (point, opt) => {
	point = check(point)
	opt = options(opt)
	if(point.wgs){
		return {
			x: rad(point.lon)/(2*Math.PI)+0.5,
			y: (tan(opt.latLimit/2)-tan(point.lat/2))/(Math.PI)
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const centralcylindrical = (point, opt) => {
	point = check(point)
	opt = options(opt)
	if(point.wgs){
		return {
			x: (rad(point.lon)-rad(opt.meridian))/(2*Math.PI)+0.5,
			y: (tan(opt.latLimit)-tan(point.lat))/(2*Math.PI)
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const equirectangular = (point, opt) => {
	point = check(point)
	opt = options(opt)
	if(point.wgs){
		return {
			x: (rad(point.lon)-rad(opt.meridian))*cos(opt.standardParallel)/(2*Math.PI)+0.5,
			y: 0.25-(rad(point.lat)-rad(opt.standardParallel))/(2*Math.PI)
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const gall = (point, opt) => {
	point = check(point)
	opt = options(opt)
	if(point.wgs){
		return {
			x: rad(point.lon)/(2*Math.PI)+0.5,
			y: (tan(opt.latLimit/2)-tan(point.lat/2))/(2*Math.PI)*(1+Math.sqrt(2))
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const gallpeters = (point, opt) => {
	point = check(point)
	opt = options(opt)
	if(point.wgs){
		return {
			x: rad(point.lon)/(2*Math.PI)+0.5,
			y: (1-sin(point.lat))/Math.PI
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const lambert = (point, opt) => {
	point = check(point)
	opt = options(opt)
	if(point.wgs){
		return {
			x: (rad(point.lon)-rad(opt.meridian))/(2*Math.PI)+0.5,
			y: (1-sin(point.lat))/(2*Math.PI)
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const mercator = (point, opt) => {
	point = check(point)
	opt = options(opt)
	if(point.wgs){
		return {
			x: (rad(point.lon)-rad(opt.meridian))/(2*Math.PI)+0.5,
			y: (Math.atanh(sin(opt.latLimit))-Math.atanh(sin(point.lat)))/(2*Math.PI)
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

const miller = (point, opt) => {
	point = check(point)
	opt = options(opt)
	if(point.wgs){
		return {
			x: rad(point.lon)/(2*Math.PI)+0.5,
			y: (Math.atanh(sin(opt.latLimit*4/5))-Math.atanh(sin(point.lat*4/5)))/(2*Math.PI)*(5/4)
		}
	}
	// mercator(4/5)*5/4?
	else throw new Error('Reverse conversion is not supported (yet).')
}

const sinusoidal = (point, opt) => {
	point = check(point)
	opt = options(opt)
	if(point.wgs){
		return {
			x: (rad(point.lon)-rad(opt.meridian))*cos(point.lat)/(2*Math.PI)+0.5,
			y: (Math.PI/2-rad(point.lat))/(2*Math.PI)
		}
	}
	else throw new Error('Reverse conversion is not supported (yet).')
}

module.exports = {braun, centralcylindrical, equirectangular, gall, gallpeters, lambert, mercator, miller, sinusoidal}