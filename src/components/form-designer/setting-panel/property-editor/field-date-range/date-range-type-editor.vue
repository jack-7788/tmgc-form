<template>
  <a-form-item :label="i18nt('designer.setting.displayType')">
    <a-select v-model="optionModel.type">
      <a-select-option label="daterange" value="daterange">daterange</a-select-option>
      <a-select-option label="datetimerange" value="datetimerange">datetimerange</a-select-option>
      <a-select-option label="monthrange" value="monthrange">monthrange</a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n";

  export default {
    name: "date-range-type-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style lang="scss" scoped>

</style>
