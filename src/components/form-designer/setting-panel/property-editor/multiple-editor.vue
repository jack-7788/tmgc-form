<template>
  <a-form-item :label="`是否可多选`">
    <a-switch v-model:checked="optionModel.multiple" @change="changeMultiple" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'multiple-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    methods: {
      changeMultiple(val) {
        if (!!this.designer && !!this.designer.formWidget) {
          const fieldWidget = this.designer.formWidget.getWidgetRef(this.optionModel.name);
          if (!!fieldWidget && !!fieldWidget.refreshDefaultValue) {
            if (val) {
              this.optionModel.defaultValue = [];
            } else {
              this.optionModel.defaultValue = null;
            }
            fieldWidget.refreshDefaultValue();
          }
        }
      }
    }
  };
</script>

<style scoped></style>
