<template>
  <a-form-item :label="`页签类型`">
    <a-select v-model:value="optionModel.type" :options="modeList" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'tab-type-editor',
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
          { value: 'line', label: 'line' },
          { value: 'card', label: 'card' }
          // { value: 'editable-card', label: 'editable-card' }
        ]
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {}
  };
</script>
