<template>
  <div>
    <a-form-item label-width="0">
      <a-divider class="custom-divider">{{i18nt('designer.setting.inputButton')}}</a-divider>
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.appendButton')">
      <a-switch v-model:checked="optionModel.appendButton"></a-switch>
    </a-form-item>
  </div>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "appendButton-editor",
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
