<template>
  <div class='page-consommation'>
    <div id="conso_numbers" :class="getDataType" class="row">
      <InfoSection>
        <p class="subtitle_2">Explication :</p>
        <p class="body_2">Cette page présente deux graphiques.</p>
        <p class="body_2">Le premier représente la consommation des données en Kwh ou en Mo du Bitcoin.
          Cette consommation est calculée à l'aide du nombre de transactions par jour, du nombre de transactions par blocks et de la consommation d'un block.</p>
        <p class="body_2">Le second représente le nombre de transactions par jour (en bleu foncé) et le nombre de transactions par blocks (en bleu).</p>
        <p class="body_2">Une transaction représente un flux de bitcoin entre deux <em>wallet</em> (comptes contenant des bitcoin).</p>
        <p class="body_2">Il est important de noter que le coût d'une transaction ne dépend pas de la somme qu'elle contient. Ainsi, une transaction de
          0.001 bitcoin (environ 8€) et de 10 bitcoin (environ 80 000€) auront la même consommation.</p>
      </InfoSection>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_1"><span class="cursor"></span>Date : <br>{{getDateCursor}}</p>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_1 transacts"><span class="cursor"></span>Transactions : <br>{{transactValue}} / jours</p>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_1 blocks"><span class="cursor"></span>Transactions : <br>{{blockValueRound}} / blocks</p>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_1 conso"><span class="cursor"></span>Consommation : <br>{{consoValueRound}} {{getConsoType}}</p>
    </div>
    <h6>Consommation en ressources</h6>
    <div id="consommations_graph">
      <div :class="getDataType">
        <ConsommationsChart ref="consoCharts" :typeGraph="getDataType"></ConsommationsChart>
      </div>
    </div>
    <h6>Quantité de transactions</h6>
    <div id='transactions_graph'>
      <div :class="getDataType">
        <TransactionsChart ref="transactCharts"></TransactionsChart>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionsChart from '@/components/elements/charts/TransactionsChart.vue'
import ConsommationsChart from '@/components/elements/charts/ConsommationsChart'
import InfoSection from '@/components/elements/InfoSection'

export default {
  name: 'Consommation',
  props: {
  },
  components: {
    ConsommationsChart,
    TransactionsChart,
    InfoSection
  },
  data () {
    return {
      consoDate: null,
      consoValue: null,
      transactDate: null,
      transactValue: null,
      blockValue: null,
      monthNames: ['Jan', 'Freb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    }
  },
  mounted () {
    let self = this
    self.updateConsoValues()
    self.updateTransctValues()
  },
  computed: {
    getDateCursor () {
      return this.consoDate ? this.consoDate.getDate() + '-' + this.monthNames[this.consoDate.getMonth()] + '-' + this.consoDate.getFullYear() : ''
    },
    getDataType () {
      return this.$store.getters.allData.switchConso ? 'data' : 'energie'
    },
    getConsoType () {
      return this.$store.getters.allData.switchConso ? 'Mo' : 'kWh'
    },
    blockValueRound () {
      return parseFloat(this.blockValue).toFixed(2)
    },
    consoValueRound () {
      return parseFloat(this.consoValue).toFixed(2)
    }
  },
  beforeDestroy () {
  },
  watch: {
    consoDate: function (val) {
      this.$refs.transactCharts.getData(val)
    },
    transactDate: function (val) {
      this.$refs.consoCharts.getData(val)
    }
  },
  methods: {
    updateConsoValues () {
      let self = this
      self.$watch(
        () => {
          return self.$refs.consoCharts.tooltipData
        },
        (val) => {
          self.consoValue = val
        }
      )
      self.$watch(
        () => {
          return self.$refs.consoCharts.cursorDate
        },
        (val) => {
          self.consoDate = val
        }
      )
    },
    updateTransctValues () {
      let self = this
      self.$watch(
        () => {
          return self.$refs.transactCharts.tooltipData
        },
        (val) => {
          self.transactValue = val
        }
      )
      self.$watch(
        () => {
          return self.$refs.transactCharts.tooltipData2
        },
        (val) => {
          self.blockValue = val
        }
      )
      self.$watch(
        () => {
          return self.$refs.transactCharts.cursorDate
        },
        (val) => {
          self.transactDate = val
        }
      )
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
    height: 100vh;
    background: white;
    padding-top: 64px;
  }

  h6 {
    min-height: 1.5%;
    max-height: 1.5%;
    height: 1.5%;
    font-size: 1.5vh;
    text-align: center;
  }

  #consommations_graph,
  #transactions_graph {
    position: relative;
    display: block;
    width: 100%;
    height: 42%;
    max-height: 42%;
    min-height: 42%;
    overflow: hidden;
    padding: 20px;
  }

  #conso_numbers {
    position: relative;
    width: 100%;
    height: 10%;
    max-height: 20%;
    min-height: 10%;
    /*overflow: hidden;*/
    padding: 20px 20px 0 20px;
    display: flex;
    align-items: center;
  }
  #conso_numbers > p {
    position: relative;
    padding-left: 10px;
    display: inline-table;
  }
  #conso_numbers > p > .cursor {
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: black;

    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;
  }

  #conso_numbers.energie > p.conso > .cursor {
    background-color: var(--color-primary)
  }
  #conso_numbers.energie > p.conso {
    color: var(--color-primary);
  }
  #conso_numbers.data > p.conso > .cursor {
    background-color: var(--color-secondary);
  }
  #conso_numbers.data > p.conso {
    color: var(--color-secondary);
  }
  #conso_numbers > p.transacts > .cursor {
    background-color: #00324a;
  }

  #conso_numbers > p.blocks > .cursor {
    background-color: #3383a9;
  }
  #conso_numbers > p.transacts {
    color: #00324a;
  }

  #conso_numbers > p.blocks {
    color: #3383a9;
  }

  #consommations_graph > div {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    border: 2px solid black;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    background-color: white;

    -webkit-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    -moz-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  #consommations_graph > .energie {
    background-color: var(--color-primary);
    border: 2px solid var(--color-primary);
  }
  #consommations_graph > .data {
    background-color: var(--color-secondary);
    border: 2px solid var(--color-secondary);
  }

  #transactions_graph > div {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    border: 2px solid black;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
  }

  #transactions_graph > .energie {
    border: 2px solid var(--color-primary);
  }
  #transactions_graph > .data {
    border: 2px solid var(--color-secondary);
  }
</style>
