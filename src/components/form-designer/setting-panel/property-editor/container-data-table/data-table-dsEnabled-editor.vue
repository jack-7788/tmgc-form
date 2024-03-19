<template>
  <a-form-item :label="i18nt('designer.setting.dsEnabled')">
    {{ tableDataOptions }}
    <a-switch v-model:checked="optionModel.dsEnabled" />
  </a-form-item>
  <a-form-item v-if="!optionModel.dsEnabled" :label="i18nt('designer.setting.tableDataEdit')">
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
  <HttpEditor
    v-if="!!optionModel.dsEnabled"
    :designer="designer"
    :selected-widget="selectedWidget"
    :optionModel="optionModel"
  />
</template>

<script>
  import i18n from '@/utils/i18n';
  import HttpEditor from '@/components/http-editor/index.vue';
  import CodeModalEditor from '@/components/code-editor/code-modal-editor.vue';

  export default {
    name: 'data-table-dsEnabled-editor',
    mixins: [i18n],
    components: { HttpEditor, CodeModalEditor },
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
          this.optionModel.dataSource = JSON.parse(this.tableDataOptions);
        } catch (ex) {
          this.$message.error(this.i18nt('designer.hint.invalidOptionsData') + ex.message);
        }
      },
      openTableDataEdit() {
        this.tableDataOptions = JSON.stringify(this.optionModel.dataSource, null, '  ');
        this.$refs.CodeModalEditorRef.open(this.tableDataOptions);
      }
    }
  };
</script>
