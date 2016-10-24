# projections

Collection of (stereographic) map projections. See [this Wikipedia list](https://en.wikipedia.org/wiki/List_of_map_projections).

[![npm version](https://img.shields.io/npm/v/projections.svg)](https://www.npmjs.com/package/projections)
[![Build Status](https://travis-ci.org/juliuste/projections.svg?branch=master)](https://travis-ci.org/juliuste/projections)
[![dependency status](https://img.shields.io/david/juliuste/projections.svg)](https://david-dm.org/juliuste/projections)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/projections.svg)](https://david-dm.org/juliuste/projections#info=devDependencies)
[![license](https://img.shields.io/github/license/juliuste/projections.svg?style=flat)](LICENSE)

## Installation

```shell
npm install --save projections
```

## Usage

```js
const projections = require('projections') // for all projections
const mercator = require('projections/mercator') // for a specific projection
```

### WGS to map coordinates

```js
const {x, y} = mercator({lon: 13.5, lat: 52.4})
// x ≊ 0.53722
// y ≊ 0.32686
```

Given an object containing `lon` and `lat`, `mercator` returns an object `{x: …, y: …}` (`0 ≤ x ≤ 1`). For details on the range of `y`, see the *map height* column in the projections table.

### Map coordinates to WGS

```js
const {lon, lat} = mercator({x: 0.53722, y: 0.32686})
// lon ≊ 13.5
// lat ≊ 52.4
```
Given an object containing `x` and `y` (`0 ≤ x ≤ 1`), `mercator` returns an object `{lon: …, lat: …}`.

**Be sure to use the same options everytime you're converting coordinates back and forth to get correct results.**

### Projections

Projection | Full name | Available options | Map height\*
---------- | --------- | ----------------- | -----------
`braun` | **[Braun stereographic](https://en.wikipedia.org/wiki/Gall_stereographic_projection#Braun_stereographic_projection)** | `meridian`, `latLimit`
`central-cylindrical` | **[Central cylindrical](https://en.wikipedia.org/wiki/Central_cylindrical_projection)** | `meridian`, `latLimit`
`equirectangular` | **[Equirectangular](https://en.wikipedia.org/wiki/Equirectangular_projection)** | `meridian`, `standardParallel` | 1 / 2
`gall` | **[Gall stereographic](https://en.wikipedia.org/wiki/Gall_stereographic_projection)** | `meridian`, `latLimit` |
`gall-peters` | **[Gall–Peters](https://en.wikipedia.org/wiki/Gall%E2%80%93Peters_projection)** | `meridian` | 2 / π
`kavrayskiy-7` | **[Kavrayskiy VII](https://en.wikipedia.org/wiki/Kavrayskiy_VII_projection)** | `meridian` | 1 / √3
`lambert` | **[Lambert cylindrical equal-area](https://en.wikipedia.org/wiki/Lambert_cylindrical_equal-area_projection)** | `meridian` | 1 / π
`mercator` | **[Mercator (Web)](http://mathworld.wolfram.com/MercatorProjection.html)** | `meridian`, `latLimit` |
`miller` | **[Miller cylindrical](https://en.wikipedia.org/wiki/Miller_cylindrical_projection)** | `meridian`, `latLimit` |
`sinusoidal` | **[Sinusoidal](https://en.wikipedia.org/wiki/Sinusoidal_projection)** | `meridian` | 1 / 2
`wagner-6` | **[Wagner VI](https://en.wikipedia.org/wiki/Wagner_VI_projection)** | `meridian` | 1 / 2

\* If the projection uses a latitude limit, the map height is the value of `y` at `{lon: meridian, lat: -latLimit}`. Otherwise it is the value of `y` at `{lon: meridian, lat: -90}`.

### Options

Option | description | Default
------ | ----------- | -------
`meridian` | Latitude of the central meridian | 0
`latLimit` | maximum latitude in degrees < 90 | 85
`standardParallel` | longitude of the standard parallel(s) | 0

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/projections/issues).
