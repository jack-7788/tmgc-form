<template>
  <a-form-item :label="i18nt('designer.setting.labelTooltip')">
    <a-input type="text" v-model:value="optionModel.labelTooltip"></a-input>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "labelTooltip-editor",
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
