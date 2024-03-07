<template>
  <a-form-item :label="i18nt('designer.setting.validationHint')">
    <a-input type="text" v-model:value="optionModel.validationHint"></a-input>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "validationHint-editor",
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
