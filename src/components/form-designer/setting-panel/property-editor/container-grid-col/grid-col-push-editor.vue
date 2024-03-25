<template>
  <a-form-item :label="i18nt('designer.setting.colPushTitle')">
    <a-input-number v-model:value="optionModel.push" :min="0" :max="24" style="width: 100%" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'grid-col-push-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
