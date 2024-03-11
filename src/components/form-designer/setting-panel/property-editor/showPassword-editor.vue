<template>
  <a-form-item
    :label="i18nt('designer.setting.showPassword')"
    v-if="optionModel.type === 'password'"
  >
    <a-switch v-model:checked="optionModel.showPassword" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'showPassword-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>
