var mapboxgl = require('mapbox-gl')

mapboxgl.accessToken = getAccessToken()

mapboxgl.Source.addType('topojson', require('./topojson_source'))

var map = window.map = new mapboxgl.Map({
  container: 'map',
  zoom: 5.2,
  center: [-119.393, 36.883],
  style: 'mapbox://styles/mapbox/streets-v8'
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
