<template>
  <a-form-item :label="i18nt('designer.setting.displayStyle')">
    <a-radio-group v-model:value="optionModel.displayStyle">
      <a-radio value="inline">{{i18nt('designer.setting.inlineLayout')}}</a-radio>
      <a-radio value="block">{{i18nt('designer.setting.blockLayout')}}</a-radio>
    </a-radio-group>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "displayStyle-editor",
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
