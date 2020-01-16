<template>
  <div :class="['infoSection', getDataType, isActive]" :style="'top:' + top + 'px'">
    <div class="black_bg"></div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="icon_button" @click.prevent.stop="switchActivate">
      <p class="subtitle_1">{{ getButtonText }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InfoSection',
  props: {
    top: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      active: false
    }
  },
  components: {
  },
  computed: {
    getDataType () {
      return this.$store.getters.allData.switchConso ? 'data' : 'energie'
    },
    isActive () {
      return this.active ? 'activate' : ''
    },
    getButtonText () {
      return this.active ? 'X' : '?'
    }
  },
  methods: {
    switchActivate () {
      this.active = !this.active
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .infoSection {
    position: absolute;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    top: 0;
    right: 0;
    padding: 5px;
    z-index: 999;
  }
  .infoSection.activate {
    width: 100vw;
    height: calc(100vh - 64px);
  }
  .infoSection.energie .content {
    background-color: var(--color-primary);

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
    z-index: 999;
  }
  .black_bg {
    position: absolute;
    display: block;
    top: -64px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .25);
    opacity: 0;
    display: none;
  }

  .activate .black_bg {
    opacity: .5;
    display: block;
  }

  .energie.activate .black_bg {
    background-color: var(--color-primary-20);
  }

  .data.activate .black_bg {
    background-color: var(--color-secondary-20);
  }

  .infoSection.data .content {
    background-color: var(--color-secondary);

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
  }

  .infoSection .content {
    position: relative;
    background-color: red;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    margin-right: 10px;
    padding: 20px;
    opacity: 0;

    -webkit-transform: scale(.9);
    -moz-transform: scale(.9);
    -ms-transform: scale(.9);
    -o-transform: scale(.9);
    transform: scale(.9);

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;

    -webkit-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    -moz-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  .infoSection.activate .content {
    opacity: 1;

    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }

  .icon_button {
    position: relative;
    display: block;
    width: 32px;
    height: 32px;

    border: 2px solid transparent;

    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;
    cursor: pointer;

    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    color: black;

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
  }

  .icon_button p {
    position: relative;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .energie .icon_button {
    background-color: var(--color-primary);
  }

  .data .icon_button {
    background-color: var(--color-secondary);
  }

  .icon_button:hover,
  .activate .icon_button {
    background-color: transparent;

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
  }

  .energie .icon_button:hover,
  .energie.activate .icon_button {
    color: white;
    background-color: var(--color-primary-10);
  }

  .data .icon_button:hover,
  .data.activate .icon_button {
    color: white;
    background-color: var(--color-secondary-10);
  }

</style>
