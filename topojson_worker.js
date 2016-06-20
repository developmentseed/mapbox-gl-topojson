var topojson = require('topojson')
var GeoJSONWorkerSource = require('mapbox-gl/js/source/geojson_worker_source')
var ajax = require('mapbox-gl/js/util/ajax')

function loadGeoJSON (params, callback) {
  // defer to the default implementation to grab / JSON.parse the data, which
  // is actually expected to be topojson in our case.
  GeoJSONWorkerSource.prototype.loadGeoJSON.call(this, params, function (err, topo) {
    if (err) { return callback(err) }
    // once we have it, convert the layer specified in `params` to geojson.
    callback(null, topojson.feature(topo, topo.objects[params.layer]))
  })
}

module.exports = function (self) {
  self.registerWorkerSource('topojson', new GeoJSONWorkerSource(loadGeoJSON));
};
