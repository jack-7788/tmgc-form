<template>
  <div>
    <a-form-item :label="i18nt('designer.setting.contentHeight')">
      <a-input type="text" v-model:value="optionModel.contentHeight"></a-input>
    </a-form-item>
  </div>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "rich-editor-contentHeight-editor",
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
