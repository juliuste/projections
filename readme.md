# projections

Collection of map projections. See [this Wikipedia list](https://en.wikipedia.org/wiki/List_of_map_projections).

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
const miller = require('projections').miller // for a specific projection
```

### WGS to map coordinates

```js
projections.mercator({lon: …, lat: …}, {option: …}) // {x: …, y: …}
```
When given an Object containing `lon` and `lat` keys, a projection function returns an object in the form of `{x: …, y: …}` where `0 ≤ x ≤ 1`. For the value range of `y`, see the *map height* column in the projections table.

### Map coordinates to WGS

```js
projections.mercator({x: …, y: …}, {option: …}) // {lon: …, lat: …}
```
When given an Object containing `x` and `y` keys (where `0 ≤ x ≤ 1`), a projection function returns an object in the form of `{lon: …, lat: …}`. Be sure to use the same options everytime you're converting coordinates back and forth to maintain data continuity.

### Projections

Projection | Full name | Available option(s) | Map height\*
---------- | --------- | ------------------- | -----------
`braun` | **[Braun stereographic](https://en.wikipedia.org/wiki/Gall_stereographic_projection#Braun_stereographic_projection)** | `meridian`, `latLimit`
`centralcylindrical` | **[Central cylindrical](https://en.wikipedia.org/wiki/Central_cylindrical_projection)** | `meridian`, `latLimit`
`equirectangular` | **[Equirectangular](https://en.wikipedia.org/wiki/Equirectangular_projection)** | `meridian`, `standardParallel` | 1 / 2
`gall` | **[Gall stereographic](https://en.wikipedia.org/wiki/Gall_stereographic_projection)** | `meridian`, `latLimit` | 
`gallpeters` | **[Gall–Peters](https://en.wikipedia.org/wiki/Gall%E2%80%93Peters_projection)** | `meridian` | 2 / π
`kavrayskiy7` | **[Kavrayskiy VII](https://en.wikipedia.org/wiki/Kavrayskiy_VII_projection)** | `meridian` | 
`lambert` | **[Lambert cylindrical equal-area](https://en.wikipedia.org/wiki/Lambert_cylindrical_equal-area_projection)** | `meridian` | 1 / π
`mercator` | **[Mercator (Web)](http://mathworld.wolfram.com/MercatorProjection.html)** | `meridian`, `latLimit` | 
`miller` | **[Miller cylindrical](https://en.wikipedia.org/wiki/Miller_cylindrical_projection)** | `meridian`, `latLimit` | 
`sinusoidal` | **[Sinusoidal](https://en.wikipedia.org/wiki/Sinusoidal_projection)** | `meridian` | 1 / 2

\* Generally, the map height is the `y` value of the projection at
- `{lon: meridian, lat: (-1)*latLimit}` if the projection uses a latitude limit
- `{lon: meridian, lat: -90` otherwise

### Options

Option | description | Default
------ | ----------- | -------
`meridian` | Latitude of the central meridian | 0
`latLimit` | maximal latitude in degrees < 90 | 85
`standardParallel` | latitude of the standard parallel(s) | 0

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/projections/issues).