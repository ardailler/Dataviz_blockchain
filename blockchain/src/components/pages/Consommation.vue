<template>
  <div class='page-consommation'>
    <div id='sunburst2'></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
// const csvTransactions = require('@/assets/data/avg-consommation-per-day.csv')

export default {
  name: 'Consommation',
  props: {
  },
  data () {
    return {
      width: 700,
      height: 700,
      svg: null,
      data: null
    }
  },
  mounted () {
    this.initGraph()
    this.drawGraph()
  },
  computed: {
  },
  methods: {
    initGraph () {
      let _self = this
      _self.svg = d3.select('#sunburst2')
        .append('svg')
        .attr('viewBox', [0, 0, _self.width, _self.width])
        .style('font', '10px sans-serif')
        .attr('width', _self.width)
        .attr('height', _self.height)
    },
    drawGraph () {
      // let self = this
      /* d3.csv(csvTransactions).then(function (transactions) {

        // let colorRange = d3.scaleLinear().domain([0, 0.5]).range(['#F4A812', '#FFED42'])

        return self.svg.node()
      }) */
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .page-consommation {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background: white;
  }

</style>
