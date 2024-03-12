<template>
  <a-form-item :label="i18nt('designer.setting.controlsPosition')">
    <a-select v-model:value="optionModel.controlsPosition">
      <a-select-option label="default" value="">default</a-select-option>
      <a-select-option label="right" value="right">right</a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'controlsPosition-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
