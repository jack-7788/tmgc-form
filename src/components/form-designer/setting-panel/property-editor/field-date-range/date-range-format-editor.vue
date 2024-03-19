<template>
  <a-form-item :label="i18nt('designer.setting.format')">
    <a-select v-model:value="optionModel.format" allowClear>
      <a-select-option label="YYYY-MM-DD" value="YYYY-MM-DD">YYYY-MM-DD</a-select-option>
      <a-select-option label="YYYY年MM月DD日" value="YYYY年MM月DD日">
        YYYY年MM月DD日
      </a-select-option>
      <a-select-option label="YYYY-MM-DD HH:mm:ss" value="YYYY-MM-DD HH:mm:ss">
        YYYY-MM-DD HH:mm:ss
      </a-select-option>
      <a-select-option label="YYYY:MM" value="YYYY:MM">YYYY:MM</a-select-option>
      <a-select-option label="YYYY" value="YYYY">YYYY</a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'date-range-format-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
