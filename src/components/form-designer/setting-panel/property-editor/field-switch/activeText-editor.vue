<template>
  <a-form-item :label="i18nt('designer.setting.activeText')">
    <a-input v-model:value="optionModel.activeText"></a-input>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "activeText-editor",
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
