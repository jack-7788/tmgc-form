<template>
  <a-form-item :label="i18nt('designer.setting.rows')">
    <a-input-number v-model:value="optionModel.rows" style="width: 100%" :min="1" allowClear />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'rows-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>
