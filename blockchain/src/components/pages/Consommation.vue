<template>
  <div class='page-consommation'>
    <div id="consommations_graph">
      <div :class="getDataType">
        <ConsommationsChart></ConsommationsChart>
      </div>
    </div>
    <div id='transactions_graph'>
      <div :class="getDataType">
        <TransactionsChart></TransactionsChart>
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
    }
  },
  mounted () {
  },
  computed: {
    getDataType () {
      return this.$store.getters.allData.switchConso ? 'data' : 'energie'
    }
  },
  beforeDestroy () {
  },
  methods: {
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
