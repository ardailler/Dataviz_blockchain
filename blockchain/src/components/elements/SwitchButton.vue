<template>
  <div :class="['switch_button', isActivate]" @click.prevent.stop="clickOnSwitch()">
    <div class="selector"></div>
  </div>
</template>

<script>

export default {
  name: 'SwitchButton',
  props: {
    switchState: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    isActivate () {
      return this.switchState ? 'activate' : ''
    }
  },
  methods: {
    clickOnSwitch () {
      this.$emit('clickOnSwitch')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .switch_button {
    position: relative;
    display: flex;
    width: 48px;
    height: 24px;
    background-color: var(--color-primary);
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;
    /*border: 1px solid var(--color-dark);*/
    cursor: pointer;
  }

  .switch_button::before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--color-secondary);
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;

    -webkit-transform-origin: center;
    -moz-transform-origin: center;
    -ms-transform-origin: center;
    -o-transform-origin: center;
    transform-origin: center;
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
  }

  .switch_button.activate::before {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  .switch_button.activate .selector {
    border: 1px solid var(--color-secondary-30);
  }
  .selector {
    position: absolute;
    display: block;
    width: 24px;
    height: 24px;
    background-color: white;
    border: 1px solid var(--color-primary-30);
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;

    -webkit-transform: scale(.9) translateX(0%);
    -moz-transform: scale(.9) translateX(0%);
    -ms-transform: scale(.9) translateX(0%);
    -o-transform: scale(.9) translateX(0%);
    transform: scale(.9) translateX(0%);

    -webkit-transition: .25s ease;
    -moz-transition: .25s ease;
    -ms-transition: .25s ease;
    -o-transition: .25s ease;
    transition: .25s ease;
  }
  .switch_button.activate .selector {
    -webkit-transform: scale(.9) translateX(26px);
    -moz-transform: scale(.9) translateX(26px);
    -ms-transform: scale(.9) translateX(26px);
    -o-transform: scale(.9) translateX(26px);
    transform: scale(.9) translateX(26px);
  }
</style>
