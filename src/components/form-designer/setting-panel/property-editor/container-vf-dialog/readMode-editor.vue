<template>
  <a-form-item :label="i18nt('designer.setting.readMode')">
    <a-switch v-model:checked="optionModel.readMode" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'readMode-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
