<template>
  <a-form-item :label="i18nt('designer.setting.okButtonHidden')">
    <a-switch v-model:checked="optionModel.okButtonHidden" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'okButtonHidden-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
