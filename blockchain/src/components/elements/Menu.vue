<template>
  <nav id="nav">
    <div class="title">
      <img :src="bitcoin" alt="logo">
      <transition name="nav-anim" enter-active-class="animated slideInDown fast" leave-active-class="animated slideOutDown fast">
        <h6 :key="getSlideName">{{ getSlideName }}</h6>
      </transition>
    </div>
    <div class="switch-button">
      <span :class="['icon energie', iconActivated('energie')]"></span>
      <SwitchButton :switchState="isActivated" @clickOnSwitch="switchTypeConso()"></SwitchButton>
      <!--<input type="checkbox" :checked="isActivated" @click.stop.prevent="switchTypeConso()">-->
      <span :class="['icon data', iconActivated('data')]"></span>
    </div>
  </nav>
</template>

<script>
import bitcoin from '@/assets/img/bitcoin.svg'
import SwitchButton from '@/components/elements/SwitchButton.vue'

export default {
  name: 'Menu',
  props: {
  },
  data () {
    return {
      bitcoin: bitcoin
    }
  },
  components: {
    SwitchButton
  },
  computed: {
    getSlideName () {
      return this.$store.getters.allData.slideName
    },
    isActivated () {
      return this.$store.getters.allData.switchConso
    }
  },
  methods: {
    switchTypeConso () {
      this.$store.dispatch('switchConso')
    },
    iconActivated (type) {
      return (this.$store.getters.allData.switchConso && type === 'data') || (!this.$store.getters.allData.switchConso && type === 'energie') ? 'activated' : ''
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

  #nav > .switch-button {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
  }
  #nav > .switch-button > .icon {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;

    filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
  }
  #nav > .switch-button > .icon.activated {
    filter: grayscale(0%);
    -ms-filter: grayscale(0%);
    -webkit-filter: grayscale(0%);
  }
  #nav > .switch-button > .icon.data {
    background: transparent url('../../assets/img/data-storage.svg') no-repeat 50% 50% / 16px;
  }
  #nav > .switch-button > .icon.energie {
    background: transparent url('../../assets/img/energie.svg') no-repeat 50% 50% / 16px;
  }
</style>
