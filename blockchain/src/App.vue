<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import '@/assets/css/main.css'

export default {
  name: 'App'
}
</script>

<style>
  #app {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
