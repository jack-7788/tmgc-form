<template>
  <a-form-item :label="i18nt('designer.setting.drawDirection')">
    <a-radio-group v-model:value="optionModel.direction" class="radio-group-custom">
      <a-radio-button value="rtl">左</a-radio-button>
      <a-radio-button value="ltr">右</a-radio-button>
      <a-radio-button value="ttb">下</a-radio-button>
      <a-radio-button value="btt">上</a-radio-button>
    </a-radio-group>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "vf-drawer-direction-editor",
    mixins: [i18n],
    components: {
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
