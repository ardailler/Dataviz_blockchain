<template>
  <full-page ref="fullpage" :options="options" id="fullpage">
    <FullpageSection>
      <Introduction></Introduction>
    </FullpageSection>
    <FullpageSection>

    </FullpageSection>
    <FullpageSection>

    </FullpageSection>
    <FullpageSection>

    </FullpageSection>
  </full-page>
</template>

<script>

  import FullpageSection from '@/components/elements/FullpageSection.vue'
  import Introduction from '@/components/pages/Introduction.vue'

  import '@/assets/plugin/fullpage.min.css'

  export default {
    name: 'Fullpage',
    props: {
    },
    components: {
      FullpageSection,
      Introduction
    },
    data() {
      return {
        options: {
          licenseKey: 'XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX',
          scrollBar: false,

          //Navigation
          menu: '#menu',
          lockAnchors: true,
          sectionsColor: ['white', 'white', 'white', 'black'],
          anchors:['introPage', 'firstPage', 'secondPage', 'footerPage'],
          navigation: true,
          navigationPosition: 'right',
          navigationTooltips: ['introSlide', 'firstSlide', 'secondSlide', 'footerSlide'],
          showActiveTooltip: false,
          slidesNavigation: true,
          slidesNavPosition: 'bottom',

          //Accessibility
          keyboardScrolling: true,
        },
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #fullpage {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
