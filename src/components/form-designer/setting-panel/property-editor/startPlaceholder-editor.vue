<template>
  <a-form-item :label="i18nt('designer.setting.startPlaceholder')">
    <a-input type="text" v-model:value="optionModel.startPlaceholder" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'startPlaceholder-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>
