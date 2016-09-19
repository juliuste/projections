'use strict'

const p = require('./index')
const h = require('./helpers')
const assert = require('assert')
const round = (number) => Math.round(number*100000)/100000
const round3 = (number) => Math.round(number*100)/100
const roundObj = (obj) => {
	for(let key in obj){
		obj[key] = round3(obj[key])
	}
	return obj
}
const checkInverse = (obj, projection) => {
	assert.deepEqual(roundObj(obj), roundObj(projection(projection(obj, {meridian: 40}), {meridian: 40})))
}

// round functions in this module
assert(round(1.222226)===round(1.2222325))
assert(round3(1.226)===round3(1.234))
assert.deepEqual(roundObj({l: 1.226}), roundObj({l: 1.234}))

// helpers module
// trigonometry
assert(round(h.rad(180))===round(Math.PI))
assert(round(h.sin(90))===1)
assert(round(h.cos(90))===0)
assert(round(h.tan(45))===1)
assert(round(h.deg(Math.PI/2))===90)
// meridian calculations
const m1 = h.check({lon: 70, lat: 30})
const m2 = h.check({lon: -170, lat: 20})
assert(h.addMeridian(m1, 60).lon===10)
assert(h.addMeridian(m2, -30).lon===-140)
assert(h.addMeridian(m2, 50).lon===140)
assert(h.addMeridian(m2, -10).lon===-160)
assert.deepEqual(m1, h.addMeridian(h.addMeridian(m1, 30), -30))
assert.deepEqual(m1, h.addMeridian(h.addMeridian(m1, -120), 120))
// other helpers
assert(h.options({latLimit: 20}).latLimit===20)
assert(h.options().latLimit===85)
// TODO: check()

// main module
const wgs = h.check({lon: 180, lat: 0})
const wgs2 = h.check({lon: -24, lat: 60})
const wgs3 = h.check({lon: 0, lat: 90})
const coords = h.check({x: 0.5, y: 0})

// Braun
assert(round(p.braun(wgs).x)===1)
assert(round3(p.braun(coords).lon)===0)
checkInverse(wgs2, p.braun)
// Central cylindrical
assert(round(p.centralcylindrical(wgs).x)===1)
assert(round3(p.centralcylindrical(coords).lon)===0)
checkInverse(wgs2, p.centralcylindrical)
// Equirectangular
assert(round(p.equirectangular(wgs).x)===1)
assert(round3(p.equirectangular(coords).lon)===0)
checkInverse(wgs2, p.equirectangular)
// Gall
assert(round(p.gall(wgs).x)===1)
assert(round3(p.gall(coords).lon)===0)
checkInverse(wgs2, p.gall)
// Gall-Peters
assert(round(p.gallpeters(wgs).x)===1)
assert(round3(p.gallpeters(coords).lon)===0)
checkInverse(wgs2, p.gallpeters)
assert(round(p.gallpeters(wgs3).y)===0)
// Kavrayskiy VII
assert(round(p.kavrayskiy7(wgs).x)===1)
assert(round3(p.kavrayskiy7(coords).lon)===0)
checkInverse(wgs2, p.kavrayskiy7)
assert(round(p.kavrayskiy7(wgs3).y)===0)
// Lambert
assert(round(p.lambert(wgs).x)===1)
assert(round3(p.lambert(coords).lon)===0)
checkInverse(wgs2, p.lambert)
assert(round(p.lambert(wgs3).y)===0)
// Mercator
assert(round(p.mercator(wgs).x)===1)
assert(round3(p.mercator(coords).lon)===0)
checkInverse(wgs2, p.mercator)
// Miller
assert(round(p.miller(wgs).x)===1)
assert(round3(p.miller(coords).lon)===0)
checkInverse(wgs2, p.miller)
// Sinusoidal
assert(round(p.sinusoidal(wgs).x)===1)
assert(round3(p.sinusoidal(coords).lon)===0)
checkInverse(wgs2, p.sinusoidal)
assert(round(p.sinusoidal(wgs3).y)===0)