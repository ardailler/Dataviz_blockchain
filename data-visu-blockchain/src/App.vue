<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import '@/assets/css/main.css'
export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>

</style>
