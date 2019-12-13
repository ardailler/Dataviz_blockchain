<template>
  <div class='page-consommation'>
    <div id='sunburst'></div>
  </div>
</template>

<script>
import * as d3 from 'd3'

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
      arc: null
    }
  },
  mounted () {
    this.getRadius()
    this.getArc()
    this.initGraph()
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
