<template>
  <div class="graphBar">
    <div id="chart"></div>
  </div>
</template>

<script>

import * as d3 from 'd3'
const csvBqTransac = require('@/assets/data/banctransac.csv')
const csvBqConso = require('@/assets/data/bancconsu.csv')

export default {
  name: 'GrapheBar',
  props: {
    typeData: {
      type: String,
      default: 'data'
    }
  },
  data () {
    return {
      margin: {
        top: 10,
        right: 10,
        bottom: 20,
        left: 40
      },
      width: 500, // 800 - this.margin.left - this.margin.right
      height: 500, // 400 - this.margin.top - this.margin.bottom
      x0: null,
      x1: null,
      xAxis: null,
      y: null,
      yAxis: null,
      svg: null,
      color: null,
      groupKey: null,
      keys: null,
      legend: null,
      data: {
        transactions: {
          data: null,
          dataTransform: null
        },
        energie: {
          data: null,
          dataTransform: null
        }
      }
    }
  },
  mounted () {
    let self = this
    self.loadData() // Years / Months / Days
    setTimeout(function () {
      self.initGraph()
    }, 1000)
  },
  components: {
  },
  watch: {
    typeData () {
      let self = this
      if (self.x0 && self.x1 && self.y && self.svg) {
        d3.select('#chart > svg').remove()
        self.svg.remove()
        self.loadData() // Years / Months / Days
        setTimeout(function () {
          self.initGraph()
        }, 1000)
      }
    }
  },
  methods: {
    // fonction qui charge et met en forme les données
    loadData () { // Years, Months, Days
      let self = this
      // load data from transactions
      d3.csv(csvBqTransac).then(function (transac) {
        transac.forEach((d, index) => {
          d['date'] = parseInt(new Date(d['date']).getFullYear().toString())
          d['VISA'] = parseFloat(d['VISA'])
          d['Master Card'] = parseFloat(d['Master Card'])
          d['Bitcoin'] = parseFloat(d['Bitcoin'])
        })
        self.data.transactions.data = transac
      })
      d3.csv(csvBqConso).then(function (conso) {
        conso.forEach((d, index) => {
          d['date'] = parseInt(new Date(d['date']).getFullYear().toString())
          d['VISA'] = parseFloat(d['VISA'])
          d['Master Card'] = parseFloat(d['Master Card'])
          d['Bitcoin'] = parseFloat(d['Bitcoin'])
        })
        self.data.energie.data = conso
      })
    },
    initGraph () {
      let self = this
      let data = self.typeData === 'data' ? self.data.transactions.data : self.data.energie.data

      self.groupKey = data.columns[0]
      self.keys = data.columns.slice(1)

      self.x0 = d3.scaleBand()
        .domain(data.map(d => d[self.groupKey]))
        .rangeRound([self.margin.left, self.width - self.margin.right])
        .paddingInner(0.1)

      self.x1 = d3.scaleBand()
        .domain(self.keys)
        .rangeRound([0, self.x0.bandwidth()])
        .padding(0.05)

      self.y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d3.max(self.keys, key => d[key]))]).nice()
        .rangeRound([self.height - self.margin.bottom, self.margin.top])

      self.xAxis = g => g
        .attr('transform', `translate(0,${self.height - self.margin.bottom})`)
        .call(d3.axisBottom(self.x0).tickSizeOuter(0))
        .call(g => g.select('.domain').remove())

      self.yAxis = g => g
        .attr('transform', `translate(${self.margin.left},0)`)
        .call(d3.axisLeft(self.y).ticks(null, 's'))
        .call(g => g.select('.domain').remove())
        .call(g => g.select('.tick:last-of-type text').clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text(data.y))

      self.color = d3.scaleOrdinal()
        .range(['#ca0020', '#f4a582', '#d5d5d5', '#92c5de', '#0571b0'])

      self.svg = d3.select('#chart').append('svg')
        .attr('width', self.width + self.margin.left + self.margin.right)
        .attr('height', self.height + self.margin.top + self.margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + self.margin.left + ',' + self.margin.top + ')')

      self.svg.append('g')
        .selectAll('g')
        .data(data)
        .join('g')
        .attr('transform', d => `translate(${self.x0(d[self.groupKey])},0)`)
        .selectAll('rect')
        .data(d => self.keys.map(key => ({key, value: d[key]})))
        .join('rect')
        .attr('x', d => self.x1(d.key))
        .attr('y', d => self.y(d.value))
        .attr('width', self.x1.bandwidth())
        .attr('height', d => self.y(0) - self.y(d.value))
        .attr('fill', d => self.color(d.key))

      self.svg.append('g')
        .call(self.xAxis)

      self.svg.append('g')
        .call(self.yAxis)

      self.legend = svg => {
        const g = svg
          .attr('transform', `translate(${self.width},0)`)
          .attr('text-anchor', 'end')
          .attr('font-family', 'sans-serif')
          .attr('font-size', 10)
          .selectAll('g')
          .data(self.color.domain().slice().reverse())
          .join('g')
          .attr('transform', (d, i) => `translate(0,${i * 20})`)

        g.append('rect')
          .attr('x', -19)
          .attr('width', 19)
          .attr('height', 19)
          .attr('fill', self.color)

        g.append('text')
          .attr('x', -24)
          .attr('y', 9.5)
          .attr('dy', '0.35em')
          .text(d => d)
      }

      self.svg.append('g')
        .call(self.legend)

      return self.svg.node()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .graphBar {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px;
  }

</style>
