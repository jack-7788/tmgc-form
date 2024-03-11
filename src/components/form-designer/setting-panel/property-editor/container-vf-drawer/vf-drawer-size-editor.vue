<template>
  <a-form-item :label="i18nt('designer.setting.drawSize')">
    <a-input type="text" v-model:value="optionModel.size"></a-input>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "vf-drawer-size-editor",
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
