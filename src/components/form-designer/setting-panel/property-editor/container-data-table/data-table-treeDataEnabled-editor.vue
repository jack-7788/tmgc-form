<template>
  <a-form-item :label="i18nt('designer.setting.treeDataEnabled')">
    <a-switch v-model:checked="optionModel.treeDataEnabled" @change="handleTDEChange" />
  </a-form-item>
  <a-form-item
    v-if="!!optionModel.treeDataEnabled"
    :label="i18nt('designer.setting.rowKeyOfTreeData')"
  >
    <a-input v-model:value="optionModel.rowKey" />
  </a-form-item>
  <a-form-item
    v-if="!!optionModel.treeDataEnabled"
    :label="i18nt('designer.setting.childrenKeyOfTreeData')"
  >
    <a-input v-model:value="optionModel.childrenKey" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'treeDataEnabled-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {};
    },
    methods: {
      handleTDEChange(val) {
        if (!!val) {
          this.optionModel.rowKey = 'id';
          this.optionModel.childrenKey = 'children';
        } else {
          this.optionModel.rowKey = '';
          this.optionModel.childrenKey = '';
        }
      }
    }
  };
</script>
