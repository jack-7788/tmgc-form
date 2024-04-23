<template>
  <a-form-item :label="`下拉菜单选项设置`">
    <a-button type="primary" shape="round" @click="openTableDataEdit">
      {{ i18nt('designer.setting.editAction') }}
    </a-button>
  </a-form-item>

  <CodeModalEditor
    ref="CodeModalEditorRef"
    mode="json"
    :readonly="false"
    v-model="tableDataOptions"
    :title="i18nt('designer.setting.tableDataEdit')"
    @save="saveTableData"
  />
</template>

<script>
  import i18n from '@/utils/i18n';
  import CodeModalEditor from '@/components/code-editor/code-modal-editor.vue';

  export default {
    name: 'menuList-editor',
    mixins: [i18n],
    components: { CodeModalEditor },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        tableDataOptions: ''
      };
    },
    methods: {
      saveTableData() {
        try {
          this.optionModel.menuList = JSON.parse(this.tableDataOptions);
        } catch (ex) {
          this.$message.error(this.i18nt('designer.hint.invalidOptionsData') + ex.message);
        }
      },
      openTableDataEdit() {
        this.tableDataOptions = JSON.stringify(this.optionModel.menuList, null, '  ');
        this.$refs.CodeModalEditorRef.open(this.tableDataOptions);
      }
    }
  };
</script>
