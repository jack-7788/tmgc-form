<template>
  <a-form-item :label="'默认折叠'">
    <a-switch v-model:checked="optionModel.isCollapse" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'isCollapse-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
