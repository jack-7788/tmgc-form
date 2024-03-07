<template>
  <a-form-item :label="i18nt('designer.setting.drawDirection')">
    <a-radio-group v-model:value="optionModel.direction" class="radio-group-custom">
      <a-radio-button value="rtl"><el-icon><Back /></el-icon></a-radio-button>
      <a-radio-button value="ltr"><el-icon><Right /></el-icon></a-radio-button>
      <a-radio-button value="ttb"><el-icon><Bottom /></el-icon></a-radio-button>
      <a-radio-button value="btt"><el-icon><Top /></el-icon></a-radio-button>
    </a-radio-group>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import { Bottom, Top, Back, Right } from '@element-plus/icons-vue'

  export default {
    name: "vf-drawer-direction-editor",
    mixins: [i18n],
    components: {
      Back, Right, Bottom, Top
    },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    computed: {
      //
    }
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
