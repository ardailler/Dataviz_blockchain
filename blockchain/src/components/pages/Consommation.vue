<template>
  <div class='page-consommation'>
    <div id='consommation_graph'></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
const csvTransactions = require('@/assets/data/n-transactions.csv')

export default {
  name: 'Consommation',
  props: {
  },
  data () {
    return {
      width: 500,
      height: 500,
      margin: {
        top: 10,
        right: 100,
        bottom: 100,
        left: 30
      },
      svg: null,
      data: null,
      x: null,
      y: null,
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      space: 25,
      line: null
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
      let self = this
      self.svg = d3.select('#consommation_graph')
        .append('svg')
        .style('font', '10px sans-serif')
        .attr('width', self.width + self.margin.left + self.margin.right)
        .attr('height', self.height + self.margin.top + self.margin.bottom)
        .append('g')
        .attr('transform',
          'translate(' + self.margin.left + ',' + self.margin.top + ')')
    },
    drawGraph () {
      let self = this
      d3.csv(csvTransactions).then(function (transactions) {
        self.data = self.groupByTime(transactions)

        // let scaleSize = self.data.length * self.space

        let maxValue = Math.max(...self.data.children.map(function (el) { return el.value }))

        let listDate = transactions.map(function (el) { return new Date(el.date) })

        // Add X axis
        self.x = d3.scaleTime()
          .domain(d3.extent(listDate))
          .range([0, self.width])
        self.svg.append('g')
          .attr('transform', 'translate(50,' + self.height + ')')
          .call(d3.axisBottom(self.x)
            .tickFormat(d3.timeFormat('%d-%m-%Y'))
          )
          .selectAll('text')
          .style('text-anchor', 'end')
          .attr('transform', 'rotate(-45)')
          .attr('y', 5)
          .attr('x', -10)

        // Add Y axis
        self.y = d3.scaleLinear()
          .domain([0, maxValue]) // reverse() inverse l'ordre des éléments pour que l'affichage se fasse dans le bon ordre en x : testez sans pour voir ce qui se passe.
          .range([self.height, 0])
        self.svg.append('g')
          .attr('transform', 'translate(50,0)')
          .call(d3.axisLeft(self.y))

        // Add the lines
        /* self.line = d3.line()
          .x(function(d) { return x(+d.time) })
          .y(function(d) { return y(+d.value) })
        self.svg.selectAll("myLines")
          .data(dataReady)
          .enter()
          .append("path")
          .attr("d", function(d){ return line(d.values) } )
          .attr("stroke", function(d){ return myColor(d.name) })
          .style("stroke-width", 4)
          .style("fill", "none") */

        // let colorRange = d3.scaleLinear().domain([0, 0.5]).range(['#F4A812', '#FFED42'])

        return self.svg.node()
      })
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
        // _month['somme'] = _month
        _month['value'] = _month.children.map(item => { return parseFloat(item.value) }).reduce((prev, curr) => prev + curr, 0)
        _year['value'] = _year.children.map(item => { return parseFloat(item.value) }).reduce((prev, curr) => prev + curr, 0)
      })
      return listByYear
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
    padding-top: 64px;
  }

</style>
