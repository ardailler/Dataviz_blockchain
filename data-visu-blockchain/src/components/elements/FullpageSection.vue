<template>
  <div class="fullpage-section section">
    <div class="section-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullpageSection',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .section .section-container {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
