<template>
  <div class='page-comparaison row'>
    <InfoSection :top="64">
      <p class="subtitle_2">Explication :</p>
      <p class="body_2">Cette page permet de comparer la consommation (minage + transactions) du bitcoin par an avec d'autres objets.</p>
      <p class="body_2">La partie de gauche de cette page permet de sélectionner un 'objet' et une année, et la partie de droite vous donne une visualisation de deux manière différente.</p>
      <p class="body_2">En haut à droite, vous avez donc 3 chiffres,
        la consommation du bitcoin l'année sélectionnée,
        la consommation à l'unité de l'objet sélectionné et
        le nombre d'objets nécessaire pour égaler la consommation du bitcoin.</p>
      <p class="body_2">En bas à droite, le grand rectangle affiche un nombre d'objets entre 0 et 1000 avec une échelle logarithme afin de visualiser l'évolution suivant les années.</p>
    </InfoSection>
    <div class="sct selection col-6 col-m-6">
      <div class="type">
        <h6>Types :</h6>
        <p class="subtitle_2">Production :</p>
        <div v-for="(item, index) in listProdNrg" v-bind:key="(index+'-prod')" class="icons">
          <ButtonType :name="item" :id="index" :active="prodIsActive(index)" :color="getDataType" @clickOnType="prodNrgClick"></ButtonType>
        </div>
        <p class="subtitle_2">Consommation :</p>
        <div v-for="(item, index) in listConsoNrg" v-bind:key="(index+'-conso')" class="icons">
          <ButtonType :name="item" :id="index" :active="consoIsActive(index)" :color="getDataType" @clickOnType="consoNrgClick"></ButtonType>
        </div>
      </div>
      <div class="years">
        <h6>Dates :</h6>
        <div v-for="(item, index) in annee" :key="(index+'-annee')" class="icons">
          <ButtonYear :name="item" :id="index" :active="anneeIsActive(index)" :color="getDataType" @clickOnType="anneeClick"></ButtonYear>
        </div>
      </div>
    </div>
    <div :class="['affichage sct col-6 col-m-6', getDataType]">
      <div class="head">
        <div class="content">
          <div class="bitcoinInfo">
            <IconType :name="'Bitcoin'"></IconType>
            <div class="text">
              <p class="body_2"><strong>{{getConsoYear}} Kw</strong></p>
            </div>
          </div>
          <div class="typeInfo">
            <div class="text">
              <p class="subtitle_1">1 = {{getConsoType}} Kwh</p>
              <h6><strong>{{getNumber}}</strong></h6>
            </div>
            <IconType :name="getIcon"></IconType>
          </div>
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
import InfoSection from '@/components/elements/InfoSection'

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
      numberConso: 0,
      consoType: 0,
      consoYear: 0
    }
  },
  components: {
    ButtonType,
    ButtonYear,
    IconType,
    GraphIcons,
    InfoSection
  },
  mounted () {
    let self = this
    self.updateGraphIconNumber()
    self.updateGraphIconConso()
    self.updateGraphYearConso()
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
    },
    getConsoType () {
      return this.consoType.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    getConsoYear () {
      return parseFloat(this.consoYear).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
    },
    updateGraphIconConso () {
      let self = this
      self.$watch(
        () => {
          return self.$refs.graphIcons.consoType
        },
        (val) => {
          self.consoType = val
        }
      )
    },
    updateGraphYearConso () {
      let self = this
      self.$watch(
        () => {
          return self.$refs.graphIcons.consoYear
        },
        (val) => {
          self.consoYear = val
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
  .page-comparaison > .sct {
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
    display: block;
    width: 100%;
    padding: 10px;
  }
  .affichage .bitcoinInfo {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: end;
  }
  .affichage .bitcoinInfo p {
    padding: 10px;
  }
  .affichage .typeInfo {
    position: relative;
    display: flex;
    justify-content: flex-end;
    text-align: end;
  }
  .affichage .typeInfo .text {
    margin-right: 10px;
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

    -webkit-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    -moz-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

    -webkit-transition: 0.25s ease;
    -moz-transition: 0.25s ease;
    -ms-transition: 0.25s ease;
    -o-transition: 0.25s ease;
    transition: 0.25s ease;
  }
  .affichage.energie > .head > .content {
    background-color: var(--color-primary);

    -webkit-transition: 0.25s ease;
    -moz-transition: 0.25s ease;
    -ms-transition: 0.25s ease;
    -o-transition: 0.25s ease;
    transition: 0.25s ease;
  }
  .affichage.data > .head > .content {
    background-color: var(--color-secondary);

    -webkit-transition: 0.25s ease;
    -moz-transition: 0.25s ease;
    -ms-transition: 0.25s ease;
    -o-transition: 0.25s ease;
    transition: 0.25s ease;
  }

  .affichage .body {
    position: relative;
    display: block;
    width: 100%;
    padding: 10px;
  }

  @media only screen and (min-width: 768px) {
    .page-comparaison > .sct {
      height: 100%;
    }
  }
</style>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
