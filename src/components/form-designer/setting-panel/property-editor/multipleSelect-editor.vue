<template>
  <a-form-item :label="i18nt('designer.setting.multipleSelect')">
    <a-switch v-model:checked="optionModel.multipleSelect"></a-switch>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n";

  export default {
    name: "multipleSelect-editor",
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
