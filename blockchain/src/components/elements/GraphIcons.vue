<template>
  <div :class="['graphIcons', color]" >
    <div v-for="(item, index) in getNumber" v-bind:key="(index+'-iconsG')" :class="['icons', name]" :style="'width: calc(100% / (' + getRatio + '));height: calc(100% / (' + getRatio + ' + 2));'"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
const csvTtConso = require('@/assets/data/total-consumption.csv')
const csvKwhbyType = require('@/assets/data/KwhbyType.csv')

export default {
  name: 'GraphIcons',
  props: {
    name: {
      type: String,
      default: 'Nucleaire'
    },
    year: {
      type: String,
      default: '2019'
    },
    color: {
      type: String,
      default: 'gray'
    }
  },
  data () {
    return {
      data: {
        icons: {
          data: null,
          dataTransform: null
        },
        annees: {
          data: null,
          dataTransform: null
        }
      },
      monthNames: ['Jan', 'Freb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
      consoYear: null,
      consoType: null,
      consoNumber: 0
    }
  },
  watch: {
    name: function (val) {
      this.calcGraph()
    },
    year: function (val) {
      this.calcGraph()
    }
  },
  mounted () {
    let self = this
    self.loadData('Years') // Years / Months / Days
    setTimeout(function () {
      self.calcGraph()
    }, 1000)
  },
  components: {
  },
  computed: {
    getNumber () {
      return parseInt(this.consoNumber) <= 1000 ? parseInt(this.consoNumber) : 1000
    },
    getRatio () {
      return Math.sqrt(this.getNumber)
    }
  },
  methods: {
    // fonction qui charge et met en forme les données
    loadData (type) { // Years, Months, Days
      let self = this
      // load data from transactions
      d3.csv(csvTtConso).then(function (annee) {
        self.data.annees.data = self.groupByTime(annee, type) // Years, Months, Days
        self.data.annees.dataTransform = self.formaterDate(self.data.annees.data.children)
      })
      d3.csv(csvKwhbyType).then(function (icon) {
        self.data.icons.data = self.groupByName(icon) // Years, Months, Days
      })
    },
    formaterDate (d) {
      return d.map((el) => { return { date: new Date(el.name), value: parseFloat(el.value) } })
    },
    calcGraph () {
      let self = this
      self.consoYear = self.data.annees.data.children.find(y => y.name === self.year)
      if (self.consoYear) {
        let type = self.data.icons.data.children.find(y => y.name === self.name)
        if (type) {
          self.consoType = type.children.find(y => new Date(y.name).getFullYear().toString() === self.year)
          if (self.consoType) {
            self.consoNumber = parseFloat(self.consoYear.value / parseFloat(self.consoType.value)).toFixed(2)
          }
        }
      }
    },
    // function to clear and refactor data
    groupByName (data) {
      let listByName = {
        'children': [],
        'name': 'kwhByType'
      } // Création de la liste par années
      data.forEach(d => {
        let _names = listByName.children // list des années
        let _name = _names.find(y => y.name === d.name) // Check si le nom exist
        if (!_name) { // Verification si l'objet de l'année courrante existe
          _names.push({
            'children': [],
            'name': d.name
          }) // Création d'un objet pour cette année
          _name = _names.find(y => y.name === d.name)
        }

        let _years = _name.children
        let _year = _years.find(m => m.name === d.date) // check si le mois existe
        if (!_year) { // Vérification si l'objet du mois exist pour ce mois
          _years.push({
            'value': d.nombre,
            'name': d.date
          }) // Création d'un objet pour ce mois
          _year = _years.find(m => m.name === d.date)
        }
      })
      return listByName
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
          _year['value'] = _year.children.map(item => { return parseFloat(item.value * 3) }).reduce((prev, curr) => prev + curr, 0)
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

        months = months.map(item => { return { 'name': new Date(item.name).toLocaleDateString('fr-FR', self.options), value: item.value * 3 } })
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .Eolienne {
    background: transparent url('../../assets/img/icons/eolienne.svg') no-repeat 50% 50% / contain;
  }
  .Nucleaire {
    background: transparent url('../../assets/img/icons/central.svg') no-repeat 50% 50% / contain;
  }
  .Barrage {
    background: transparent url('../../assets/img/icons/water-energy.svg') no-repeat 50% 50% / contain;
  }
  .Solaire {
    background: transparent url('../../assets/img/icons/solar.svg') no-repeat 50% 50% / contain;
  }
  .Charbon {
    background: transparent url('../../assets/img/icons/coal.svg') no-repeat 50% 50% / contain;
  }
  .Aspirateur {
    background: transparent url('../../assets/img/icons/housework.svg') no-repeat 50% 50% / contain;
  }
  .Frigo {
    background: transparent url('../../assets/img/icons/kitchen.svg') no-repeat 50% 50% / contain;
  }
  .Ordinateur {
    background: transparent url('../../assets/img/icons/laptop.svg') no-repeat 50% 50% / contain;
  }
  .Ampoule {
    background: transparent url('../../assets/img/icons/light.svg') no-repeat 50% 50% / contain;
  }
  .Personne {
    background: transparent url('../../assets/img/icons/man.svg') no-repeat 50% 50% / contain;
  }
  .Four {
    background: transparent url('../../assets/img/icons/oven.svg') no-repeat 50% 50% / contain;
  }
  .Telephone {
    background: transparent url('../../assets/img/icons/smartphone.svg') no-repeat 50% 50% / contain;
  }
  .TV {
    background: transparent url('../../assets/img/icons/tv.svg') no-repeat 50% 50% / contain;
  }
  .Washer {
    background: transparent url('../../assets/img/icons/washer.svg') no-repeat 50% 50% / contain;
  }

  .graphIcons {
    position: relative;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: calc(100vh - 248px);
    padding: 10px;
    background-color: lightgrey;

    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
  }

  .graphIcons.energie {
    background-color: var(--color-primary);
  }

  .graphIcons.data {
    background-color: var(--color-secondary);
  }

  .graphIcons .icons {
    position: relative;
    display: block;
  }

  @media only screen and (min-width: 768px) {
  }

</style>
