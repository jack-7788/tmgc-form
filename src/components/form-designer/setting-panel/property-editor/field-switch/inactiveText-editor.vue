<template>
  <a-form-item :label="i18nt('designer.setting.inactiveText')">
    <a-input v-model:value="optionModel.inactiveText"></a-input>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "inactiveText-editor",
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
