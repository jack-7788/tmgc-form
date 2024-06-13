<template>
  <a-form-item :label="`tabs 之间的间隙`">
    <a-input-number
      class="t-w-full"
      :min="0"
      v-model:value="optionModel.tabBarGutter"
      :precision="0"
    />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'tab-tabBarGutter-editor',
    componentName: 'PropertyEditor',
    mixins: [i18n],
    components: {},
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {}
  };
</script>
