<template>
  <a-form-item :label="i18nt('designer.setting.defaultValue')">
    <a-time-picker v-model:value="optionModel.defaultValue" is-range @change="emitDefaultValueChange"
                    :format="optionModel.format" value-format="HH:mm:ss" style="width: 100%">
    </a-time-picker>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "time-range-defaultValue-editor",
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
