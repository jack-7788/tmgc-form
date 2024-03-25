<template>
  <a-form-item :label="i18nt('designer.setting.cellHeight')">
    <a-input type="text" v-model:value="optionModel.cellHeight" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'cellHeight-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
