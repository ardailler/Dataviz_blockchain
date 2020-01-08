<template>
  <div class='page-consommation'>
    <div>{{consoValue}}</div>
    <div>{{transactValue}}</div>
    <div id="consommations_graph">
      <div :class="getDataType">
        <ConsommationsChart ref="consoCharts"></ConsommationsChart>
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
      transactValue: null
    }
  },
  mounted () {
    let self = this
    self.updateConsoValues()
    self.updateTransctValues()
  },
  computed: {
    getDataType () {
      return this.$store.getters.allData.switchConso ? 'data' : 'energie'
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
    height: 100%;
    background: white;
    padding-top: 64px;
  }
  #consommations_graph,
  #transactions_graph {
    position: relative;
    display: block;
    width: 100%;
    height: 50%;
    max-height: 50%;
    min-height: 50%;
    overflow: hidden;
    padding: 20px;
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
