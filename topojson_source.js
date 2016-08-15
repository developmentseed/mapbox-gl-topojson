var util = require('mapbox-gl/js/util/util')
var GeoJSONSource = require('mapbox-gl/js/source/geojson_source')
var webworkify = require('webworkify')

module.exports = TopoJSONSource

function TopoJSONSource (id, options, dispatcher) {
  GeoJSONSource.call(this, id, options, dispatcher)
}

TopoJSONSource.prototype = util.inherit(GeoJSONSource, {
  type: 'topojson'
})

TopoJSONSource.workerSourceURL = URL.createObjectURL(webworkify(require('./topojson_worker.js'), {bare: true}))

