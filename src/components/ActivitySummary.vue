<template>
  <dl v-if="activity">
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
  <div v-else>
    No details.
  </div>
</template>

<script>
import { getGear } from '../lib/stravalib'
import * as moment from 'moment'

export default {
  name: 'activity-summary',
  mounted: async function () {
    try {
      this.gear = await getGear(this.activity.gear_id)
    } catch (error) {
      console.error(error)
    }
  },
  data () {
    return {
      gear: null
    }
  },
  props: ['activity'],
  computed: {
    bikeName: function () {
      return this.gear ? this.gear.name : 'Loading...'
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
    }
  }
}
</script>
