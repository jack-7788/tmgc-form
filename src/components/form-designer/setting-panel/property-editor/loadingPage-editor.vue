<template>
  <a-form-item :label="`使用分页加载`">
    <a-switch v-model:checked="optionModel.loadingPage" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'loadingPage-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
