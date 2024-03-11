<template>
  <div>
    <a-form-item :label="i18nt('designer.setting.colSpanTitle')" v-if="!optionModel.responsive">
      <a-input-number v-model:value="optionModel.span" :min="1" :max="24"
                       style="width: 100%"></a-input-number>
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.colSpanTitle') + '(PC)'"
                  v-if="!!optionModel.responsive && (formConfig.layoutType === 'PC')">
      <a-input-number v-model:value="optionModel.md" :min="1" :max="24"
                       style="width: 100%"></a-input-number>
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.colSpanTitle') + '(Pad)'"
                  v-if="!!optionModel.responsive && (formConfig.layoutType === 'Pad')">
      <a-input-number v-model:value="optionModel.sm" :min="1" :max="24"
                       style="width: 100%"></a-input-number>
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.colSpanTitle') + '(H5)'"
                  v-if="!!optionModel.responsive && (formConfig.layoutType === 'H5')">
      <a-input-number v-model:value="optionModel.xs" :min="1" :max="24"
                       style="width: 100%"></a-input-number>
    </a-form-item>
  </div>
</template>

<script>
  import i18n from "@/utils/i18n";

  export default {
    name: "grid-col-span-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    computed: {
      formConfig() {
        return this.designer.formConfig
      },


    }
  }
</script>

<style scoped>

</style>
