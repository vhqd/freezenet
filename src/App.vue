<template>
  <div id="app">
    	<router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f5f5f5;
}

.mu-loading-wrap__fixed{width: 100%;height: 100%;position: fixed;top: 0;}
.mu-circular-progress{position: absolute;left: 50%;top:50%;margin-left: -24px;margin-top: -24px;}
</style>
