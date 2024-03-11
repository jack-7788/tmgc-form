<template>
  <a-form-item :label="i18nt('designer.setting.vertical')">
    <a-switch v-model:checked="optionModel.vertical"></a-switch>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "vertical-editor",
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
