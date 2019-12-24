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
      padding: {
        top: 10,
        right: 10,
        bottom: 55,
        left: 60
      },
      svg: null,
      data: {
        transactions: {
          data: null,
          dataTransform: null,
          maxValue: null,
          listDate: null
        }
      },
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
    window.addEventListener('resize', this.handleWindowResize)
    this.loadData('Years').then(function () {
    }) // Years, Months, Days
    let self = this
    setTimeout(function () {
      self.initGraph()
    }, 1000)
  },
  computed: {
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    handleWindowResize (event) {
      let self = this
      self.width = event.currentTarget.innerWidth - 100
      self.height = (event.currentTarget.innerHeight - 100)

      d3.select('.y-axe').remove()
      d3.select('.x-axe').remove()

      self.drawYAxe()
      self.drawXAxe()

      d3.select('.svg-consommation')
        .attr('width', self.width)
        .attr('height', self.height)

      d3.select('.svg-consommation-g')
        .attr('transform', 'translate(0, 0)')
      d3.select('.graph-path')
        .attr('transform', 'translate(' + self.padding.left + ',0)')
        .attr('d', d3.line()
          .x((d) => { return self.x(d.date) })
          .y((d) => { return self.y(d.value) })
        )
      // self.svg
    },
    async loadData (type) { // Years, Months, Days
      let self = this
      d3.csv(csvTransactions).then(function (transactions) {
        self.data.transactions.data = self.groupByTime(transactions, type) // Years, Months, Days
        self.data.transactions.dataTransform = self.formaterDate(self.data.transactions.data.children)
        self.data.transactions.maxValue = Math.max(...self.data.transactions.dataTransform.map(function (el) { return el.value }))
        self.data.transactions.listDate = self.data.transactions.dataTransform.map(function (el) { return el.date })
      })
    },
    drawYAxe () {
      let self = this
      // Add Y axis
      self.y = d3.scaleLinear()
        .domain([0, self.maxValue]) // reverse() inverse l'ordre des éléments pour que l'affichage se fasse dans le bon ordre en x : testez sans pour voir ce qui se passe.
        .range([(self.height - self.padding.bottom), 0])
      self.svg.append('g')
        .attr('class', 'y-axe')
        .attr('transform', 'translate(' + self.padding.left + ',0)')
        .call(d3.axisLeft(self.y))
    },
    drawXAxe () {
      let self = this
      // Add X axis
      self.x = d3.scaleTime()
        .domain(d3.extent(self.listDate))
        .range([0, (self.width - self.padding.left - self.padding.right)])

      self.svg.append('g')
        .attr('class', 'x-axe')
        .attr('transform', 'translate(' + self.padding.left + ',' + (self.height - self.padding.bottom) + ')')
        .call(d3.axisBottom(self.x)
          .tickFormat(d3.timeFormat('%d-%m-%Y'))
        )
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-45)')
        .attr('y', 5)
        .attr('x', -10)
    },
    initGraph () {
      let self = this
      self.svg = d3.select('#consommation_graph')
        .append('svg')
        .attr('class', 'svg-consommation')
        .style('font', '10px sans-serif')
        .attr('width', self.width)
        .attr('height', self.height)
        .append('g')
        .attr('class', 'svg-consommation-g')
        .attr('transform', 'translate(0, 0)')

      self.maxValue = self.data.transactions.maxValue
      self.listDate = self.data.transactions.listDate
      let transactions = self.data.transactions.dataTransform

      self.drawYAxe()
      self.drawXAxe()

      self.drawGraph(transactions)
    },
    drawGraph (transactions) {
      let self = this
      // Add the line
      self.svg.append('path')
        .datum(transactions)
        .attr('class', 'graph-path')
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('transform', 'translate(' + self.padding.left + ',0)')
        .attr('d', d3.line()
          .x((d) => { return self.x(d.date) })
          .y((d) => { return self.y(d.value) })
        )
      return self.svg.node()
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
