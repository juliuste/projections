'use strict'

const p = require('./index')
const h = require('./helpers')
const assert = require('assert')

// test helpers
const round = (number) => Math.round(number*100000)/100000
const round3 = (number) => Math.round(number*100)/100
const roundObj = (obj) => {
	obj = Object.assign({}, obj)
	for(let key in obj)
		obj[key] = round3(obj[key])
	return obj
}
const assertInverse = (obj, projection) => {
	const forth = projection(obj, {meridian: 40})
	const back = projection(forth, {meridian: 40})
	assert.deepStrictEqual(roundObj(obj), roundObj(back))
}

// fixtures
const wgs = h.check({lon: 180, lat: 0})
const wgs2 = h.check({lon: -24, lat: 60})
const wgs3 = h.check({lon: 0, lat: 90})
const coords = h.check({x: 0.5, y: 0})

// round functions in this module
assert.strictEqual(round(1.222226), round(1.2222325))
assert.strictEqual(round3(1.226), round3(1.234))
assert.deepStrictEqual(roundObj({l: 1.226}), roundObj({l: 1.234}))

// helpers module
// trigonometry
assert.strictEqual(round(h.rad(180)), round(Math.PI))
assert.strictEqual(round(h.sin(90)), 1)
assert.strictEqual(round(h.cos(90)), 0)
assert.strictEqual(round(h.tan(45)), 1)
assert.strictEqual(round(h.deg(Math.PI/2)), 90)
// meridian calculations
const m1 = h.check({lon: 70, lat: 30})
const m2 = h.check({lon: -170, lat: 20})
assert.strictEqual(h.addMeridian(m1, 60).lon, 10)
assert.strictEqual(h.addMeridian(m2, -30).lon, -140)
assert.strictEqual(h.addMeridian(m2, 50).lon, 140)
assert.strictEqual(h.addMeridian(m2, -10).lon, -160)
assert.deepStrictEqual(m1, h.addMeridian(h.addMeridian(m1, 30), -30))
assert.deepStrictEqual(m1, h.addMeridian(h.addMeridian(m1, -120), 120))
// other helpers
assert.strictEqual(h.options({latLimit: 20}).latLimit, 20)
assert.strictEqual(h.options().latLimit, 85)
// TODO: check()

// Braun
assert.strictEqual(round(p.braun(wgs).x), 1)
assert.strictEqual(round3(p.braun(coords).lon), 0)
assertInverse(wgs2, p.braun)
// Central cylindrical
assert.strictEqual(round(p.centralcylindrical(wgs).x), 1)
assert.strictEqual(round3(p.centralcylindrical(coords).lon), 0)
assertInverse(wgs2, p.centralcylindrical)
// Equirectangular
assert.strictEqual(round(p.equirectangular(wgs).x), 1)
assert.strictEqual(round3(p.equirectangular(coords).lon), 0)
assertInverse(wgs2, p.equirectangular)
// Gall
assert.strictEqual(round(p.gall(wgs).x), 1)
assert.strictEqual(round3(p.gall(coords).lon), 0)
assertInverse(wgs2, p.gall)
// Gall-Peters
assert.strictEqual(round(p.gallpeters(wgs).x), 1)
assert.strictEqual(round3(p.gallpeters(coords).lon), 0)
assertInverse(wgs2, p.gallpeters)
assert.strictEqual(round(p.gallpeters(wgs3).y), 0)
// Kavrayskiy VII
assert.strictEqual(round(p.kavrayskiy7(wgs).x), 1)
assert.strictEqual(round3(p.kavrayskiy7(coords).lon), 0)
assertInverse(wgs2, p.kavrayskiy7)
assert.strictEqual(round(p.kavrayskiy7(wgs3).y), 0)
// Lambert
assert.strictEqual(round(p.lambert(wgs).x), 1)
assert.strictEqual(round3(p.lambert(coords).lon), 0)
assertInverse(wgs2, p.lambert)
assert.strictEqual(round(p.lambert(wgs3).y), 0)
// Mercator
assert.strictEqual(round(p.mercator(wgs).x), 1)
assert.strictEqual(round3(p.mercator(coords).lon), 0)
assertInverse(wgs2, p.mercator)
// Miller
assert.strictEqual(round(p.miller(wgs).x), 1)
assert.strictEqual(round3(p.miller(coords).lon), 0)
assertInverse(wgs2, p.miller)
// Sinusoidal
assert.strictEqual(round(p.sinusoidal(wgs).x), 1)
assert.strictEqual(round3(p.sinusoidal(coords).lon), 0)
assertInverse(wgs2, p.sinusoidal)
assert.strictEqual(round(p.sinusoidal(wgs3).y), 0)
