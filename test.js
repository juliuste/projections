'use strict'

const p = require('./index')
const h = require('./helpers')
const test = require('tape')

// test helpers
const round = (number) => Math.round(number*100000)/100000
const round3 = (number) => Math.round(number*100)/100
const roundObj = (obj) => {
	obj = Object.assign({}, obj)
	for(let key in obj)
		obj[key] = round3(obj[key])
	return obj
}
const assertInverse = (test, obj, projection) => {
	const forth = projection(obj, {meridian: 40})
	const back = projection(forth, {meridian: 40})
	test.deepEqual(roundObj(obj), roundObj(back))
}

// fixtures
const wgs = h.check({lon: 180, lat: 0})
const wgs2 = h.check({lon: -24, lat: 60})
const wgs3 = h.check({lon: 0, lat: 90})
const coords = h.check({x: 0.5, y: 0})



test('test helpers', (t) => {
	t.plan(5)
	t.equal(round(1.222226), round(1.2222325))
	t.equal(round(-.2), round(-.2))
	t.equal(round3(1.226), round3(1.234))
	t.equal(round3(-1.2), round3(-1.2))
	t.deepEqual(roundObj({l: 1.226}), roundObj({l: 1.234}))
})

test('trigonometry helpers', (t) => {
	t.plan(5)
	t.equal(round(h.rad(180)), round(Math.PI))
	t.equal(round(h.sin(90)), 1)
	t.equal(round(h.cos(90)), 0)
	t.equal(round(h.tan(45)), 1)
	t.equal(round(h.deg(Math.PI/2)), 90)
})

// TODO: check()

test('meridian calculations', (t) => {
	const m1 = h.check({lon: 70, lat: 30})
	const m2 = h.check({lon: -170, lat: 20})
	t.plan(6)
	t.equal(h.addMeridian(m1, 60).lon, 10)
	t.equal(h.addMeridian(m2, -30).lon, -140)
	t.equal(h.addMeridian(m2, 50).lon, 140)
	t.equal(h.addMeridian(m2, -10).lon, -160)
	t.deepEqual(m1, h.addMeridian(h.addMeridian(m1, 30), -30))
	t.deepEqual(m1, h.addMeridian(h.addMeridian(m1, -120), 120))
})

test('options helper', (t) => {
	t.plan(2)
	t.equal(h.options({latLimit: 20}).latLimit, 20)
	t.equal(h.options().latLimit, 85)
})



test('Braun projection', (t) => {
	t.plan(3)
	t.equal(round(p.braun(wgs).x), 1)
	t.equal(round3(p.braun(coords).lon), 0)
	assertInverse(t, wgs2, p.braun)
})

test('central cylindrical projection', (t) => {
	t.plan(3)
	t.equal(round(p.centralcylindrical(wgs).x), 1)
	t.equal(round3(p.centralcylindrical(coords).lon), 0)
	assertInverse(t, wgs2, p.centralcylindrical)
})

test('equirectangular projection', (t) => {
	t.plan(3)
	t.equal(round(p.equirectangular(wgs).x), 1)
	t.equal(round3(p.equirectangular(coords).lon), 0)
	assertInverse(t, wgs2, p.equirectangular)
})

test('Gall projection', (t) => {
	t.plan(3)
	t.equal(round(p.gall(wgs).x), 1)
	t.equal(round3(p.gall(coords).lon), 0)
	assertInverse(t, wgs2, p.gall)
})

test('Gall-Peters projection', (t) => {
	t.plan(4)
	t.equal(round(p.gallpeters(wgs).x), 1)
	t.equal(round3(p.gallpeters(coords).lon), 0)
	assertInverse(t, wgs2, p.gallpeters)
	t.equal(round(p.gallpeters(wgs3).y), 0)
})

test('Kavrayskiy VII projection', (t) => {
	t.plan(4)
	t.equal(round(p.kavrayskiy7(wgs).x), 1)
	t.equal(round3(p.kavrayskiy7(coords).lon), 0)
	assertInverse(t, wgs2, p.kavrayskiy7)
	t.equal(round(p.kavrayskiy7(wgs3).y), 0)
})

test('Lambert projection', (t) => {
	t.plan(4)
	t.equal(round(p.lambert(wgs).x), 1)
	t.equal(round3(p.lambert(coords).lon), 0)
	assertInverse(t, wgs2, p.lambert)
	t.equal(round(p.lambert(wgs3).y), 0)
})

test('Mercator projection', (t) => {
	t.plan(3)
	t.equal(round(p.mercator(wgs).x), 1)
	t.equal(round3(p.mercator(coords).lon), 0)
	assertInverse(t, wgs2, p.mercator)
})

test('Miller projection', (t) => {
	t.plan(3)
	t.equal(round(p.miller(wgs).x), 1)
	t.equal(round3(p.miller(coords).lon), 0)
	assertInverse(t, wgs2, p.miller)
})

test('sinusoidal projection', (t) => {
	t.plan(4)
	t.equal(round(p.sinusoidal(wgs).x), 1)
	t.equal(round3(p.sinusoidal(coords).lon), 0)
	assertInverse(t, wgs2, p.sinusoidal)
	t.equal(round(p.sinusoidal(wgs3).y), 0)
})

test('Wagner VI projection', (t) => {
	t.plan(4)
	t.equal(round(p.wagner6(wgs).x), 1)
	t.equal(round3(p.wagner6(coords).lon), 0)
	assertInverse(t, wgs2, p.wagner6)
	t.equal(round(p.wagner6(wgs3).y), 0)
})
