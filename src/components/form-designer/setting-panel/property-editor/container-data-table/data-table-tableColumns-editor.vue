<template>
  <a-form-item :label="'表格列编辑'">
    <a-button type="primary" shape="round" @click="openSetting">
      {{ i18nt('designer.setting.editAction') }}
    </a-button>
  </a-form-item>
  <a-modal
    :title="i18nt('designer.setting.tableColEdit')"
    v-model:visible="dialogVisible"
    :show-close="true"
    dialogClass="drag-dialog"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    width="1250px"
  >
    <a-table
      :dataSource="optionModel.tableColumns"
      style="width: 100%"
      :cell-style="{ padding: '3px 0' }"
      height="500"
      :row-key="r => r.columnId"
      id="singleTable"
      :scroll="{ y: 300, x: 300 }"
      :pagination="false"
    >
      <a-table-column
        title="序号"
        :width="42"
        fixed="left"
        :customRender="({ index }) => index + 1"
      />
      <a-table-column title="排序" :width="40">
        <i class="iconfont icon-drag drag-option"></i>
      </a-table-column>
      <a-table-column
        :title="i18nt('designer.setting.columnName')"
        :width="100"
        dataIndex="dataIndex"
      >
        <template #default="scope">
          <a-input v-model:value="scope.record.dataIndex" style="width: 90%" />
        </template>
      </a-table-column>
      <a-table-column :title="i18nt('designer.setting.columnLabel')" :width="100" dataIndex="title">
        <template #default="scope">
          <a-input v-model:value="scope.record.title" style="width: 90%" />
        </template>
      </a-table-column>
      <a-table-column :title="i18nt('designer.setting.columnWidth')" :width="100" dataIndex="width">
        <template #default="scope">
          <a-input-number :min="20" :max="500" v-model:value="scope.record.width" />
        </template>
      </a-table-column>
      <a-table-column :title="i18nt('designer.setting.visibleColumn')" :width="70" dataIndex="show">
        <template #default="scope">
          <a-switch v-model:checked="scope.record.show" />
        </template>
      </a-table-column>
      <a-table-column
        :title="i18nt('designer.setting.sortableColumn')"
        :width="70"
        dataIndex="sorter"
      >
        <template #default="scope">
          <a-switch v-model:checked="scope.record.sorter" />
        </template>
      </a-table-column>
      <a-table-column :title="'超过宽度将自动省略'" :width="70" dataIndex="ellipsis">
        <template #default="scope">
          <a-switch v-model:checked="scope.record.ellipsis" />
        </template>
      </a-table-column>
      <a-table-column :title="i18nt('designer.setting.fixedColumn')" :width="100" dataIndex="fixed">
        <template #default="scope">
          <a-select v-model:value="scope.record.fixed" style="width: 90%" allowClear>
            <a-select-option value="left">左固定</a-select-option>
            <a-select-option value="right">右固定</a-select-option>
          </a-select>
        </template>
      </a-table-column>
      <a-table-column
        :title="i18nt('designer.setting.alignTypeOfColumn')"
        :width="100"
        dataIndex="align"
      >
        <template #default="scope">
          <a-select
            v-model:value="scope.record.align"
            :options="alignOptions"
            style="width: 100%"
          />
        </template>
      </a-table-column>
      <a-table-column align="center" :title="'自定义渲染函数'" :width="90" fixed="right">
        <template #default="scope">
          <a-button @click="showRenderDialog(scope.record)" size="small" shape="round">
            edit
          </a-button>
        </template>
      </a-table-column>
      <a-table-column
        align="center"
        :title="i18nt('designer.setting.actionColumn')"
        :width="120"
        fixed="right"
      >
        <template #default="scope">
          <a-space>
            <a-button
              :title="i18nt('designer.setting.addTableColumn')"
              size="small"
              @click="addCol"
              type="text"
            >
              {{ i18nt('designer.setting.addTableColumn') }}
            </a-button>
            <a-button
              v-if="optionModel.tableColumns.length !== 1"
              :title="i18nt('designer.setting.deleteTableColumn')"
              size="small"
              @click="handleDelete(scope.$index, scope.row)"
              type="text"
            >
              {{ i18nt('designer.setting.deleteTableColumn') }}
            </a-button>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
    <template #footer>
      <div class="dialog-footer">
        <a-button size="default" type="primary" @click="colSubmit">
          {{ i18nt('designer.hint.confirm') }}
        </a-button>
        <a-button size="default" @click="dialogVisible = false">
          {{ i18nt('designer.hint.cancel') }}
        </a-button>
      </div>
    </template>
  </a-modal>

  <CodeModalEditor
    v-model="renderJson"
    ref="CodeModalEditorRef"
    :title="i18nt('designer.setting.renderFunction')"
    :event-header="`function customRender(text, record, index, column) {`"
  />
</template>

<script>
  import i18n from '@/utils/i18n';
  import Sortable from 'sortablejs';
  import CodeModalEditor from '@/components/code-editor/code-modal-editor.vue';

  export default {
    name: 'tableColumns-editor',
    mixins: [i18n],
    components: { CodeModalEditor },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        dialogVisible: false,
        currentTableColumn: {},
        renderJson: '',
        showRenderDialogFlag: false,
        alignOptions: [
          { value: 'left', label: 'left' },
          { value: 'center', label: 'center' },
          { value: 'right', label: 'right' }
        ]
      };
    },
    methods: {
      //表格拖动排序
      dragSort() {
        const el = document.querySelectorAll(
          '#singleTable .ant-table-body tbody.ant-table-tbody '
        )[0];

        const tableData = this.optionModel.tableColumns;
        this.sortable = Sortable.create(el, {
          ghostClass: 'sortable-ghost',
          setData: function (dataTransfer) {
            dataTransfer.setData('Text', '');
          },
          onEnd: e => {
            const { oldIndex, newIndex } = e;
            if (oldIndex === newIndex) {
              return;
            }
            //e.oldIndex为拖动一行原来的位置，e.newIndex为拖动后新的位置
            const targetRow = tableData.splice(e.oldIndex - 1, 1)[0];
            tableData.splice(newIndex - 1, 0, targetRow);
          }
        });
      },
      showRenderDialog(tableColumn) {
        this.currentTableColumn = tableColumn;
        this.renderJson = tableColumn.customRender || '';
        // this.showRenderDialogFlag = true;
        this.$refs.CodeModalEditorRef.open();
      },
      saveColumnRender() {
        this.currentTableColumn.customRender = this.renderJson;
        this.showRenderDialogFlag = false;
      },
      addCol() {
        const newRow = {
          columnId: new Date().getTime(),
          show: true,
          width: 150,
          sorter: false,
          customRender: '',
          fixed: '',
          align: 'center',
          title: '标题名',
          dataIndex: ''
        };
        this.optionModel.tableColumns.push(newRow);
        this.designer.emitHistoryChange();
      },
      handleDelete(index, row) {
        if (this.optionModel.tableColumns.length === 1) {
          this.$message.warning(this.i18nt('designer.setting.onlyOneColumnCannotBeDeleted'));
          return false;
        }
        this.optionModel.tableColumns.splice(index, 1);
      },
      // 确认表格列更改
      colSubmit() {
        this.dialogVisible = false;
      },
      openSetting() {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.dragSort();
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .drag-option {
    cursor: move;
  }
</style>
