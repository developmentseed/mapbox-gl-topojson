var GeojsonSource = require('mapbox-gl/js/source/geojson_source')
var webworkify = require('webworkify')

module.exports = TopojsonSource
module.exports.worker = URL.createObjectURL(webworkify(require('./topojson_worker.js'), {bare: true}));

function TopojsonSource (options) {
  GeojsonSource.call(this, options)
}
TopojsonSource.prototype = Object.create(GeojsonSource.prototype)

