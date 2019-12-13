<template>
  <nav id="nav">
    <div class="title">
      <img :src="bitcoin" alt="logo">
      <transition name="nav-anim" enter-active-class="animated slideInDown" leave-active-class="animated slideOutDown">
        <h6 :key="getSlideName">{{ getSlideName }}</h6>
      </transition>
    </div>
  </nav>
</template>

<script>
import bitcoin from '@/assets/img/bitcoin.svg'

export default {
  name: 'Menu',
  props: {
  },
  data () {
    return {
      bitcoin: bitcoin
    }
  },
  computed: {
    getSlideName () {
      return this.$store.getters.allData.slideName
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #nav {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 64px;
    padding: 0px 20px;
    background-color: white;
    border-bottom: 2px solid var(--color-primary);
    z-index: 9999;
    overflow: hidden;
  }
  #nav .title {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
  }
  #nav .title > * {
    margin-right: 10px;
  }
  #nav .title > h6 {
    position: absolute;
    left: 34px;
    height: 100%;
    display: flex;
    align-items: center ;
  }
  #nav .title > img {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
  }
</style>
