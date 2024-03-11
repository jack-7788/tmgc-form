<template>
  <a-form-item v-if="!hasConfig('optionItems')" :label="i18nt('designer.setting.defaultValue')">
    <a-input-number type="text" style="width: 100%" v-model:value="optionModel.defaultValue"
              @change="emitDefaultValueChange"></a-input-number>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "number-defaultValue-editor",
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
