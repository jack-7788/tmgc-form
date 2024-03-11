<template>
  <a-form-item :label="i18nt('designer.setting.inactiveColor')">
    <a-input
      style="padding: 0; width: 25px; height: 25px"
      v-model:value="optionModel.inactiveColor"
      @change="emitDefaultValueChange"
      type="color"
    />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'inactiveColor-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
