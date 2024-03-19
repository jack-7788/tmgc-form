<template>
  <a-form-item :label="i18nt('designer.setting.widgetSize')">
    <a-select v-model:value="optionModel.tableSize" :options="widgetSizes" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'tableSize-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        widgetSizes: [
          { label: 'default', value: 'default' },
          { label: 'middle', value: 'middle' },
          { label: 'small', value: 'small' }
        ]
      };
    },
    methods: {}
  };
</script>
