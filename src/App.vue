<template>
  <div id="app">
    <h1>Strava</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}

h1 {
  font-weight: normal;
}

a {
  color: #42b983;
}

dl {
  padding: 0.5em;
}

dt {
  float: left;
  clear: left;
  width: 160px;
  text-align: right;
  font-weight: bold;
  color: green;
}

dt::after {
  content: ":";
}

dd {
  margin: 0 0 0 170px;
  padding: 0 0 0.5em 0;
}
</style>
