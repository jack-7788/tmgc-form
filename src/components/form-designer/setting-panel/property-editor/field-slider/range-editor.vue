<template>
  <a-form-item :label="i18nt('designer.setting.range')">
    <a-switch v-model:checked="optionModel.range" @change="changeRange" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'range-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    methods: {
      changeRange(val) {
        if (val === true) {
          this.optionModel.defaultValue = [];
        } else {
          this.optionModel.defaultValue = null;
        }
      }
    }
  };
</script>

<style scoped></style>
