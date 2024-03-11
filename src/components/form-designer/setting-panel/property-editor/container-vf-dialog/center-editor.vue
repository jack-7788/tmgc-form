<template>
  <a-form-item :label="i18nt('designer.setting.center')" :title="i18nt('designer.setting.center')">
    <a-switch v-model:value="optionModel.center"></a-switch>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "center-editor",
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
