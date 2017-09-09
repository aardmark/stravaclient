if (!Array.prototype.find) {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined')
      }
      var o = Object(this)
      var len = o.length >>> 0
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }
      var thisArg = arguments[1]
      var k = 0
      while (k < len) {
        var kValue = o[k]
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue
        }
        k++
      }
      return undefined
    }
  })
}

var streamTypes = ['time',
  'latlng',
  'distance',
  'altitude',
  'velocity_smooth',
  'heartrate',
  'cadence',
  'watts',
  'temp',
  'moving',
  'grade_smooth']

onmessage = function (event) {
  var stream = event.data
  var ret = {}
  for (var ix = 0; ix < streamTypes.length; ix++) {
    var streamType = streamTypes[ix]
    var streamData = stream.find(function (o) {
      return o.type === streamType
    })
    ret[streamType] = streamData ? streamData.data.slice() : undefined
  }
  postMessage(ret)
}
