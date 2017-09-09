<template>
  <div class="map" :id="mapId" :style="style">
    <span v-if="!hasMapData">{{message}}</span>
  </div>
</template>

<script>

export default {
  name: 'activity-map',
  beforeDestroy: function () {
    this.destroyMap()
  },
  data: function () {
    return {
      message: 'No Map Data',
      map: null,
      pointer: null,
      latlngs: null
    }
  },
  props: ['activityId', 'coordinates', 'height', 'width', 'latlng', 'readonly'],
  computed: {
    hasMapData: function () {
      return this.latlngs && Array.isArray(this.latlngs) && this.latlngs.length > 0
    },
    mapId: function () {
      return this.activityId ? `map${this.activityId}` : 'map'
    },
    style: function () {
      return { height: this.height, width: this.width }
    },
    circleOptions: function () {
      return {
        radius: 6,
        fill: true,
        fillOpacity: 1,
        color: 'white',
        weight: 2
      }
    }
  },
  methods: {
    destroyMap: function () {
      if (!this.map && !this.pointer) return
      if (this.pointer && this.map) {
        this.map.removeControl(this.pointer)
      }
      if (this.map) {
        this.map.remove()
      }
      this.pointer = null
      this.map = null
    },
    createMap: function () {
      this.destroyMap()
      const startCircleOptions = {
        ...this.circleOptions,
        fillColor: 'green'
      }
      const finishCircleOptions = {
        ...this.circleOptions,
        fillColor: 'black'
      }
      const mapOptions = {}
      const tileLayerOptions = {}
      const fitBoundsOptions = {
        paddingTopLeft: [0, 0],
        paddingBottomRight: [0, 0],
        animate: true
      }
      if (this.readonly) {
        mapOptions.attributionControl = false
        mapOptions.zoomControl = false
        mapOptions.boxZoom = false
        mapOptions.doubleClickZoom = false
        mapOptions.dragging = false
        mapOptions.keyboard = false
        tileLayerOptions.attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }
      const urlTemplate = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      const start = this.latlngs[0]
      const finish = this.latlngs[this.latlngs.length - 1]
      const startMarker = L.circleMarker(start, startCircleOptions)
      startMarker.bindTooltip('Start')
      const finishMarker = L.circleMarker(finish, finishCircleOptions)
      finishMarker.bindTooltip('Finish')
      const tileLayer = L.tileLayer(urlTemplate, tileLayerOptions)
      const polyline = L.polyline(this.latlngs, { color: 'blue', weight: 2 })

      this.map = L.map(this.mapId, mapOptions)
      this.map.setView(start, 13)
      this.map.addLayer(tileLayer)
      this.map.addControl(polyline)
      this.map.addControl(startMarker)
      this.map.addControl(finishMarker)
      this.map.fitBounds(polyline.getBounds(), fitBoundsOptions)
    }
  },
  watch: {
    activityId: {
      immediate: true,
      async handler () {
        this.destroyMap()
      }
    },
    coordinates: {
      immediate: true,
      async handler (newValue) {
        this.latlngs = await Promise.resolve(newValue)
      }
    },
    latlngs: {
      immediate: true,
      async handler () {
        this.destroyMap()
        if (this.hasMapData) this.createMap()
      }
    },
    latlng: function (latlng, lastLatlng) {
      if (latlng === lastLatlng) return
      if (!this.map) return

      const pointerCircleOptions = {
        ...this.circleOptions,
        fillColor: 'yellow'
      }

      if (this.pointer) {
        this.map.removeControl(this.pointer)
        this.pointer = null
      }
      if (latlng) {
        this.pointer = L.circleMarker(latlng, pointerCircleOptions)
        this.map.addControl(this.pointer)
      }
    }
  }
}
</script>

