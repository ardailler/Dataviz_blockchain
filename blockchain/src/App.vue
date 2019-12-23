<template>
  <div id="app">
    <transition name="nav-anim" enter-active-class="animated fadeInDown fast" leave-active-class="animated fadeOutUp fast">
      <Menu v-if="isNavOpen"></Menu>
    </transition>
    <router-view/>
    <div @click="clickMe()">click</div>
  </div>
</template>

<script>
import '@/assets/plugin/animate.css'
import '@/assets/css/main.css'

import Menu from '@/components/elements/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
  },
  computed: {
    isNavOpen () {
      return this.$store.getters.allData.showNav
    }
  },
  methods: {
    clickMe () {
      this.$router.push('/test')
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
</style>
