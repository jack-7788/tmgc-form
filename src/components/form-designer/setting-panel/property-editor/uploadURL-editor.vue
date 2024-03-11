<template>
  <div>
    <a-form-item label-width="0">
      <a-divider class="custom-divider">{{i18nt('designer.setting.uploadSetting')}}</a-divider>
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.uploadURL')">
      <a-input type="text" v-model:value="optionModel.uploadURL"></a-input>
    </a-form-item>
  </div>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "uploadURL-editor",
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
