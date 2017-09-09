<template>
  <div>
    <h3>Athlete</h3>
    <dl v-if="athlete">
      <dt>Name</dt>
      <dd>{{athlete.firstname}} {{athlete.lastname}}</dd>
      <dt>Email</dt>
      <dd>{{athlete.email}}</dd>
      <dt>Location</dt>
      <dd>{{athlete.city}}, {{athlete.state}}, {{athlete.country}}</dd>
      <dt>Joined</dt>
      <dd>{{athlete.created_at}}</dd>
    </dl>
    <div v-else>
      No details for {{ id }}.
    </div>
    <router-link :to="{ name: 'Dashboard'}">Dashboard</router-link>
  </div>
</template>

<script>
import { getAthlete } from '../lib/stravalib'

export default {
  name: 'athlete-details',
  mounted: async function () {
    try {
      this.athlete = await getAthlete(this.id)
    } catch (error) {
      console.error(error)
    }
  },
  data: function () {
    return {
      athlete: null
    }
  },
  props: ['id']
}
</script>
