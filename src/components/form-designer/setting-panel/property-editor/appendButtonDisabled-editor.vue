<template>
  <a-form-item :label="i18nt('designer.setting.appendButtonDisabled')">
    <a-switch v-model:checked="optionModel.appendButtonDisabled" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'appendButtonDisabled-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
