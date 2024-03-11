<template>
  <a-form-item :label="i18nt('designer.setting.actionColumnPosition')">
    <a-radio-group v-model:value="optionModel.actionColumnPosition" class="radio-group-custom">
      <a-radio-button value="left"> {{ i18nt('designer.setting.leftAlign') }}</a-radio-button>
      <a-radio-button value="right"> {{ i18nt('designer.setting.rightAlign') }}</a-radio-button>
    </a-radio-group>
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'actionColumnPosition-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    computed: {
      noLabelSetting() {
        return (
          this.selectedWidget.type === 'static-text' || this.selectedWidget.type === 'html-text'
        );
        //|| (this.selectedWidget.type === 'divider')
      }
    }
  };
</script>

<style lang="scss" scoped>
  .radio-group-custom {
    :deep(.el-radio-button__inner) {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
</style>
