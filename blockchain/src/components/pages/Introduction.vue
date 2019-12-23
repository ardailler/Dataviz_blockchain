<template>
  <div class="page-introduction">
    <div class="title">
      <h3>Data visualisation <br><span>Blockchain</span></h3>
      <div class="team">
        <h6>Julian<span> Bruyat</span></h6>
        <h6>Arnaud<span> Dailler</span></h6>
        <h6>Thibaud<span> Perrin</span></h6>
        <h6>Jean-Philippe<span> Tisserand</span></h6>
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
    background: white url('../../assets/img/intro_img.svg')no-repeat 50% 50% / cover;
  }
  .title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-self: flex-start;
    padding: 35px;
  }

  .title .team {
    position: relative;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }
  .title .team h6 {
    text-align: right;
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
