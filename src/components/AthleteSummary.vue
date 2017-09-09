<template>
  <div>
    <h3>Athlete</h3>
    <dl v-if="athlete">
      <dt>Name</dt>
      <dd>
        <router-link :to="{ name: 'AthleteDetails', params: { id: athlete.id }}">{{athlete.firstname}} {{athlete.lastname}}</router-link>
      </dd>
      <dt>Email</dt>
      <dd>{{athlete.email}}</dd>
      <dt>Location</dt>
      <dd>{{athlete.city}}, {{athlete.state}}, {{athlete.country}}</dd>
      <dt>Joined</dt>
      <dd>{{ formatDateTime(athlete.created_at)}}</dd>
    </dl>
    <div v-else>
      No details.
    </div>
  </div>
</template>

<script>
import * as moment from 'moment'

export default {
  name: 'athlete-summary',
  props: ['athlete'],
  methods: {
    formatDateTime: function (date) {
      return moment(date).format('DD/MM/YYYY hh:mma')
    }
  }
}
</script>
