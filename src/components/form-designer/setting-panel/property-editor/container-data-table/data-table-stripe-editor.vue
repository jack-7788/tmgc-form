<template>
  <a-form-item :label="i18nt('designer.setting.stripe')">
    <a-switch v-model:checked="optionModel.stripe" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'stripe-editor',
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
