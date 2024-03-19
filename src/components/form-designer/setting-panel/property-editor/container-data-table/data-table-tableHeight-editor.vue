<template>
  <a-form-item :label="i18nt('designer.setting.tableHeight')">
    <a-input v-model:value="optionModel.tableHeight" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'tableHeight-editor',
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
