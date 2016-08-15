var util = require('mapbox-gl/js/util/util')
var topojson = require('topojson')
var GeoJSONWorkerSource = require('mapbox-gl/js/source/geojson_worker_source')

function loadGeoJSON (params, callback) {
  // defer to the default implementation to grab / JSON.parse the data, which
  // is actually expected to be topojson in our case.
  GeoJSONWorkerSource.prototype.loadGeoJSON.call(this, params, function (err, topo) {
    if (err) { return callback(err) }
    // once we have it, convert the layer specified in `params` to geojson.
    var data = topojson.feature(topo, topo.objects[params.layer])
    console.log('data', data, params, topo)
    callback(null, data)
  })
}

function TopoJSONWorkerSource (actor, style) {
  GeoJSONWorkerSource.call(this, actor, style, loadGeoJSON)
}

TopoJSONWorkerSource.prototype = util.inherit(GeoJSONWorkerSource)

module.exports = function (self) {
  self.registerWorkerSource('topojson', TopoJSONWorkerSource)
}
