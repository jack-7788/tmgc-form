<template>
  <a-form-item :label="i18nt('designer.setting.checkedValue')">
    <a-input v-model:value="optionModel.checkedValue" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'checkedValue-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
