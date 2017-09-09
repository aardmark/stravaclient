<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <athlete-summary :athlete="athlete"></athlete-summary>
    <athlete-activity-summary :athlete="athlete"></athlete-activity-summary>
  </div>
</template>

<script>
import { getAuthenticatedAthlete } from '../lib/stravalib'
import AthleteSummary from './AthleteSummary.vue'
import AthleteActivitySummary from './AthleteActivitySummary.vue'

export default {
  name: 'dashboard',
  mounted: async function () {
    try {
      this.athlete = await getAuthenticatedAthlete()
    } catch (error) {
      console.error(error)
    }
  },
  data () {
    return {
      athlete: null
    }
  },
  components: {
    AthleteSummary,
    AthleteActivitySummary
  }
}
</script>
