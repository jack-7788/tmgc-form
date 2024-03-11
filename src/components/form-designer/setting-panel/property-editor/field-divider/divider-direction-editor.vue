<template>
  <a-form-item :label="i18nt('designer.setting.dividerDirection')">
    <a-select v-model:value="optionModel.direction">
      <a-select-option label="horizontal" value="horizontal">horizontal</a-select-option>
      <a-select-option label="vertical" value="vertical">vertical</a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "divider-direction-editor",
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
