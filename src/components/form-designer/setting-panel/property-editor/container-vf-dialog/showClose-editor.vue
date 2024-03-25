<template>
  <a-form-item :label="i18nt('designer.setting.showClose')">
    <a-switch v-model:checked="optionModel.showClose" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'showClose-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
