<template>
  <a-form-item :label="i18nt('designer.setting.displayType')">
    <a-select v-model:value="optionModel.type">
      <a-select-option label="date" value="date">日</a-select-option>
      <a-select-option label="week" value="week">周</a-select-option>
      <a-select-option label="month" value="month">月</a-select-option>
      <a-select-option label="quarter" value="quarter">季</a-select-option>
      <a-select-option label="year" value="year">年</a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'date-type-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
