<template>
  <a-form-item :label="i18nt('designer.setting.displayType')">
    <a-select v-model:value="optionModel.type">
      <a-select-option label="datetime" value="datetime">datetime</a-select-option>
      <a-select-option label="date" value="date">date</a-select-option>
      <a-select-option label="dates" value="dates">dates</a-select-option>
      <a-select-option label="year" value="year">year</a-select-option>
      <a-select-option label="month" value="month">month</a-select-option>
      <a-select-option label="week" value="week">week</a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n";

  export default {
    name: "date-type-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
