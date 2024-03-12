<template>
  <a-form-item size="small" :label="i18nt('designer.setting.validationHint')">
    <a-input size="small" v-model:value="optionModel.validationHint" allowClear />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'validationHint-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>
