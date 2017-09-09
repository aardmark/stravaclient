<template>
  <div>
    <h3>Latest Activities</h3>
    <div v-for="activity in activities" :key="activity.id" class="group">
      <router-link :to="{ name: 'ActivityDetails', params: { id: activity.id }}" class="maplink">
        <activity-map :activity-id="activity.id" :coordinates="decode(activity)" height="160px" width="260px" :readonly="true"></activity-map>
      </router-link>
      <activity-summary :activity="activity"></activity-summary>
    </div>
  </div>
</template>

<script>
import { getAthleteActivitySummary } from '../lib/stravalib'
import { decodePolyline } from '../workers'
import ActivitySummary from './ActivitySummary.vue'
import ActivityMap from './ActivityMap.vue'

export default {
  name: 'athlete-activity-summary',
  data () {
    return {
      activities: []
    }
  },
  props: ['athlete'],
  watch: {
    athlete: async function () {
      if (this.athlete) {
        try {
          this.activities = await getAthleteActivitySummary(this.athlete.id)
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  methods: {
    decode: function (activity) {
      return decodePolyline(activity.map.summary_polyline)
    }
  },
  components: {
    ActivitySummary,
    ActivityMap
  }
}
</script>

<style scoped>
.group:after {
  content: "";
  display: table;
  clear: both;
}

.maplink {
  float: right;
}
</style>
