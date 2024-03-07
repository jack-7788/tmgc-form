<template>
  <a-form-item :label="i18nt('designer.setting.labelAlign')">
    <a-radio-group v-model:value="optionModel.labelAlign" class="radio-group-custom">
      <a-radio-button value="label-left-align">
        {{i18nt('designer.setting.leftAlign')}}</a-radio-button>
      <a-radio-button value="label-center-align">
        {{i18nt('designer.setting.centerAlign')}}</a-radio-button>
      <a-radio-button value="label-right-align">
        {{i18nt('designer.setting.rightAlign')}}</a-radio-button>
    </a-radio-group>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n";

  export default {
    name: "sub-form-labelAlign-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style lang="scss" scoped>
  .radio-group-custom {
    :deep(.el-radio-button__inner) {
      padding-left: 12px;
      padding-right: 12px;
    }
  }

</style>
