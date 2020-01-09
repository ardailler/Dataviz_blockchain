<template>
  <div class='page-consommation'>
    <div id="conso_numbers" :class="getDataType" class="row">
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_1"><span class="cursor"></span>Date : <br>{{getDateCursor}}</p>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_1 transacts"><span class="cursor"></span>Transactions : <br>{{transactValue}} / jours</p>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_1 blocks"><span class="cursor"></span>Transactions : <br>{{blockValueRound}} / blocks</p>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_1 conso"><span class="cursor"></span>Consommation : <br>{{consoValueRound}} {{getConsoType}}</p>
    </div>
    <div id="consommations_graph">
      <div :class="getDataType">
        <ConsommationsChart ref="consoCharts" :typeGraph="getDataType"></ConsommationsChart>
      </div>
    </div>
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

export default {
  name: 'Consommation',
  props: {
  },
  components: {
    ConsommationsChart,
    TransactionsChart
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
      return this.$store.getters.allData.switchConso ? 'Mo' : 'Kwh'
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

  #consommations_graph,
  #transactions_graph {
    position: relative;
    display: block;
    width: 100%;
    height: 45%;
    max-height: 45%;
    min-height: 45%;
    overflow: hidden;
    padding: 20px;
  }

  #conso_numbers {
    position: relative;
    width: 100%;
    height: 10%;
    max-height: 10%;
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
