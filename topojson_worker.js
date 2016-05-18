var topojson = require('topojson')
var GeojsonWorker = require('mapbox-gl/js/source/geojson_source_worker')
var ajax = require('mapbox-gl/js/util/ajax')

var plugin = Object.create(GeojsonWorker)
plugin.getData = function (params, callback) {
  ajax.getJSON(params.url, function (err, topo) {
    if (err) { return callback(err) }
    callback(null, topojson.feature(topo, topo.objects[params.layer]))
  })
}

module.exports = function (self) {
    self.registerPlugin('topojson', plugin);
};
