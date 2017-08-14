var GeoJSONSource = require('mapbox-gl/src/source/geojson_source')
var webworkify = require('webworkify')

class TopoJSONSource extends GeoJSONSource {}

TopoJSONSource.workerSourceURL = URL.createObjectURL(webworkify(require('./topojson_worker.js'), {bare: true}))

module.exports = TopoJSONSource
