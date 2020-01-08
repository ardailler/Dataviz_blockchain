<template>
  <div :class="['iconType', name]" :alt="name" :title="name" :style="css">
  </div>
</template>

<script>

export default {
  name: 'IconType',
  props: {
    name: {
      type: String,
      default: 'Nucleaire'
    },
    css: {
      type: String,
      default: 'width:64px;height:64px'
    }
  },
  data () {
    return {
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Eolienne {
    background: transparent url('../../assets/img/icons/eolienne.svg') no-repeat 50% 50% / contain;
  }
  .Nucleaire {
    background: transparent url('../../assets/img/icons/central.svg') no-repeat 50% 50% / contain;
  }
  .Barrage {
    background: transparent url('../../assets/img/icons/washer.svg') no-repeat 50% 50% / contain;
  }
  .Solaire {
    background: transparent url('../../assets/img/icons/solar.svg') no-repeat 50% 50% / contain;
  }
  .Charbon {
    background: transparent url('../../assets/img/icons/coal.svg') no-repeat 50% 50% / contain;
  }
  .Aspirateur {
    background: transparent url('../../assets/img/icons/housework.svg') no-repeat 50% 50% / contain;
  }
  .Frigo {
    background: transparent url('../../assets/img/icons/kitchen.svg') no-repeat 50% 50% / contain;
  }
  .Ordinateur {
    background: transparent url('../../assets/img/icons/laptop.svg') no-repeat 50% 50% / contain;
  }
  .Ampoule {
    background: transparent url('../../assets/img/icons/light.svg') no-repeat 50% 50% / contain;
  }
  .Personne {
    background: transparent url('../../assets/img/icons/man.svg') no-repeat 50% 50% / contain;
  }
  .Four {
    background: transparent url('../../assets/img/icons/oven.svg') no-repeat 50% 50% / contain;
  }
  .Telephone {
    background: transparent url('../../assets/img/icons/smartphone.svg') no-repeat 50% 50% / contain;
  }
  .TV {
    background: transparent url('../../assets/img/icons/tv.svg') no-repeat 50% 50% / contain;
  }
  .Washer {
    background: transparent url('../../assets/img/icons/washer.svg') no-repeat 50% 50% / contain;
  }
  .buttonYear {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
