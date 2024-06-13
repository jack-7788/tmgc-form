<template>
  <a-form-item :label="`页签位置`">
    <a-select v-model:value="optionModel.tabPosition" :options="modeList" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'tab-tabPosition-editor',
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
          { value: 'top', label: 'top' },
          { value: 'right', label: 'right' },
          { value: 'bottom', label: 'bottom' },
          { value: 'left', label: 'left' }
        ]
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {}
  };
</script>
