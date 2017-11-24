'use strict'

const p = require('.')
const h = require('./helpers')
const test = require('tape')

// test helpers
const round = (number) => Math.round(number*100000)/100000
const round3 = (number) => Math.round(number*100)/100

const hasProp = (o, k) => Object.prototype.hasOwnProperty.call(o, k)
const assertInverse = (test, obj, projection) => {
	const forth = projection(obj, {meridian: 40})
	const back = projection(forth, {meridian: 40})

	for (let k in obj) {
		if (!hasProp(obj, k)) continue
		test.equal(round3(obj[k]), round3(back[k]), 'inverse failed at ' + k)
	}
}

// fixtures
const wgs = {lon: 180, lat: 0}
const wgs2 = {lon: -24, lat: 60}
const wgs3 = {lon: 0, lat: 90}
const coords = {x: 0.5, y: 0}



test('test helpers', (t) => {
	t.plan(4)
	t.equal(round(1.222226), round(1.2222325))
	t.equal(round(-.2), round(-.2))
	t.equal(round3(1.226), round3(1.234))
	t.equal(round3(-1.2), round3(-1.2))
})

test('trigonometry helpers', (t) => {
	t.plan(5)
	t.equal(round(h.rad(180)), round(Math.PI))
	t.equal(round(h.sin(90)), 1)
	t.equal(round(h.cos(90)), 0)
	t.equal(round(h.tan(45)), 1)
	t.equal(round(h.deg(Math.PI/2)), 90)
})

// TODO: assertValidUnprojected()
// TODO: assertValidProjected()

test('meridian calculations', (t) => {
	const m1 = {lon: 70, lat: 30}
	const m2 = {lon: -170, lat: 20}
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



test('requiring projections directly', (t) => {
	t.plan(11)
	t.equal(require('./braun'), p.braun)
	t.equal(require('./central-cylindrical'), p.centralCylindrical)
	t.equal(require('./equirectangular'), p.equirectangular)
	t.equal(require('./gall'), p.gall)
	t.equal(require('./gall-peters'), p.gallPeters)
	t.equal(require('./kavrayskiy-7'), p.kavrayskiy7)
	t.equal(require('./lambert'), p.lambert)
	t.equal(require('./mercator'), p.mercator)
	t.equal(require('./miller'), p.miller)
	t.equal(require('./sinusoidal'), p.sinusoidal)
	t.equal(require('./wagner-6'), p.wagner6)
})



test('Braun projection', (t) => {
	t.equal(round(p.braun(wgs).x), 1)
	t.equal(round3(p.braun(coords).lon), 0)
	assertInverse(t, wgs2, p.braun)
	t.end()
})

test('central cylindrical projection', (t) => {
	t.equal(round(p.centralCylindrical(wgs).x), 1)
	t.equal(round3(p.centralCylindrical(coords).lon), 0)
	assertInverse(t, wgs2, p.centralCylindrical)
	t.end()
})

test('equirectangular projection', (t) => {
	t.equal(round(p.equirectangular(wgs).x), 1)
	t.equal(round3(p.equirectangular(coords).lon), 0)
	assertInverse(t, wgs2, p.equirectangular)
	t.end()
})

test('Gall projection', (t) => {
	t.equal(round(p.gall(wgs).x), 1)
	t.equal(round3(p.gall(coords).lon), 0)
	assertInverse(t, wgs2, p.gall)
	t.end()
})

test('Gall-Peters projection', (t) => {
	t.equal(round(p.gallPeters(wgs).x), 1)
	t.equal(round3(p.gallPeters(coords).lon), 0)
	assertInverse(t, wgs2, p.gallPeters)
	t.equal(round(p.gallPeters(wgs3).y), 0)
	t.end()
})

test('Kavrayskiy VII projection', (t) => {
	t.equal(round(p.kavrayskiy7(wgs).x), 1)
	t.equal(round3(p.kavrayskiy7(coords).lon), 0)
	assertInverse(t, wgs2, p.kavrayskiy7)
	t.equal(round(p.kavrayskiy7(wgs3).y), 0)
	t.end()
})

test('Lambert projection', (t) => {
	t.equal(round(p.lambert(wgs).x), 1)
	t.equal(round3(p.lambert(coords).lon), 0)
	assertInverse(t, wgs2, p.lambert)
	t.equal(round(p.lambert(wgs3).y), 0)
	t.end()
})

test('Mercator projection', (t) => {
	t.equal(round(p.mercator(wgs).x), 1)
	t.equal(round3(p.mercator(coords).lon), 0)
	assertInverse(t, wgs2, p.mercator)
	t.end()
})

test('Miller projection', (t) => {
	t.equal(round(p.miller(wgs).x), 1)
	t.equal(round3(p.miller(coords).lon), 0)
	assertInverse(t, wgs2, p.miller)
	t.end()
})

test('sinusoidal projection', (t) => {
	t.equal(round(p.sinusoidal(wgs).x), 1)
	t.equal(round3(p.sinusoidal(coords).lon), 0)
	assertInverse(t, wgs2, p.sinusoidal)
	t.equal(round(p.sinusoidal(wgs3).y), 0)
	t.end()
})

test('Wagner VI projection', (t) => {
	t.equal(round(p.wagner6(wgs).x), 1)
	t.equal(round3(p.wagner6(coords).lon), 0)
	assertInverse(t, wgs2, p.wagner6)
	t.equal(round(p.wagner6(wgs3).y), 0)
	t.end()
})
