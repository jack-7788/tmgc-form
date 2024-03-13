<template>
  <div>
    <a-form-item :label="i18nt('designer.setting.gridColHeight')">
      <a-input-number
        v-model:value="optionModel.colHeight"
        @input="inputNumberHandler"
        :min="0"
        class="hide-spin-button"
      />
    </a-form-item>
  </div>
</template>

<script>
  import i18n from '@/utils/i18n';
  import propertyMixin from '@/components/form-designer/setting-panel/property-editor/propertyMixin';

  export default {
    name: 'colHeight-editor',
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
