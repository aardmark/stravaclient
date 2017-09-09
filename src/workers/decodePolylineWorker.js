if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
}

onmessage = function (event) {
  var encoded
  var precision = 5
  if (Array.isArray(event.data)) {
    encoded = event.data[0]
    if (event.data.length > 1) precision = event.data[1]
  } else {
    encoded = event.data
  }
  var coordinates = []
  var factor = Math.pow(10, precision)
  var index = 0
  var lat = 0
  var lng = 0

  while (index < encoded.length) {
    var byte = null
    var shift = 0
    var result = 0

    do {
      byte = encoded.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    var latitudeChange = ((result & 1) ? ~(result >> 1) : (result >> 1))

    shift = result = 0

    do {
      byte = encoded.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    var longitudeChange = ((result & 1) ? ~(result >> 1) : (result >> 1))

    lat += latitudeChange
    lng += longitudeChange

    coordinates.push([lat / factor, lng / factor])
  }
  postMessage(coordinates)
}
