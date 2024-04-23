<template>
  <a-form-item :label="'设置危险按钮'">
    <a-switch v-model:checked="optionModel.danger" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'danger-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
