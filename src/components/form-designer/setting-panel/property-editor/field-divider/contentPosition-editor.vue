<template>
  <a-form-item :label="i18nt('designer.setting.contentPosition')">
    <a-select v-model:value="optionModel.contentPosition">
      <a-select-option label="center" value="center">center</a-select-option>
      <a-select-option label="left" value="left">left</a-select-option>
      <a-select-option label="right" value="right">right</a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "contentPosition-editor",
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
