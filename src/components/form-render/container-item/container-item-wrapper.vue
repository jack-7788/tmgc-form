<template>
  <div class="container-wrapper" :style="$attrs.containerStyle" :class="[customClass]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'container-item-wrapper',
    props: {
      widget: Object
    },
    computed: {
      customClass() {
        return !!this.widget.options.customClass ? this.widget.options.customClass.join(' ') : '';
      }
    }
  };
</script>
