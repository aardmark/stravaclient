export function decodeStream (stream) {
  let DecodeStreamWorker = require('worker-loader!./decodeStreamWorker.js')
  return new Promise(function (resolve, reject) {
    try {
      let worker = new DecodeStreamWorker()
      worker.postMessage(stream)
      worker.onmessage = function (event) {
        resolve(event.data)
      }
      worker.onerror = (errorEvent) => {
        errorEvent.preventDefault()
        reject(new Error(errorEvent.message))
      }
    } catch (error) {
      reject(error)
    }
  })
}

export function decodePolyline (polyline) {
  let DecodePolyLineWorker = require('worker-loader!./decodePolylineWorker.js')
  return new Promise(function (resolve, reject) {
    try {
      let worker = new DecodePolyLineWorker()
      worker.postMessage(polyline)
      worker.onmessage = function (event) {
        resolve(event.data)
      }
      worker.onerror = (errorEvent) => {
        errorEvent.preventDefault()
        reject(new Error(errorEvent.message))
      }
    } catch (error) {
      reject(error)
    }
  })
}
