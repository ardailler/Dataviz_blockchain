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
      monthNames: ['Jan', 'Freb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      space: 25,
      line: null,
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
      options2: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
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
        self.data = self.groupByTime(transactions, 'Days') // Years, Months, Days
        // let scaleSize = self.data.length * self.space

        transactions = self.formaterDate(self.data.children)
        let maxValue = Math.max(...transactions.map(function (el) { return el.value }))

        let listDate = transactions.map(function (el) { return el.date })
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

        // Add the line
        self.svg.append('path')
          .datum(transactions)
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1.5)
          .attr('transform', 'translate(50,0)')
          .attr('d', d3.line()
            .x((d) => { return self.x(d.date) })
            .y((d) => { console.log(d); return self.y(d.value) })
          )

        // let colorRange = d3.scaleLinear().domain([0, 0.5]).range(['#F4A812', '#FFED42'])

        return self.svg.node()
      })
    },
    formaterDate (d) {
      return d.map((el) => { return { date: new Date(el.name), value: parseFloat(el.value) } })
    },
    groupByTime (data, time) {
      let listByTime = {
        'children': [],
        'name': 'transactions'
      } // Création de la liste par années
      if (time !== 'Days') {
        data.forEach(d => {
          let _date = new Date(d.date) // creation d'un objet date à partir de la date de la donnée
          let _years = listByTime.children // list des années
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
      }
      if (time === 'Years') {
        listByTime.children.map(item => { delete item['children'] })
      } else if (time === 'Months') {
        let months = listByTime.children.map(item => { return item.children.map(child => { child['name'] = child.name + '-' + item.name; return {'name': child.name, 'value': child.value} }) })
        months = months.flat()

        months = months.sort(function (a, b) {
          let keyA = new Date(a.name)
          let keyB = new Date(b.name)
          // Compare the 2 dates
          if (keyA < keyB) return -1
          if (keyA > keyB) return 1
          return 0
        })

        months = months.map(item => { return { 'name': new Date(item.name).toLocaleDateString('fr-FR', self.options), value: item.value } })
        listByTime['children'] = months
      } else if (time === 'Days') {
        data = data.sort(function (a, b) {
          let keyA = new Date(a.date)
          let keyB = new Date(b.date)
          // Compare the 2 dates
          if (keyA < keyB) return -1
          if (keyA > keyB) return 1
          return 0
        })

        data = data.map(item => { return { 'name': new Date(item.date), value: parseFloat(item.nombre) } })
        listByTime['children'] = data
      }
      return listByTime
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
