<template>
  <div :class="['buttonYear', name, isActive, color]" :alt="name" :title="name" @click.prevent.stop="clickOnType(id)">
    <p class="body_1">{{name}}</p>
    <div class="filter"></div>
  </div>
</template>

<script>

export default {
  name: 'ButtonYear',
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
  .buttonYear {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 128px;
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
  .buttonYear p {
    color: black;
  }

  .buttonYear:hover,
  .buttonYear.active {
    background-color: transparent;
    border: 2px solid lightgrey;

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
  }

  .buttonYear.data {
    background-color: var(--color-secondary);
    border: 2px solid var(--color-secondary);
  }

  .buttonYear.data:hover,
  .buttonYear.data.active {
    background-color: transparent;
    border: 2px solid var(--color-secondary);
  }

  .buttonYear.energie {
    background-color: var(--color-primary-50);
    border: 2px solid var(--color-primary-50);
  }

  .buttonYear.energie:hover,
  .buttonYear.energie.active {
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
  .buttonYear:hover .filter,
  .buttonYear.active .filter {
    opacity: 0;
    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
  }

  .buttonYear.energie .filter {
    background-color: var(--color-primary-30);
  }

  .buttonYear.data .filter {
    background-color: var(--color-secondary-30);
  }
</style>
