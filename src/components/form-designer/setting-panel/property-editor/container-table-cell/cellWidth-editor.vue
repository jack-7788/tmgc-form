<template>
  <a-form-item :label="i18nt('designer.setting.cellWidth')">
    <a-input type="text" v-model:value="optionModel.cellWidth"></a-input>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "cellWidth-editor",
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
