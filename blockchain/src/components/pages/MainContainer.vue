<template>
  <full-page ref="fullpage" :options="options" id="fullpage">
    <FullpageSection>
      <Introduction></Introduction>
    </FullpageSection>

    <FullpageSection>
      <Consommation></Consommation>
    </FullpageSection>

    <FullpageSection>
      <Comparaison></Comparaison>
    </FullpageSection>

    <FullpageSection>
      <Simulation></Simulation>
    </FullpageSection>

    <FullpageSection>

    </FullpageSection>
  </full-page>
</template>

<script>

import FullpageSection from '@/components/elements/FullpageSection.vue'
import Introduction from '@/components/pages/Introduction.vue'
import Comparaison from '@/components/pages/Comparaison.vue'
import Consommation from '@/components/pages/Consommation.vue'
import Simulation from '@/components/pages/Simulation.vue'

import '@/assets/plugin/fullpage.min.css'

export default {
  name: 'MainContainer',
  props: {
  },
  components: {
    FullpageSection,
    Introduction,
    Comparaison,
    Consommation,
    Simulation
  },
  data () {
    return {
      options: {
        licenseKey: 'XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX',
        scrollBar: false,

        // Navigation
        menu: '#menu',
        lockAnchors: true,
        scrollingSpeed: 800,
        sectionsColor: ['white', 'white', 'white', 'black'],
        anchors: ['Introduction', 'Consommations', 'Comparaisons', 'Simulation', 'Footer'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Introduction', 'Consommations', 'Comparaisons', 'Simulation', 'Footer'],
        showActiveTooltip: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        // Accessibility
        keyboardScrolling: true,

        // callback
        afterLoad: this.onLeave,
        onLeave: this.onLeave
      }
    }
  },
  methods: {
    onLeave (origin, destination, direction) {
      this.$store.dispatch('slideName', destination.anchor)
      if (destination.anchor === 'Introduction' || destination.anchor === 'Footer') {
        this.$store.dispatch('showNav', false)
      } else {
        this.$store.dispatch('showNav', true)
      }
    }
  }
}
</script>

<style scoped>
  #fullpage {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
</style>

<style>
  /*Overide*/
  #fp-nav ul li a span,
  .fp-slidesNav ul li a span {
    background: var(--color-dark)!important;
  }
  /*Overide*/
  #fp-nav ul li .fp-tooltip {
    color: var(--color-dark)!important;
    background-color: white!important;
    padding: 2px 5px;
    border-radius: 50px;
  }

  #fp-nav ul li a span, .fp-slidesNav ul li a span {
    border: 1px solid white;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
</style>
