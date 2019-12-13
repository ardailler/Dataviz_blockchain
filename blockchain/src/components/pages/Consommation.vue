<template>
  <div class='page-consommation'>
    <div id='sunburst'></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
const csvTransactions = require('@/assets/data/avg-consommation-per-day.csv')

export default {
  name: 'Consommation',
  props: {
  },
  data () {
    return {
      width: 700,
      height: 700,
      svg: null,
      data: null,
      radius: 1,
      color: null,
      format: d3.format(',d'),
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      arc: null,
      part: null,
      g: null,
      path: null,
      prnt: null,
      label: null
    }
  },
  mounted () {
    this.getRadius()
    this.getArc()
    this.initGraph()
    this.drawGraph()
  },
  computed: {
  },
  methods: {
    getRadius () {
      this.radius = this.width / 6
    },
    initGraph () {
      let _self = this
      _self.svg = d3.select('#sunburst')
        .append('svg')
        .attr('viewBox', [0, 0, _self.width, _self.width])
        .style('font', '10px sans-serif')
        .attr('width', _self.width)
        .attr('height', _self.height)
    },
    drawGraph () {
      let self = this
      d3.csv(csvTransactions).then(function (transactions) {
        self.data = self.groupByTime(transactions)

        let colorRange = d3.scaleLinear().domain([0, 0.5]).range(['#F4A812', '#FFED42'])

        self.color = d3.scaleOrdinal(d3.quantize(colorRange, self.data.children.length + 1))
        // color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
        // data = transactions
        self.part = self.partition(self.data)

        self.part.each(d => { d.current = d }) // ajout des {}

        self.g = self.svg.append('g')
          .attr('transform', `translate(${self.width / 2},${self.width / 2})`)

        self.path = self.g.append('g')
          .selectAll('path')
          .data(self.part.descendants().slice(1))
          .join('path')
          .attr('fill', d => {
            while (d.depth > 1) {
              d = d.parent
            }
            return self.color(d.data.name)
          })
          .attr('fill-opacity', d => self.arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
          .attr('d', d => self.arc(d.current))

        self.path.filter(d => d.children)
          .style('cursor', 'pointer')
          .on('click', self.clicked)

        self.path.append('title')
          .text(d => `${d.ancestors().map(d => { return d.data.name }).reverse().join('/')}\n${self.format(d.value)}`)

        self.label = self.g.append('g')
          .attr('pointer-events', 'none')
          .attr('text-anchor', 'middle')
          .style('user-select', 'none')
          .selectAll('text')
          .data(self.part.descendants().slice(1))
          .join('text')
          .attr('dy', '0.35em')
          .attr('fill-opacity', d => +self.labelVisible(d.current))
          .attr('transform', d => self.labelTransform(d.current))
          .text(d => { return d.data.name })

        self.prnt = self.g.append('circle')
          .datum(self.part)
          .attr('r', self.radius)
          .attr('fill', 'none')
          .attr('pointer-events', 'all')
          .on('click', self.clicked)

        return self.svg.node()
      })
    },
    clicked (p) {
      let self = this
      self.prnt.datum(p.parent || self.part)

      self.part.each(d => {
        d.target = {
          x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
          y0: Math.max(0, d.y0 - p.depth),
          y1: Math.max(0, d.y1 - p.depth)
        }
      })

      const t = self.g.transition().duration(750)

      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
      self.path.transition(t)
        .tween('data', d => {
          const i = d3.interpolate(d.current, d.target)
          return t => { d.current = i(t) }
        })
        .filter(function (d) {
          return +this.getAttribute('fill-opacity') || self.arcVisible(d.target)
        })
        .attr('fill-opacity', d => self.arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attrTween('d', d => () => self.arc(d.current))

      self.label.filter(function (d) {
        return +this.getAttribute('fill-opacity') || self.labelVisible(d.target)
      }).transition(t)
        .attr('fill-opacity', d => +self.labelVisible(d.target))
        .attrTween('transform', d => () => self.labelTransform(d.current))
    },
    arcVisible (d) {
      return d.y1 <= 2 && d.y0 >= 1 && d.x1 > d.x0
    },
    labelVisible (d) {
      return d.y1 <= 2 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03
    },
    labelTransform (d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI
      const y = (d.y0 + d.y1) / 2 * this.radius
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
    },
    groupByTime (data) {
      let listByYear = {
        'children': [],
        'name': 'transactions'
      } // Création de la liste par années
      data.forEach(d => {
        let _date = new Date(d.date) // creation d'un objet date à partir de la date de la donnée
        let _years = listByYear.children // list des années
        let _yearName = _date.getFullYear().toString() // nom de l'année
        let _year = _years.find(y => y.name === _yearName) // Check si l'année exist

        if (!_year) { // Verification si l'objet de l'année courrante existe
          _years.push({
            'children': [],
            'name': _yearName
          }) // Création d'un objet pour cette année
          _year = _years.find(y => y.name === _yearName)
        }

        let _months = _year.children
        let _monthName = this.monthNames[_date.getUTCMonth().toString()] // Nom du mois
        let _month = _months.find(m => m.name === _monthName) // check si le mois existe

        if (!_month) { // Vérification si l'objet du mois exist pour ce mois
          _months.push({
            'children': [],
            'name': _monthName
          }) // Création d'un objet pour ce mois
          _month = _months.find(m => m.name === _monthName)
        }
        _month.children.push({
          'value': d.nombre,
          'name': _date.getDate()
        }) // ajout de la donnée
      })
      return listByYear
    },
    partition (data) {
      const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value)
      return d3.partition()
        .size([2 * Math.PI, root.height + 1])(root)
    },
    getArc () {
      let self = this
      self.arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(self.radius * 1.5)
        .innerRadius(d => d.y0 * self.radius)
        .outerRadius(d => Math.max(d.y0 * self.radius, d.y1 * self.radius - 1))
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
    background: coral;
  }

</style>
