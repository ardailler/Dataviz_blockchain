<template>
  <div class='page-consommation row'>
    <InfoSection :top="64">
      <p class="subtitle_2">Explication :</p>
      <p class="body_2">Les cryptomonnaies se reposent sur un système de minage :
        des machines effectuent des calculs complexes afin d'ouvrir le prochain block et donc de valider des transactions (le minage).
        La complexité des calculs et la puissance des machines augmentent avec le temps.
        Il est possible de réaliser un bénéfice si le coût énergétique du minage est plus faible que le prix de revente de la monnaie minée.
        Voici la liste des paramètres qui influence le coût du minage :</p>
      <p class="body_2"> - Le taux de hachage représente la puissance de minage (la vitesse de calcul) requise pour valider des transactions.</p>
      <p class="body_2"> - Taux de hachage possédée par la machine utilisée.</p>
      <p class="body_2"> - Les cryptomonnaies peuvent être échangées contre de l'argent réel avec un autre utilisateur.</p>
      <p class="body_2"> - Le prix de l'électricité (en kWh) influe sur la rentabilité des équipements utilisés.</p>
      <p class="body_2"> - La quantité d'electricité consommée par la machine en kw/h.</p>
      <p class="body_2"> - Nombre de cryptomonnaie moyenne gagnée lorsque l'on mine un bloc.</p>
      <p class="body_2"> - Nombre de blocs minables par heure.</p>
    </InfoSection>
    <div id="calcul_value"  :class="['col-xs-6 col-s-5 col-m-4 col-l-4 col-4', getDataType]">
      <div class="input_container">
        <label class="subtitle_2">Taux de Hachage :</label>
        <input v-model="glob_hash" type="number" placeholder="Hachage en Thash/s ">
      </div>
      <div class="input_container">
        <label class="subtitle_2">Hachage personnel :</label>
        <input v-model="own_hash" type="number" placeholder="Hachage en Thash/s ">
      </div>
      <div class="input_container">
        <label class="subtitle_2">Taux de revente :</label>
        <input v-model="taux" type="number" step="any" placeholder="prix d'un kWh">
      </div>
      <div class="input_container">
        <label class="subtitle_2">Prix Electricité :</label>
        <input v-model="prix" type="number" step="any" placeholder="prix d'un kwH">
      </div>
      <div class="input_container">
        <label class="subtitle_2">Consommation machine :</label>
        <input v-model="own_cons" type="number" step="any" placeholder="prix d'un kWh">
      </div>
      <div class="input_container">
        <label class="subtitle_2">Gain bloc :</label>
        <input v-model="gain" type="number" placeholder="gain moyen pour un bloc en BT">
      </div>
      <div class="input_container">
        <label class="subtitle_2">Temps bloc :</label>
        <input v-model="own_cons" type="number" step="any" placeholder="Nombre bloc découvert par heure">
      </div>
      <button class="subtitle_2" @click="greet">Estimer</button>
    </div>
    <div :class="['table_container col-xs-6 col-s-7 col-m-8 col-l-8 col-8', getDataType]">
      <div>
        <table>
          <tr>
            <td>&nbsp;</td>
            <td>1 heure</td>
            <td>1 jour</td>
            <td>1 semaine</td>
            <td>1 mois</td>
          </tr>
          <tr>
            <td>Cout consommation d'energies</td>
            <td>{{one_hour_consumption}}€</td>
            <td>{{mult(one_hour_consumption, 24)}}€</td>
            <td>{{mult(one_hour_consumption, 168)}}€</td>
            <td>{{mult(one_hour_consumption, 730)}}€</td>
          </tr>
          <tr>
            <td>Gain de cryptomonnaie en euros</td>
            <td>{{one_hour_gain}}€</td>
            <td>{{mult(one_hour_gain, 24)}}€</td>
            <td>{{mult(one_hour_gain, 168)}}€</td>
            <td>{{mult(one_hour_gain, 730)}}€</td>
          </tr>
          <tr>
            <td>Benefice en euros</td>
            <td>{{one_hour_benefit}}€</td>
            <td>{{mult(one_hour_benefit,24)}}€</td>
            <td>{{mult(one_hour_benefit,168)}}€</td>
            <td>{{mult(one_hour_benefit,730)}}€</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import InfoSection from '@/components/elements/InfoSection'

export default {
  name: 'Simulation',
  data () {
    return {
      glob_hash: parseInt(107698810.68229385),
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
  components: {
    InfoSection
  },
  mounted () {
    this.greet()
  },
  computed: {
    getDataType () {
      return this.$store.getters.allData.switchConso ? 'data' : 'energie'
    }
  },
  watch: {
  },
  methods: {
    mult (data1, data2) {
      return parseFloat(data1 * data2).toFixed(2)
    },
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
    width: 100%;
    height: 100%;
    background: white;
    padding: 84px 20px 20px 20px;
  }

  #calcul_value,
  .table_container {
    padding: 10px;
  }

  #calcul_value .input_container {
    position: relative;
    background-color: lightgrey;
    padding: 20px;
    margin-bottom: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
  }

  #calcul_value.energie .input_container {
    background-color: var(--color-primary);
  }

  #calcul_value.data .input_container {
    background-color: var(--color-secondary);
  }

  #calcul_value button {
    position: relative;
    display: block;
    width: 100%;
    height: 40px;
    border: none;
    cursor: pointer;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;

    -webkit-transition: 0.25s ease;
    -moz-transition: 0.25s ease;
    -ms-transition: 0.25s ease;
    -o-transition: 0.25s ease;
    transition: 0.25s ease;
  }

  #calcul_value button:hover {
    -webkit-transition: 0.25s ease;
    -moz-transition: 0.25s ease;
    -ms-transition: 0.25s ease;
    -o-transition: 0.25s ease;
    transition: 0.25s ease;
  }

  #calcul_value.energie button:hover {
    background-color: var(--color-primary-60);
  }

  #calcul_value.data button:hover {
    background-color: var(--color-secondary-60);
  }

  #calcul_value.energie button {
    background-color: var(--color-primary);
  }

  #calcul_value.data button {
    background-color: var(--color-secondary);
  }

  .input_container label{
    position: relative;
    display: block;
    width: 100%;
  }

  .input_container input {
    position: relative;
    display: block;
    width: 100%;
    height: 40px;
    background-color: transparent;
    border: none;
    padding: 5px;
    outline: none;
    border-bottom: 3px solid white;
  }

  .table_container > div {
    position: relative;
    display: block;
  }

  table {
    font-family: "Muli SemiBold", sans-serif;
    font-size: 1.333em;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    background-color: #fff;
    overflow: hidden;
    width: 100%;
    border-collapse: collapse;
  }

  .table_container.energie td{
    background-color: var(--color-primary-50);
  }
  .table_container.data td{
    background-color: var(--color-secondary-50);
  }
  td {
    padding: 10px;

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
  }
  tr td:nth-child(1) {
    padding-left: 20px;
    padding-bottom: 20px;
  }

</style>
