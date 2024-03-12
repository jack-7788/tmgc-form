<template>
  <a-form-item :label="i18nt('designer.setting.format')">
    <a-select v-model:value="optionModel.format" allowClear>
      <a-select-option label="HH:mm:ss" value="HH:mm:ss">HH:mm:ss</a-select-option>
      <a-select-option label="HH时mm分ss秒" value="HH时mm分ss秒">HH时mm分ss秒</a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'time-range-format-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>
