<template>
  <div class="page-introduction">
    <div class="title">
      <h2>Ressources </h2><br>
      <div class ="team">
      <div><h6><span>Données de la blockchain : </span><a href="https://www.blockchain.com">blockchain.com</a></h6></div>
      <br>
      <div><h6><span>Données consommation du système bancaire : </span><a href="https://www.mastercard.us/content/dam/mccom/global/aboutus/Sustainability/mastercard-sustainability-report-2017.pdf">Mastercard</a> / <a href="https://usa.visa.com/dam/VCOM/download/corporate-responsibility/visa-2017-corporate-responsibility-report.pdf">Visa</a></h6></div>
      <br>
       <div><h6><span>Données production d'électricité  : </span><a href="https://fr.wikipedia.org/wiki/%C3%89lectricit%C3%A9_en_France">Electricité en France</a></h6></div>
      <br>
      <div><h6><span>Données consommation d'électricité : </span><a href="https://selectra.info/energie/guides/conso/appareils-electriques">Selectra</a></h6></div>
      <br>
      <div><h6><span>Calcul minage et consommation  : </span><a href="https://bitcoin.fr/quelle-est-la-consommation-electrique-du-reseau-bitcoin/">bitcoin.fr</a></h6></div>
      <br>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Introduction',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page-introduction {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background: white url('../../assets/img/intro_img.svg')no-repeat 50% -50% / cover;
  }
  .title {
    position: relative;
    display: block;
    justify-content: space-between;
    align-self: flex-start;
    padding: 35px;
  }

  .title .team {
    position: relative;
    display: block;
    padding-left:1%
    /*align-items: flex-end;
    flex-direction: column;*/
  }
  .title .team h6 {
    text-align: left;
  }

  .title h3,
  .title .team h6{
    font-family: "Muli ExtraLight", sans-serif;
  }
  .title h3 > span,
  .title .team h6 > span {
    font-family: "Muli SemiBold", sans-serif;
  }
</style>
