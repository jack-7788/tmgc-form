<template>
  <a-form-item :label="i18nt('designer.setting.required')">
    <a-switch v-model:checked="optionModel.required" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'required-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>
