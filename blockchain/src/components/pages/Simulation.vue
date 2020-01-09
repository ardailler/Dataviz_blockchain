<template>
  <div class='page-consommation'>
    <div id="calcul_value"  class="row">
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_2 ex"><span class="cursor"></span>Taux de Hachage : <input v-model="glob_hash" type="number" placeholder="Hachage en Thash/s "></p>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_2 ex"><span class="cursor"></span>Hachage personnel : <input v-model="own_hash" type="number" placeholder="Hachage en Thash/s "></p>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_2 ex"><span class="cursor"></span>Taux Bitcoin :  <input v-model="taux" type="number" placeholder="prix d'un kWh"> </p>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_2 ex"><span class="cursor"></span>Prix Electricité :  <input v-model="prix" type="number" placeholder="prix d'un kWh"> </p>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_2 ex2"><span class="cursor"></span>Consommation machine :  <input v-model="own_cons" type="number" placeholder="prix d'un kWh"> </p>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_2 ex2"><span class="cursor"></span>Gain bloc  <input v-model="gain" type="number" placeholder="gain moyen pour un bloc en BT"> </p>
      <p class="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_2 ex2"><span class="cursor"></span>Temps bloc :  <input v-model="own_cons" type="number" placeholder="Nombre bloc découvert par heure"> </p>
      <p class ="col-xs-3 col-s-3 col-m-3 col-l-3 col-3 subtitle_2 ex2"><button @click="greet">Estimer</button> </p>
</div>
<div class="row">
<div class = "col-xs-12 col-s-12 col-m-12 col-l-12 col-12">
     <table>
  <tr>
    <td>&nbsp;</td>
    <td>1 heure</td>
    <td>1 jour</td>
    <td>1 semaine</td>
    <td>1 moi</td>
  </tr>
  <tr>
    <td>Cout consommation d'energies</td>
    <td>{{one_hour_consumption}}€</td>
    <td>{{one_hour_consumption*24}}€</td>
    <td>{{one_hour_consumption*168}}€</td>
    <td>{{one_hour_consumption*730}}€</td>
  </tr>
  <tr>
    <td>Gain de Bitcoin en euros</td>
    <td>{{one_hour_gain}}€</td>
    <td>{{one_hour_gain*24}}€</td>
    <td>{{one_hour_gain*168}}€</td>
    <td>{{one_hour_gain*730}}€</td>
  </tr>
  <tr>
    <td>Benefice  en euros</td>
    <td>{{one_hour_benefit}}€</td>
    <td>{{one_hour_benefit*24}}€</td>
    <td>{{one_hour_benefit*168}}€</td>
    <td>{{one_hour_benefit*730}}€</td>
  </tr>
</table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Simulation',
  data () {
    return {
      glob_hash: 107698810.68229385,
      own_hash: 50,
      taux: 7181.96,
      prix: 0.0467,
      gain: 13,
      own_cons: 1.375,
      one_hour_benefit: 0,
      one_hour_gain: 0,
      one_hour_consumption: 0
    }
  },
  mounted () {
    this.greet()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    greet () {
      let blocktime = 6
      let blockreward = 12.5
      this.one_hour_consumption = Number.parseFloat(this.prix * this.own_cons).toFixed(2)
      this.one_hour_gain = Number.parseFloat((this.own_hash / this.glob_hash) * (blockreward * blocktime) * this.taux).toFixed(2)
      this.one_hour_benefit = Number.parseFloat(this.one_hour_gain - this.one_hour_consumption).toFixed(2)
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

  table {
  margin-top:5%;
  font-family: "Muli SemiBold", sans-serif;
  font-size: 1.333em;
  margin : auto auto;
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

.ex{
  text-align : center;
  padding-top : 8%;
  padding-bottom : 1%;
  }

.ex2{
  text-align : center;
  padding-top : 1%;
  padding-bottom : 10%;
  }

td {
  background-color: #f9f9f9;
}

td {
  min-width: 120px;
  padding: 10px 20px;
}

</style>
