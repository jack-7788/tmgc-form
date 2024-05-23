<template>
  <a-form-item :label="`语法模式`">
    <a-select v-model:value="optionModel.mode" :options="modeList" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'code-editor-mode-editor',
    componentName: 'PropertyEditor',
    mixins: [i18n],
    components: {},
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        modeList: [
          { value: 'javascript', label: 'javascript' },
          { value: 'json', label: 'json' },
          { value: 'groovy', label: 'groovy' },
          { value: 'css', label: 'css' }
        ],
        dataSetList: []
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {}
  };
</script>
