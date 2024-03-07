<template>
  <a-form-item :label="i18nt('designer.setting.prefixIcon')">
    <a-input type="text" v-model:value="optionModel.prefixIcon"></a-input>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n";

  export default {
    name: "prefixIcon-editor",
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
