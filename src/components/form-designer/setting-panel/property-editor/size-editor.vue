<template>
  <a-form-item :label="i18nt('designer.setting.widgetSize')">
    <a-select v-model:value="optionModel.size" :options="widgetSizes" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'size-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        widgetSizes: [
          { label: 'default', value: '' },
          { label: 'large', value: 'large' },
          { label: 'small', value: 'small' }
        ]
      };
    }
  };
</script>
