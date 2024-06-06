<template>
  <a-form-item :label="`文件类型`">
    <a-select v-model:value="optionModel.accept" allowClear mode="tags" :options="ops" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'accept-editor',
    componentName: 'PropertyEditor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        ops: [
          { value: '.doc', label: '.doc' },
          { value: '.docx', label: '.docx' },
          { value: '.xlsx', label: '.xlsx' },
          { value: '.xls', label: '.xls' },
          { value: '.pdf', label: '.pdf' },
          { value: '.pptx', label: '.pptx' },
          { value: '.dwg', label: '.dwg' },
          { value: '.jpg', label: '.jpg' },
          { value: '.png', label: '.png' }
        ]
      };
    }
  };
</script>

<style scoped></style>
