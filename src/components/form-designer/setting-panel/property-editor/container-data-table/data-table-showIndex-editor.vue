<template>
  <a-form-item :label="i18nt('designer.setting.showIndex')">
    <a-switch v-model:checked="optionModel.showIndex" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'showIndex-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>
