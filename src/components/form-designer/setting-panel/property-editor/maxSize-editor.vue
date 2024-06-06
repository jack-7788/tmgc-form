<template>
  <a-form-item :label="`文件大小(M)`">
    <a-input-number v-model:value="optionModel.maxSize" :min="1" :max="20" style="width: 100%" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'maxSize-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
