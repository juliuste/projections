'use strict'

const p = require('./index')
const h = require('./helpers')
const assert = require('assert')
const round = (number) => Math.round(number*100000)/100000

// round function in this module
assert(round(1.222226)===round(1.2222325))

// helpers module
// trigonometry
assert(round(h.rad(180))===round(Math.PI))
assert(round(h.sin(90))===1)
assert(round(h.cos(90))===0)
assert(round(h.tan(45))===1)
// other helpers
assert(h.options({latLimit: 20}).latLimit===20)
assert(h.options().latLimit===85)
// TODO: check()

// main module
const coords = {lon: 180, lat: 0}
const coords2 = {lon: 0, lat: 90}
assert(round(p.braun(coords).x)===1)
assert(round(p.centralcylindrical(coords).x)===1)
assert(round(p.equirectangular(coords).x)===1)
assert(round(p.gall(coords).x)===1)
assert(round(p.gallpeters(coords).x)===1)
assert(round(p.gallpeters(coords2).y)===0)
assert(round(p.lambert(coords).x)===1)
assert(round(p.lambert(coords2).y)===0)
assert(round(p.mercator(coords).x)===1)
assert(round(p.miller(coords).x)===1)
assert(round(p.sinusoidal(coords).x)===1)
assert(round(p.sinusoidal(coords2).y)===0)
