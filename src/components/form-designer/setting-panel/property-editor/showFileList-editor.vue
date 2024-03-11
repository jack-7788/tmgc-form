<template>
  <a-form-item :label="i18nt('designer.setting.showFileList')">
    <a-switch v-model:checked="optionModel.showFileList" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'showFileList-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>
