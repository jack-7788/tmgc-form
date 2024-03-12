<template>
  <a-form-item :label="i18nt('designer.setting.labelIconPosition')">
    <a-select v-model:value="optionModel.labelIconPosition">
      <a-select-option
        v-for="item in labelIconPosition"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        {{ item.label }}
      </a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'labelIconPosition-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        labelIconPosition: [
          { label: '标签前面', value: 'front' },
          { label: '标签后面', value: 'rear' }
        ]
      };
    }
  };
</script>

<style scoped></style>
