<template>
  <div>
    <h3>
      Activity</h3>
    <div v-if="activity">
      <dl>
        <dt>Name</dt>
        <dd>{{activity.name}}</dd>
        <dt>Type</dt>
        <dd>{{activity.type}}</dd>
        <dt>Started</dt>
        <dd>{{formatDateTime(activity.start_date)}}</dd>
        <dt>Distance</dt>
        <dd>{{toKms(activity.distance)}}km</dd>
        <dt>Total Elevation Gain</dt>
        <dd>{{activity.total_elevation_gain}}m</dd>
        <dt>Moving Time</dt>
        <dd>{{formatSeconds(activity.moving_time)}}</dd>
        <dt>Privacy</dt>
        <dd>{{activity.private ? 'Private' : 'Public'}}</dd>
        <dt>Bike</dt>
        <dd>{{ bikeName }}</dd>
      </dl>
    </div>
    <div v-else>
      No details.
    </div>
    <div v-if="streamDataStatus">{{streamDataStatus}}</div>
    <activity-map :activity-id="id" :coordinates="coordinates" :latlng="pointerLatLng" height="351px" width="966px" :readonly="false"></activity-map>
    <activity-chart :activity-id="id" :stream-data="streamData" width="966" height="351" @mousemove="onChartMouseMove" @mouseout="onChartMouseOut"></activity-chart>
    <router-link :to="{ name: 'Dashboard'}">Dashboard</router-link>
  </div>
</template>

<script>
import ActivityMap from './ActivityMap.vue'
import ActivityChart from './ActivityChart.vue'
import { getActivity, getGear, getStream } from '../lib/stravalib'
import { decodeStream } from '../workers'
import * as moment from 'moment'

export default {
  name: 'activity-details',
  mounted: async function () {
    this.loadActivity(this.id)
  },
  data () {
    return {
      activity: null,
      gear: null,
      streamData: null,
      streamDataStatus: null,
      pointerLatLng: null
    }
  },
  props: ['id'],
  computed: {
    bikeName: function () {
      return this.gear ? this.gear.name : 'Loading...'
    },
    coordinates: function () {
      return this.streamData ? this.streamData.latlng : null
    }
  },
  watch: {
    id: function (newId) {
      this.loadActivity(newId)
    }
  },
  methods: {
    formatDateTime: function (date) {
      return moment(date).format('DD/MM/YYYY hh:mma')
    },
    formatSeconds: function (seconds) {
      return moment('2017-01-01').startOf('day').seconds(seconds).format('H:mm:ss')
    },
    toKms: function (meters) {
      return Math.round(meters / 100) / 10
    },
    onChartMouseOut: function () {
      this.pointerLatLng = null
    },
    onChartMouseMove: function (params) {
      if (!this.streamData) return
      this.pointerLatLng = this.streamData.latlng[params[0]]
    },
    loadActivity: async function (id) {
      try {
        this.streamDataStatus = 'Loading...'
        let [activity, stream] = await Promise.all([getActivity(id), getStream(id)])
        this.activity = activity;
        [this.gear, this.streamData] = await Promise.all([getGear(this.activity.gear_id), decodeStream(stream)])
        this.streamDataStatus = null
      } catch (error) {
        this.streamDataStatus = error.message ? error.message : error
        console.error(error)
      }
    }
  },
  components: {
    ActivityMap,
    ActivityChart
  }
}
</script>
