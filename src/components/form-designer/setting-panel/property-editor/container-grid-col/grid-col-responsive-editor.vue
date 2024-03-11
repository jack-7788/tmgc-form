<template>
  <a-form-item :label="i18nt('designer.setting.responsive')">
    <a-switch v-model:checked="optionModel.responsive"></a-switch>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "grid-col-responsive-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style lang="scss" scoped>

</style>
