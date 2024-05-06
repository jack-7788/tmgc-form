<template>
  <svg :class="svgClass" aria-hidden="true" :style="getStyle">
    <use :xlink:href="iconName" />
    <title v-if="!!title">{{ title }}</title>
  </svg>
</template>

<script>
  export default {
    name: 'SvgIcon',
    props: {
      iconClass: {
        type: String,
        required: true
      },
      className: {
        type: String
      },
      title: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: '1.1em'
      }
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`;
      },
      svgClass() {
        if (this.className) {
          return 'svg-icon ' + this.className;
        } else {
          return 'svg-icon';
        }
      },
      getStyle() {
        return {
          width: this.size,
          height: this.size,
          cursor: 'pointer' //cursor ? 'pointer' : move ? 'move' : ''
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  .svg-icon {
    width: 1.1em;
    height: 1.1em;
    margin-left: 0.35em;
    margin-right: 0.35em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
