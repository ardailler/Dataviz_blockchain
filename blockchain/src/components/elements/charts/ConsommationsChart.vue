<template>
  <div id="consommations_chart">
  </div>
</template>

<script>

import * as d3 from 'd3'
const csvAvgConsommation = require('@/assets/data/avg-consommation-per-day.csv')
const csvAvgConsommationNrg = require('@/assets/data/avg-consommation-per-day-nrg.csv')

export default {
  name: 'ConsommationsChart',
  props: {
    typeGraph: {
      type: String,
      default: 'data'
    }
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
        consommations: {
          data: null,
          dataTransform: null,
          maxValue: null,
          listDate: null
        }
      },
      x: null,
      y: null,
      tooltipData: null,
      cursorDate: null,
      monthNames: ['Jan', 'Freb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
      posCurseur: 0,
      intervale: null,
      intervale1: null
    }
  },
  mounted () {
    let self = this
    self.intervale = setTimeout(function () {
      self.width = document.getElementById('consommations_chart').offsetWidth
      self.height = document.getElementById('consommations_chart').offsetHeight
    }, 50)

    window.addEventListener('resize', self.handleWindowResize)
    self.loadData('Days', self.typeGraph === 'data' ? csvAvgConsommation : csvAvgConsommationNrg) // Years / Months / Days
    self.intervale1 = setTimeout(function () {
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
  watch: {
    typeGraph: function (newVal, oldVal) { // watch it
      let self = this
      if (self.svg) {
        self.svg.remove()
      }
      self.svg = null
      self.loadData('Days', newVal === 'data' ? csvAvgConsommation : csvAvgConsommationNrg) // Years / Months / Days
      clearInterval(self.intervale1)
      self.intervale1 = setTimeout(function () {
        self.initGraph()
      }, 1000)
    }
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
      }, 500)
    },
    // fonction qui charge et met en forme les données
    loadData (type, data) { // Years, Months, Days
      let self = this
      // load data from transactions
      d3.csv(data).then(function (consommation) {
        self.data.consommations.data = self.groupByTime(consommation, type) // Years, Months, Days
        self.data.consommations.dataTransform = self.formaterDate(self.data.consommations.data.children)
        self.data.consommations.maxValue = Math.max(...self.data.consommations.dataTransform.map(function (el) { return el.value }))
        self.data.consommations.listDate = self.data.consommations.dataTransform.map(function (el) { return el.date })
      })
    },
    drawYAxe () {
      let self = this
      // Add Y axis
      self.y = d3.scaleLinear()
        .domain([0, self.data.consommations.maxValue])
        .range([(self.height - self.padding.bottom - self.padding.top), 0])
      self.svg.append('g')
        .attr('class', 'y-axe')
        .attr('transform', 'translate(' + self.padding.left + ',' + self.padding.top + ')')
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
      self.tooltip = d3.select('#tooltip')
      self.svg.on('mouseenter', function () {
        self.updateLinePos()
      }).on('mousemove', function () {
        self.updateLinePos()
        if ((d3.event.pageX - self.correctionPadding) >= self.padding.left + 1 && (d3.event.pageX - self.correctionPadding) <= (self.width - self.padding.right)) {
          let year = self.x.invert(d3.mouse(this)[0] - (self.padding.left - 1))
          self.getData(year)
        }
      })
      d3.select('.svg-consommation')
        .append('g')
        .attr('class', 'svg-consommation-g')
        .attr('transform', 'translate(0, 0)')

      self.maxValue = self.data.consommations.maxValue
      self.listDate = self.data.consommations.listDate

      self.drawYAxe()
      self.drawXAxe()

      self.drawGraph(self.data.consommations.dataTransform)
    },
    getData (year) {
      let self = this
      let time = year.getDate() + '-' + self.monthNames[year.getMonth()] + '-' + year.getFullYear()
      let data = self.data.consommations.dataTransform
      let curanteValue = data.find(h => (h.date.getDate() + '-' + self.monthNames[h.date.getMonth()] + '-' + h.date.getFullYear()) === time)
      self.cursorDate = year
      self.tooltipData = curanteValue ? curanteValue.value : self.tooltipData
    },
    updateLinePos () {
      let self = this
      if ((d3.event.pageX - self.correctionPadding) < self.padding.left) {
        self.posCurseur = d3.event.pageX
        d3.selectAll('.line-pos')
          .attr('x1', self.padding.left)
          .attr('y1', self.padding.top)
          .attr('x2', self.padding.left)
          .attr('y2', self.height - self.padding.bottom)
      } else if ((d3.event.pageX - self.correctionPadding) > (self.width - self.padding.right)) {
        self.posCurseur = d3.event.pageX
        d3.selectAll('.line-pos')
          .attr('x1', (self.width - self.padding.right))
          .attr('y1', self.padding.top)
          .attr('x2', (self.width - self.padding.right))
          .attr('y2', self.height - self.padding.bottom)
      } else if ((d3.event.pageX - self.correctionPadding) >= self.padding.left && (d3.event.pageX - self.correctionPadding) <= (self.width - self.padding.right)) {
        self.posCurseur = d3.event.pageX
        d3.selectAll('.line-pos')
          .attr('x1', (d3.event.pageX - self.correctionPadding))
          .attr('y1', self.padding.top)
          .attr('x2', (d3.event.pageX - self.correctionPadding))
          .attr('y2', self.height - self.padding.bottom)
      }
    },
    drawGraph (data) {
      let self = this
      // Add the line
      self.svg.append('path')
        .datum(data)
        .attr('class', 'graph-path-0')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 1.5)
        .attr('transform', 'translate(' + self.padding.left + ',' + self.padding.top + ')')
        .attr('d', d3.line()
          .x((d) => {
            return self.x(d.date)
          })
          .y((d) => {
            return self.y(d.value)
          })
        )
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

          if (!_year) { // Verification si l'objet de l'année courante existe
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
