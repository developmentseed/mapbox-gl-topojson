var mapboxgl = require('mapbox-gl')
mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJjaW4wOW1taTkwN3c5d2tsdXg3aXRrMjZhIn0.QpBLQwr3XzYs6xh6b8hbcQ'
var TopojsonSource = require('./topojson_source')

var map = window.map = new mapboxgl.Map({
    container: 'map',
    zoom: 5.2,
    center: [-119.393, 36.883],
    style: 'mapbox://styles/mapbox/streets-v8',
    hash: true
});

map.addControl(new mapboxgl.Navigation());

map.on('load', function() {
  map.style.addSourceType('topojson', TopojsonSource, function () {
    map.addSource('counties', {
        type: 'topojson',
        data: 'ca.json',
        layer: 'counties'
    })

    map.addLayer({
        "id": "county-boundaries",
        "type": "line",
        "source": "counties",
        "paint": {
            "line-color": "#EC8D8D",
            "line-width": {
                "base": 1.5,
                "stops": [
                    [
                        5,
                        0.75
                    ],
                    [
                        18,
                        32
                    ]
                ]
            }
        }
    }, 'country-label-lg');

  })
})
