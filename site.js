var mapboxgl = require('mapbox-gl')

mapboxgl.accessToken = getAccessToken()

// Alternative to the `sourceTypes:` option is to do the following
// before creating the map:
//
// mapboxgl.Source.addType('topojson', require('./topojson_source'))
//
// (This can also be done after, but that requires listening for the
// 'source-type.add' event before using it.)

var map = window.map = new mapboxgl.Map({
  container: 'map',
  zoom: 5.2,
  center: [-119.393, 36.883],
  style: 'mapbox://styles/mapbox/streets-v8',
  sourceTypes: {
    topojson: require('./topojson_source')
  }
})

map.addControl(new mapboxgl.Navigation())

map.on('load', function () {
  map.addSource('counties', {
    type: 'topojson',
    data: 'ca.json',
    workerOptions: {
      layer: 'counties'
    }
  })

  map.addLayer({
    'id': 'county-boundaries',
    'type': 'line',
    'source': 'counties',
    'paint': {
      'line-color': '#EC8D8D',
      'line-width': {
        'base': 1.5,
        'stops': [
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
  }, 'country-label-lg')
})

function getAccessToken () {
  var accessToken = (
        getURLParameter('access_token') ||
        localStorage.getItem('accessToken')
    )
  localStorage.setItem('accessToken', accessToken)
  return accessToken
}

function getURLParameter (name) {
  var regexp = new RegExp('[?&]' + name + '=([^&#]*)', 'i')
  var output = regexp.exec(window.location.href)
  return output && output[1]
}
