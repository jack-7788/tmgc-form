<template>
  <a-form-item :label="`使用功能按钮`">
    <a-switch v-model:checked="optionModel.useModal" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'useModal-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
