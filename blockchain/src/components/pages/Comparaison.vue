<template>
  <div class='page-comparaison row'>
    <div class="selection col-6 col-m-6">
      <div class="type">
        <h6>Types :</h6>
        <p class="subtitle_2">Production :</p>
        <div v-for="(item, index) in listProdNrg" v-bind:key="(index+'-prod')" class="icons">
          <ButtonType :name="item" :id="index" :active="prodIsActive(index)" :color="'energie'" @clickOnType="prodNrgClick"></ButtonType>
        </div>
        <p class="subtitle_2">Consommation :</p>
        <div v-for="(item, index) in listConsoNrg" v-bind:key="(index+'-conso')" class="icons">
          <ButtonType :name="item" :id="index" :active="consoIsActive(index)" :color="'energie'" @clickOnType="consoNrgClick"></ButtonType>
        </div>
      </div>
      <div class="years">
        <h6>Dates :</h6>
        <div v-for="(item, index) in annee" :key="(index+'-annee')" class="icons">
          <ButtonYear :name="item" :id="index" :active="anneeIsActive(index)" :color="'energie'" @clickOnType="anneeClick"></ButtonYear>
        </div>
      </div>
    </div>
    <div :class="['affichage col-6 col-m-6', getDataType]">
      <div class="head">
        <div class="content">
          <div class="text">
            <p class="subtitle_1">{{annee[indexAnnee]}}</p>
            <h6><strong>{{getNumber}}</strong></h6>
          </div>
          <IconType :name="getIcon"></IconType>
        </div>
      </div>
      <div class="body">
        <GraphIcons :name="getIcon" :year="getYear" :color="getDataType" ref="graphIcons"></GraphIcons>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonType from '@/components/elements/ButtonType.vue'
import ButtonYear from '@/components/elements/ButtonYear.vue'
import IconType from '@/components/elements/IconType.vue'
import GraphIcons from '@/components/elements/GraphIcons.vue'

export default {
  name: 'Comparaison',
  props: {
  },
  data () {
    return {
      listProdNrg: ['Eolienne', 'Nucleaire', 'Barrage', 'Solaire', 'Charbon'],
      listConsoNrg: ['Personne', 'Four', 'Telephone', 'Ordinateur', 'Frigo', 'Ampoule', 'Washer', 'Aspirateur', 'TV'],
      indexProdNrg: 0,
      indexConsoNrg: -1,
      annee: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
      indexAnnee: 10,
      numberConso: 0
    }
  },
  components: {
    ButtonType,
    ButtonYear,
    IconType,
    GraphIcons
  },
  mounted () {
    let self = this
    self.updateGraphIconNumber()
  },
  computed: {
    getDataType () {
      return this.$store.getters.allData.switchConso ? 'data' : 'energie'
    },
    getIcon () {
      return this.indexProdNrg !== -1 ? this.listProdNrg[this.indexProdNrg] : this.listConsoNrg[this.indexConsoNrg]
    },
    getYear () {
      return this.indexAnnee !== -1 ? this.annee[this.indexAnnee] : 2019
    },
    getNumber () {
      return this.numberConso.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  methods: {
    clearIndex () {
      this.indexProdNrg = -1
      this.indexConsoNrg = -1
    },
    prodNrgClick (id) {
      this.clearIndex()
      this.indexProdNrg = id
    },
    consoNrgClick (id) {
      this.clearIndex()
      this.indexConsoNrg = id
    },
    anneeClick (id) {
      this.indexAnnee = id
    },
    prodIsActive (index) {
      return this.indexProdNrg === index
    },
    consoIsActive (index) {
      return this.indexConsoNrg === index
    },
    anneeIsActive (index) {
      return this.indexAnnee === index
    },
    updateGraphIconNumber () {
      let self = this
      self.$watch(
        () => {
          return self.$refs.graphIcons.consoNumber
        },
        (val) => {
          self.numberConso = val
        }
      )
    }
  }
}
</script>

<style scoped>
  .page-comparaison {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
    padding-top: 64px;
  }
  .page-comparaison > div {
    position: relative;
    display: block;
    height: 50%;
    padding: 20px;
    overflow: auto;
  }
  .selection > .type,
  .selection > .years {
    position: relative;
    display: flex;
    flex-flow: wrap;
  }
  .selection > .type > p {
    width: 100%;
    padding: 10px;
  }
  .selection > .type > h6 {
    width: 100%;
    padding: 10px 10px 0 10px;
  }
  .selection > .years > h6 {
    width: 100%;
    padding: 10px ;
  }
  .selection > .type > .icons,
  .selection > .years > .icons {
    position: relative;
    display: flex;
    padding: 10px;
  }

  .affichage > .head {
    position: relative;
    display: bloc;
    width: 100%;
    padding: 10px;
  }
  .affichage > .head > .content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    padding: 20px;
  }
  .affichage.energie > .head > .content {
    background-color: var(--color-primary);
  }
  .affichage.data > .head > .content {
    background-color: var(--color-secondary);
  }

  .affichage .body {
    position: relative;
    display: block;
    width: 100%;
    padding: 10px;
  }

  @media only screen and (min-width: 768px) {
    .page-comparaison > div {
      height: 100%;
    }
  }
</style>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
