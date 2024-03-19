<template>
  <a-form-item :label="i18nt('designer.setting.tableWidth')">
    <a-input v-model:value="optionModel.tableWidth" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'tableWidth-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>
