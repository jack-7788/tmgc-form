<template>
  <a-form-item :label="i18nt('designer.setting.addonAfter')">
    <a-input type="text" v-model:value="optionModel.addonAfter" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'addonAfter-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>
