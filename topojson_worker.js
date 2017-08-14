var topojson = require('topojson')
var GeoJSONWorkerSource = require('mapbox-gl/src/source/geojson_worker_source')

class TopoJSONWorkerSource extends GeoJSONWorkerSource {
  loadGeoJSON (params, callback) {
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
}

module.exports = function (self) {
  self.registerWorkerSource('topojson', TopoJSONWorkerSource)
}
