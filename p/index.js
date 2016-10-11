'use strict'

const h = require('../helpers')

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

const centralcylindrical = (point, opt) => {
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

const equirectangular = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		point = h.addMeridian(point, opt.meridian)
		return {
			x: h.rad(point.lon)*h.cos(opt.standardParallel)/(2*Math.PI)+0.5,
			y: 0.25-(h.rad(point.lat)-h.rad(opt.standardParallel))/(2*Math.PI)
		}
	}
	else{
		const result = {
			lon: h.deg((2*point.x-1)*Math.PI*h.cos(opt.standardParallel)),
			lat: h.deg((0.25-point.y)*2*Math.PI+h.rad(opt.standardParallel))
		}
		return h.addMeridian(result, opt.meridian*(-1))
	}
}

const gall = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		point = h.addMeridian(point, opt.meridian)
		return {
			x: h.rad(point.lon)/(2*Math.PI)+0.5,
			y: (h.tan(opt.latLimit/2)-h.tan(point.lat/2))/(2*Math.PI)*(1+Math.sqrt(2))
		}
	}
	else{
		const result = {
			lon: h.deg((2*point.x-1)*Math.PI),
			lat: h.deg(2*Math.atan(h.tan(opt.latLimit/2)-2*Math.PI*point.y/(1+Math.sqrt(2))))
		}
		return h.addMeridian(result, opt.meridian*(-1))
	}
}

const gallpeters = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		point = h.addMeridian(point, opt.meridian)
		return {
			x: h.rad(point.lon)/(2*Math.PI)+0.5,
			y: (1-h.sin(point.lat))/Math.PI
		}
	}
	else{
		const result = {
			lon: h.deg((2*point.x-1)*Math.PI),
			lat: h.deg(Math.asin(1-point.y*Math.PI))
		}
		return h.addMeridian(result, opt.meridian*(-1))
	}
}

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

const lambert = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		point = h.addMeridian(point, opt.meridian)
		return {
			x: h.rad(point.lon)/(2*Math.PI)+0.5,
			y: (1-h.sin(point.lat))/(2*Math.PI)
		}
	}
	else{
		const result = {
			lon: h.deg((2*point.x-1)*Math.PI),
			lat: h.deg(Math.asin(1-2*Math.PI*point.y))
		}
		return h.addMeridian(result, opt.meridian*(-1))
	}
}

const mercator = (point, opt) => {
	point = h.check(point)
	opt = h.options(opt)
	if(point.wgs){
		point = h.addMeridian(point, opt.meridian)
		return {
			x: h.rad(point.lon)/(2*Math.PI)+0.5,
			y: (Math.atanh(h.sin(opt.latLimit))-Math.atanh(h.sin(point.lat)))/(2*Math.PI)
		}
	}
	else{
		const result = {
			lon: h.deg((2*point.x-1)*Math.PI),
			lat: h.deg(Math.asin(Math.tanh((Math.atanh(h.sin(opt.latLimit))-2*Math.PI*point.y))))
		}
		return h.addMeridian(result, opt.meridian*(-1))
	}
}

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

module.exports = {
	braun,
	centralcylindrical,
	equirectangular,
	gall,
	gallpeters,
	kavrayskiy7,
	lambert,
	mercator,
	miller,
	sinusoidal,
	wagner6
}
