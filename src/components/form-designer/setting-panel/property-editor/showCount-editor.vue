<template>
  <a-form-item :label="i18nt('designer.setting.showCount')">
    <a-switch v-model:checked="optionModel.showCount" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'showCount-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>
