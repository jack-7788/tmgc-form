<template>
  <div>
    <a-form-item :label="i18nt('designer.setting.widgetColumnWidth')" v-show="!!isSubFormChildWidget()">
      <a-input type="text" v-model:value="optionModel.columnWidth"></a-input>
    </a-form-item>
  </div>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "columnWidth-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    inject: ['isSubFormChildWidget'],
  }
</script>

<style scoped>

</style>
