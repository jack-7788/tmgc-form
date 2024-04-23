<template>
  <a-form-item :label="'幽灵属性，使按钮背景透明'">
    <a-switch v-model:checked="optionModel.ghost" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'ghost-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
