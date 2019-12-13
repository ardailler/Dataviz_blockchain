<template>
  <div id="app">
    <transition name="nav-anim" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
      <nav id="nav" v-if="isNavOpen"></nav>
    </transition>
    <router-view/>
    {{ isNavOpen }}
  </div>
</template>

<script>
import '@/assets/plugin/animate.css'
import '@/assets/css/main.css'

export default {
  name: 'App',
  computed: {
    isNavOpen () {
      return this.$store.getters.allData.showNav
    }
  }
}
</script>

<style>
  #app {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  #nav {
    position: fixed;
    display: block;
    width: 100%;
    height: 64px;
    background-color: white;
    border-bottom: 2px solid var(--color-primary);
    z-index: 9999;
  }
</style>
