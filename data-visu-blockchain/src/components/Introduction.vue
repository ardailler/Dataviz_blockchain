<template>
  <div class="page-introduction">
    <h1>Test</h1>
    <slot></slot>
    <h1>after slot</h1>
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
</style>
