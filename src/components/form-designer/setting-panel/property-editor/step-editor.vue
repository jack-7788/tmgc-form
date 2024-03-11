<template>
  <a-form-item :label="i18nt('designer.setting.step')">
    <a-input-number v-model:value="optionModel.step" class="hide-spin-button" style="width: 100%" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'step-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>
