<template>
  <div id="app">
    <transition name="nav-anim" enter-active-class="animated fadeInDown fast" leave-active-class="animated fadeOutUp fast">
      <Menu v-if="isNavOpen"></Menu>
    </transition>
    <router-view/>
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
