<template>
  <a-form-item :label="i18nt('designer.setting.defaultValue')">
    <a-input-number v-model:value="optionModel.defaultValue" :min="0" :max="optionModel.max" style="width: 100%"
                     @change="emitDefaultValueChange">
    </a-input-number>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "rate-defaultValue-editor",
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
