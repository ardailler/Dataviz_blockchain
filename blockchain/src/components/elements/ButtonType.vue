<template>
  <div :class="['buttonType', name, isActive, color]" :alt="name" :title="name" @click.prevent.stop="clickOnType(id)">
    <div class="filter"></div>
  </div>
</template>

<script>

export default {
  name: 'ButtonType',
  props: {
    id: {
      type: Number,
      default: -1
    },
    name: {
      type: String,
      default: 'central'
    },
    color: {
      type: String,
      default: 'gray'
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  components: {
  },
  computed: {
    isActive () {
      return this.active ? 'active' : ''
    }
  },
  methods: {
    clickOnType (id) {
      this.$emit('clickOnType', id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .Eolienne {
    background: transparent url('../../assets/img/icons/eolienne.svg') no-repeat 50% 50% / 32px;
  }
  .Nucleaire {
    background: transparent url('../../assets/img/icons/central.svg') no-repeat 50% 50% / 32px;
  }
  .Barrage {
    background: transparent url('../../assets/img/icons/washer.svg') no-repeat 50% 50% / 32px;
  }
  .Solaire {
    background: transparent url('../../assets/img/icons/solar.svg') no-repeat 50% 50% / 32px;
  }
  .Charbon {
    background: transparent url('../../assets/img/icons/coal.svg') no-repeat 50% 50% / 32px;
  }
  .Aspirateur {
    background: transparent url('../../assets/img/icons/housework.svg') no-repeat 50% 50% / 32px;
  }
  .Frigo {
    background: transparent url('../../assets/img/icons/kitchen.svg') no-repeat 50% 50% / 32px;
  }
  .Ordinateur {
    background: transparent url('../../assets/img/icons/laptop.svg') no-repeat 50% 50% / 32px;
  }
  .Ampoule {
    background: transparent url('../../assets/img/icons/light.svg') no-repeat 50% 50% / 32px;
  }
  .Personne {
    background: transparent url('../../assets/img/icons/man.svg') no-repeat 50% 50% / 32px;
  }
  .Four {
    background: transparent url('../../assets/img/icons/oven.svg') no-repeat 50% 50% / 32px;
  }
  .Telephone {
    background: transparent url('../../assets/img/icons/smartphone.svg') no-repeat 50% 50% / 32px;
  }
  .TV {
    background: transparent url('../../assets/img/icons/tv.svg') no-repeat 50% 50% / 32px;
  }
  .Washer {
    background: transparent url('../../assets/img/icons/washer.svg') no-repeat 50% 50% / 32px;
  }

  .buttonType {
    position: relative;
    display: block;
    width: 64px;
    height: 64px;
    padding: 10px;
    background-color: lightgrey;
    border: 2px solid lightgrey;

    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    cursor: pointer;

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
  }

  .buttonType:hover,
  .buttonType.active {
    background-color: transparent;
    border: 2px solid lightgrey;

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
  }

  .buttonType.data {
    background-color: var(--color-secondary);
    border: 2px solid var(--color-secondary);
  }

  .buttonType.data:hover,
  .buttonType.data.active {
    background-color: transparent;
    border: 2px solid var(--color-secondary);
  }

  .buttonType.energie {
    background-color: var(--color-primary-50);
    border: 2px solid var(--color-primary-50);
  }

  .buttonType.energie:hover,
  .buttonType.energie.active {
    background-color: transparent;
    border: 2px solid var(--color-primary);
  }

  .filter {
    position: absolute;
    width: 120%;
    height: 120%;
    top: -10px;
    left: -10px;
    background-color: gray;
    mix-blend-mode: screen;
    pointer-events: none;
    opacity: 1;

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
  }
  .buttonType:hover .filter,
  .buttonType.active .filter {
    opacity: 0;
    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
  }

  .buttonType.energie .filter {
    background-color: var(--color-primary-30);
  }

  .buttonType.data .filter {
    background-color: var(--color-secondary-30);
  }
</style>
