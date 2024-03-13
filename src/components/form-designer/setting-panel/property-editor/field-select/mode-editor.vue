<template>
  <a-form-item :label="'模式'">
    <a-select v-model:value="optionModel.mode" :options="modeList" @change="changeMode" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'mode-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        modeList: [
          { value: 'combobox', label: '列表模式' },
          { value: 'multiple', label: '多选模式' },
          { value: 'tags', label: '标签模式' }
        ]
      };
    },
    methods: {
      changeMode(val) {
        console.log('val: ', val);
        if (['multiple', 'tags'].includes(val)) {
          this.optionModel.defaultValue = [];
        } else {
          this.optionModel.defaultValue = null;
        }
        console.log(' this.optionModel: ', this.optionModel);
      }
    }
  };
</script>

<style scoped></style>
