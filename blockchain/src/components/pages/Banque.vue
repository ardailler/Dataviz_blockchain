<template>
  <div class='page-banque row'>
    <GrapheBar :typeData="getDataType"></GrapheBar>
  </div>
</template>

<script>
import GrapheBar from '@/components/elements/GrapheBar.vue'

export default {
  name: 'Banque',
  props: {
  },
  data () {
    return {

    }
  },
  components: {
    GrapheBar
  },
  mounted () {
  },
  computed: {
    getDataType () {
      return this.$store.getters.allData.switchConso ? 'data' : 'energie'
    }
  },
  methods: {
    /* updateGraphYearConso () {
      let self = this
      self.$watch(
        () => {
          return self.$refs.graphIcons.consoYear
        },
        (val) => {
          self.consoYear = val
        }
      )
    } */
  }
}
</script>

<style scoped>
  .page-banque {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
    padding-top: 64px;
  }

</style>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
