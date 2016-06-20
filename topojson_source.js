var GeoJSONSource = require('mapbox-gl/js/source/geojson_source')
var webworkify = require('webworkify')

module.exports.create = function (id, options, dispatcher) {
    // make sure the `layer` property gets passed on to the WorkerSource
    options = Object.assign({ workerOptions: { layer: options.layer } }, options)
    return GeoJSONSource.create(id, options, dispatcher);
};

module.exports.workerSourceURL = URL.createObjectURL(webworkify(require('./topojson_worker.js'), {bare: true}));

