<template>
  <a-form-item :label="'增加时间选择功能'">
    <a-switch v-model:checked="optionModel.showTime" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'showTime-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
