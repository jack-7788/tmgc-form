<template>
  <a-form-item :label="i18nt('designer.setting.defaultValue')">
    <a-switch v-model:checked="optionModel.defaultValue" @change="emitDefaultValueChange"
    checkedChildren="true" unCheckedValue="false"></a-switch>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "switch-defaultValue-editor",
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
