<template>
  <a-form-item :label="i18nt('designer.setting.customClass')">
    <a-select
      v-model:value="optionModel.customClass"
      allowClear
      mode="tags"
      :options="cssClassList"
    />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import { deepClone } from '@/utils/util';

  export default {
    name: 'customClass-editor',
    componentName: 'PropertyEditor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        cssClassList: []
      };
    },
    created() {
      this.cssClassList = deepClone(this.designer.getCssClassList());
      //监听表单css代码改动事件并重新加载！
      this.designer.handleEvent('form-css-updated', cssClassList => {
        this.cssClassList = cssClassList;
      });
    }
  };
</script>

<style scoped></style>
