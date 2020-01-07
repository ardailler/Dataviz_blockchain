<template>
  <div id="consommations_chart"></div>
</template>

<script>

import * as d3 from 'd3'
const csvTransactions = require('@/assets/data/n-transactions.csv')
const csvBlocks = require('@/assets/data/n-transactions-per-block.csv')

export default {
  name: 'ConsommationsChart',
  props: {
  },
  data () {
    return {
      width: 500,
      height: 500,
      correctionPadding: 20,
      padding: {
        top: 20,
        right: 60,
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
        },
        blocks: {
          data: null,
          dataTransform: null,
          maxValue: null,
          listDate: null
        }
      },
      x: null,
      y: null,
      y2: null,
      monthNames: ['Jan', 'Freb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      space: 25,
      line: null,
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }
  },
  mounted () {
    let self = this
    setTimeout(function () {
      self.width = document.getElementById('consommations_chart').offsetWidth
      self.height = document.getElementById('consommations_chart').offsetHeight
    }, 50)

    window.addEventListener('resize', self.handleWindowResize)
    self.loadData('Days') // Years / Months / Days
    setTimeout(function () {
      self.initGraph()
    }, 1000)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  components: {
  },
  computed: {
  },
  methods: {
    handleWindowResize (event) {
      let self = this
      setTimeout(function () {
        d3.select('.svg-consommation')
          .attr('width', 0)
          .attr('height', 0)

        self.width = document.getElementById('consommations_chart').offsetWidth
        self.height = (document.getElementById('consommations_chart').offsetHeight)

        self.svg.select('.y-axe').remove()
        self.svg.select('.y-axe2').remove()
        self.svg.select('.x-axe').remove()

        self.drawYAxe()
        self.drawXAxe()

        d3.select('.svg-consommation')
          .attr('width', self.width)
          .attr('height', self.height)

        d3.select('.svg-consommation-g')
          .attr('transform', 'translate(0, 0)')
        d3.select('.graph-path-0')
          .attr('transform', 'translate(' + self.padding.left + ',' + self.padding.top + ')')
          .attr('d', d3.line()
            .x((d) => { return self.x(d.date) })
            .y((d) => { return self.y(d.value) })
          )
        d3.select('.graph-path-1')
          .attr('transform', 'translate(' + self.padding.left + ',' + self.padding.top + ')')
          .attr('d', d3.line()
            .x((d) => { return self.x(d.date) })
            .y((d) => { return self.y2(d.value) })
          )
      }, 500)
    },
    // fonction qui charge et met en forme les données
    loadData (type) { // Years, Months, Days
      let self = this
      // load data from transactions
      d3.csv(csvTransactions).then(function (transactions) {
        self.data.transactions.data = self.groupByTime(transactions, type) // Years, Months, Days
        self.data.transactions.dataTransform = self.formaterDate(self.data.transactions.data.children)
        self.data.transactions.maxValue = Math.max(...self.data.transactions.dataTransform.map(function (el) { return el.value }))
        self.data.transactions.listDate = self.data.transactions.dataTransform.map(function (el) { return el.date })
      })
      // load data from transaction per block
      d3.csv(csvBlocks).then(function (block) {
        self.data.blocks.data = self.groupByTime(block, type) // Years, Months, Days
        self.data.blocks.dataTransform = self.formaterDate(self.data.blocks.data.children)
        self.data.blocks.maxValue = Math.max(...self.data.blocks.dataTransform.map(function (el) { return el.value }))
        self.data.blocks.listDate = self.data.blocks.dataTransform.map(function (el) { return el.date })
      })
    },
    drawYAxe () {
      let self = this
      // Add Y axis
      self.y = d3.scaleLinear()
        .domain([0, self.data.transactions.maxValue])
        .range([(self.height - self.padding.bottom - self.padding.top), 0])
      self.svg.append('g')
        .attr('class', 'y-axe')
        .attr('transform', 'translate(' + self.padding.left + ',' + self.padding.top + ')')
        .call(d3.axisLeft(self.y))

      // Add Y2 axis
      self.y2 = d3.scaleLinear()
        .domain([0, self.data.blocks.maxValue])
        .range([(self.height - self.padding.bottom - self.padding.top), 0])
      self.svg.append('g')
        .attr('class', 'y-axe2')
        .attr('transform', 'translate(' + (self.width - self.padding.right) + ',' + self.padding.top + ')')
        .call(d3.axisRight(self.y2))
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
      self.svg = d3.select('#consommations_chart')
        .append('svg')
        .attr('class', 'svg-consommation')
        .style('font', '10px sans-serif')
        .attr('width', self.width)
        .attr('height', self.height)
      self.svg
        .append('line')
        .attr('class', 'line-pos')
        .style('stroke', 'black')
        .attr('x1', 10 + self.padding.left)
        .attr('y1', 0)
        .attr('x2', 10 + self.padding.left)
        .attr('y2', self.height - self.padding.bottom)
      self.svg.on('mouseenter', function () {
        self.updateLinePos()
      }).on('mousemove', function () {
        self.updateLinePos()
        if ((d3.event.pageX - self.correctionPadding) >= self.padding.left && (d3.event.pageX - self.correctionPadding) <= (self.width - self.padding.right)) {
          let year = self.x.invert(d3.mouse(this)[0] - (self.padding.left - 1))
          console.log('year : ', year)
        }
      })
      d3.select('.svg-consommation')
        .append('g')
        .attr('class', 'svg-consommation-g')
        .attr('transform', 'translate(0, 0)')

      self.maxValue = self.data.transactions.maxValue
      self.listDate = self.data.transactions.listDate
      let listOfData = [self.data.transactions.dataTransform, self.data.blocks.dataTransform]
      let indexAxis = [0, 1]

      self.drawYAxe()
      self.drawXAxe()

      self.drawGraph(listOfData, indexAxis)
    },
    updateLinePos () {
      let self = this
      if ((d3.event.pageX - self.correctionPadding) < self.padding.left) {
        self.svg.select('.line-pos')
          .attr('x1', self.padding.left)
          .attr('y1', self.padding.top)
          .attr('x2', self.padding.left)
          .attr('y2', self.height - self.padding.bottom)
      } else if ((d3.event.pageX - self.correctionPadding) > (self.width - self.padding.right)) {
        self.svg.select('.line-pos')
          .attr('x1', (self.width - self.padding.right))
          .attr('y1', self.padding.top)
          .attr('x2', (self.width - self.padding.right))
          .attr('y2', self.height - self.padding.bottom)
      } else if ((d3.event.pageX - self.correctionPadding) >= self.padding.left && (d3.event.pageX - self.correctionPadding) <= (self.width - self.padding.right)) {
        self.svg.select('.line-pos')
          .attr('x1', (d3.event.pageX - self.correctionPadding))
          .attr('y1', self.padding.top)
          .attr('x2', (d3.event.pageX - self.correctionPadding))
          .attr('y2', self.height - self.padding.bottom)
      }
    },
    drawGraph (listOfData, indexAxis) {
      let self = this
      // Add the line
      let arrayOfY = [self.y, self.y2]
      let arrayOfColors = ['#00324a', '#3383a9']
      for (let index = 0; index < listOfData.length; index++) {
        self.svg.append('path')
          .datum(listOfData[index])
          .attr('class', 'graph-path-' + index)
          .attr('fill', 'none')
          .attr('stroke', arrayOfColors[index])
          .attr('stroke-width', 1.5)
          .attr('transform', 'translate(' + self.padding.left + ',' + self.padding.top + ')')
          .attr('d', d3.line()
            .x((d) => {
              return self.x(d.date)
            })
            .y((d) => {
              return arrayOfY[indexAxis[index]](d.value)
            })
          )
      }
      return self.svg.node()
    },
    formaterDate (d) {
      return d.map((el) => { return { date: new Date(el.name), value: parseFloat(el.value) } })
    },
    // function to clear and refactor data
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

<style scoped>
  #consommations_chart {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
