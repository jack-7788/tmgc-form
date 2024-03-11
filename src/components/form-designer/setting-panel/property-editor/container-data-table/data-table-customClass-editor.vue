<template>
  <div>
    <SelectionsEditor
      :optionModel="optionModel"
      :designer="designer"
      :selectedWidget="selectedWidget"
    />
    <RowKeyEditor
      :optionModel="optionModel"
      :designer="designer"
      :selectedWidget="selectedWidget"
    />
    <a-form-item :label="i18nt('designer.setting.tableWidth')">
      <a-input v-model:value="optionModel.tableWidth" />
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.tableHeight')">
      <a-input v-model:value="optionModel.tableHeight" />
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.customClass')">
      <a-select
        v-model:value="optionModel.customClass"
        multiple
        filterable
        allow-create
        default-first-option
      >
        <a-select-option
          v-for="(item, idx) in cssClassList"
          :key="idx"
          :label="item"
          :value="item"
        />
      </a-select>
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.showIndex')">
      <a-switch v-model:checked="optionModel.showIndex" />
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.showCheckBox')">
      <a-switch v-model:checked="optionModel.showCheckBox" />
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.showPagination')">
      <a-switch v-model:checked="optionModel.showPagination" />
    </a-form-item>
    <!-- <a-form-item
      :label="i18nt('designer.setting.smallPagination')"
      v-if="!!optionModel.showPagination"
    >
      <a-switch v-model:checked="optionModel.smallPagination" />
    </a-form-item> -->
    <!-- <a-form-item :label="i18nt('designer.setting.showSummary')">
      <a-switch v-model:checked="optionModel.showSummary" />
    </a-form-item> -->
    <a-form-item :label="i18nt('designer.setting.stripe')">
      <a-switch v-model:checked="optionModel.stripe" />
    </a-form-item>
    <!-- <a-form-item :label="i18nt('designer.setting.rowSpacing')">
      <a-input-number
        v-model:value="optionModel.rowSpacing"
        controls-position="right"
        :min="0"
        :max="20"
        style="width: 100%"
      />
    </a-form-item> -->
    <a-form-item :label="i18nt('designer.setting.widgetSize')">
      <a-select v-model:value="optionModel.tableSize" :options="widgetSizes" />
    </a-form-item>
    <a-form-item :label="'表格列编辑'">
      <a-button type="primary" plain shape="round" @click="openSetting">
        {{ i18nt('designer.setting.editAction') }}
      </a-button>
    </a-form-item>
    <a-form-item v-if="!optionModel.dsEnabled" :label="i18nt('designer.setting.tableDataEdit')">
      <a-button type="primary" plain shape="round" @click="openTableDataEdit">{{
        i18nt('designer.setting.editAction')
      }}</a-button>
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.dsEnabled')">
      <a-switch v-model:checked="optionModel.dsEnabled" />
    </a-form-item>
    <a-form-item v-if="!!optionModel.dsEnabled" :label="i18nt('designer.setting.dsName')">
      <a-select v-model:value="optionModel.dsName" filterable allowClear @change="getDataSetList">
        <a-select-option
          v-for="(item, idx) in dataSourceList"
          :key="idx"
          :title="item.description"
          :label="item.uniqueName"
          :value="item.uniqueName"
        />
      </a-select>
    </a-form-item>
    <a-form-item v-if="!!optionModel.dsEnabled" :label="i18nt('designer.setting.dataSetName')">
      <a-select v-model:value="optionModel.dataSetName" filterable allowClear>
        <a-select-option
          v-for="(item, idx) in dataSetList"
          :key="idx"
          :title="item.remark"
          :label="item.name"
          :value="item.name"
        />
      </a-select>
    </a-form-item>
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
    <a-form-item :label="i18nt('designer.setting.showButtonsColumn')">
      <a-switch v-model:checked="optionModel.showButtonsColumn" />
    </a-form-item>
    <a-form-item
      :label="i18nt('designer.setting.buttonsColumnEdit')"
      v-if="!!optionModel.showButtonsColumn"
    >
      <a-button type="primary" plain shape="round" @click="editButtonsColumn">
        {{ i18nt('designer.setting.editAction') }}
      </a-button>
    </a-form-item>

    <a-modal
      :title="i18nt('designer.setting.tableDataEdit')"
      v-model:visible="dataDialogVisible"
      :show-close="true"
      custom-class="drag-dialog small-padding-dialog"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      width="75%"
    >
      <code-editor :mode="'json'" :readonly="false" v-model="tableDataOptions" />
      <template #footer>
        <div class="dialog-footer">
          <a-button size="default" type="primary" @click="saveTableData">
            {{ i18nt('designer.hint.confirm') }}
          </a-button>
          <a-button size="default" @click="dataDialogVisible = false">
            {{ i18nt('designer.hint.cancel') }}
          </a-button>
        </div>
      </template>
    </a-modal>

    <a-modal
      :title="i18nt('designer.setting.tableColEdit')"
      v-model:visible="dialogVisible"
      :show-close="true"
      custom-class="drag-dialog small-padding-dialog"
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
      >
        <a-table-column :width="42" fixed="left" :customRender="({ index }) => index + 1" />
        <a-table-column title="排序" :width="30">
          <i class="iconfont icon-drag drag-option"></i>
        </a-table-column>
        <a-table-column title="columnId" dataIndex="columnId" :width="50" />
        <a-table-column
          :title="i18nt('designer.setting.columnName')"
          :width="100"
          dataIndex="dataIndex"
        >
          <template #default="scope">
            <a-input v-model:value="scope.record.dataIndex" />
          </template>
        </a-table-column>
        <a-table-column
          :title="i18nt('designer.setting.columnLabel')"
          :width="100"
          dataIndex="title"
        >
          <template #default="scope">
            <a-input v-model:value="scope.record.title" />
          </template>
        </a-table-column>
        <a-table-column
          :title="i18nt('designer.setting.columnWidth')"
          :width="100"
          dataIndex="width"
        >
          <template #default="scope">
            <a-input v-model:value="scope.record.width" />
          </template>
        </a-table-column>
        <a-table-column
          :title="i18nt('designer.setting.visibleColumn')"
          :width="70"
          dataIndex="show"
        >
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
        <a-table-column
          :title="i18nt('designer.setting.fixedColumn')"
          :width="100"
          dataIndex="fixed"
        >
          <template #default="scope">
            <a-select v-model:value="scope.record.fixed" style="width: 100%" allowClear>
              <a-select-option value="left">left</a-select-option>
              <a-select-option value="right">right</a-select-option>
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
        <el-table-column
          v-if="false"
          :label="i18nt('designer.setting.formatOfColumn')"
          width="200"
          prop="formatS"
        >
          <template #default="scope">
            <a-select v-model:value="scope.row.formatS" allowClear>
              <a-select-opt-group
                :label="i18nt('designer.setting.customRenderGroup')"
                key="custom-render-group"
              >
                <a-select-option value="render" label="render">render</a-select-option>
              </a-select-opt-group>
              <a-select-opt-group v-for="group in op" :key="group.label" :label="group.label">
                <a-select-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >{{ item.label }}
                </a-select-option>
              </a-select-opt-group>
            </a-select>
          </template>
        </el-table-column>
        <a-table-column :title="'自定义渲染函数'" :width="80" fixed="right">
          <template #default="scope">
            <a-button @click="showRenderDialog(scope.record)" size="small" plain shape="round">
              edit
            </a-button>
          </template>
        </a-table-column>
        <a-table-column :title="i18nt('designer.setting.actionColumn')" :width="100" fixed="right">
          <template #default="scope">
            <a-space>
              <a-button
                :title="i18nt('designer.setting.addTableColumn')"
                size="small"
                shape="circle"
                @click="addCol"
              >
                +
              </a-button>
              <a-button
                :title="i18nt('designer.setting.deleteTableColumn')"
                size="small"
                shape="circle"
                @click="handleDelete(scope.$index, scope.row)"
              >
                -
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

    <a-modal
      :title="i18nt('designer.setting.buttonsColumnEdit')"
      v-model:visible="showButtonsEditDialog"
      :show-close="true"
      custom-class="drag-dialog small-padding-dialog"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      width="1120px"
    >
      <a-form label-width="110" layout="horizontal" :model="optionModel">
        <a-row :gutter="8">
          <a-col :span="11">
            <a-form-item
              name="buttonsColumnTitle"
              :label="i18nt('designer.setting.buttonsColumnTitle')"
            >
              <a-input v-model:value="optionModel.buttonsColumnTitle" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              name="buttonsColumnWidth"
              :label="i18nt('designer.setting.buttonsColumnWidth')"
            >
              <a-input-number v-model:value="optionModel.buttonsColumnWidth" />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item name="buttonsColumnFixed" :label="i18nt('designer.setting.fixedColumn')">
              <a-select v-model:value="optionModel.buttonsColumnFixed" style="width: 100%">
                <a-select-option value="">false</a-select-option>
                <a-select-option value="left">left</a-select-option>
                <a-select-option value="right">right</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-divider content-position="left">{{
              i18nt('designer.setting.operationButtonsSetting')
            }}</a-divider>
          </a-col>
        </a-row>
        <draggable
          v-model="optionModel.operationButtons"
          item-key="id"
          v-bind="{ ghostClass: 'ghost', handle: '.drag-handler' }"
        >
          <template #item="{ element: btn, index: bIdx }">
            <a-row :gutter="8" class="button-row">
              <a-col :span="1" class="drag-sort-col">
                <i class="iconfont icon-drag drag-handler"></i>
              </a-col>
              <a-col :span="3">
                <a-form-item
                  :name="'operationButtons.' + bIdx + '.name'"
                  :label="i18nt('designer.setting.operationButtonName')"
                  :rules="nameRules"
                >
                  <a-input
                    v-model:value="btn.name"
                    @focus="onButtonNameFocus"
                    @change="event => onButtonNameChange(event.target.value, bIdx)"
                    :placeholder="i18nt('designer.setting.operationButtonName')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <a-form-item
                  :name="'operationButtons.' + bIdx + '.label'"
                  :label="i18nt('designer.setting.operationButtonLabel')"
                >
                  <a-input
                    v-model:value="btn.label"
                    :placeholder="i18nt('designer.setting.operationButtonLabel')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-form-item
                  :name="'operationButtons.' + bIdx + '.type'"
                  :label="i18nt('designer.setting.operationButtonType')"
                >
                  <a-select
                    v-model:value="btn.type"
                    :placeholder="i18nt('designer.setting.operationButtonType')"
                  >
                    <a-select-option value="text">text</a-select-option>
                    <a-select-option value="primary">primary</a-select-option>
                    <a-select-option value="success">success</a-select-option>
                    <a-select-option value="warning">warning</a-select-option>
                    <a-select-option value="danger">danger</a-select-option>
                    <a-select-option value="info">info</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <a-form-item
                  :name="'operationButtons.' + bIdx + '.size'"
                  :label="i18nt('designer.setting.operationButtonSize')"
                >
                  <a-select
                    v-model:value="btn.size"
                    :placeholder="i18nt('designer.setting.operationButtonSize')"
                  >
                    <a-select-option value="large">large</a-select-option>
                    <a-select-option value="default">default</a-select-option>
                    <a-select-option value="small">small</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <a-form-item
                  :name="'operationButtons.' + bIdx + '.round'"
                  :label="i18nt('designer.setting.operationButtonRound')"
                >
                  <a-switch v-model:checked="btn.round" />
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <a-form-item
                  :name="'operationButtons.' + bIdx + '.hidden'"
                  :label="i18nt('designer.setting.operationButtonHidden')"
                >
                  <a-switch v-model:checked="btn.hidden" />
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <a-form-item
                  :name="'operationButtons.' + bIdx + '.disabled'"
                  :label="i18nt('designer.setting.operationButtonDisabled')"
                >
                  <a-switch v-model:checked="btn.disabled" />
                </a-form-item>
              </a-col>
              <a-col :span="1">
                <a-button plain shape="circle" @click="deleteOperationButton(bIdx)">++</a-button>
              </a-col>
            </a-row>
          </template>
        </draggable>
        <a-row :gutter="0">
          <a-col :span="4">
            <a-button
              type="primary"
              size="default"
              plain
              shape="round"
              @click="addOperationButton"
              >{{ i18nt('designer.setting.addOperationButton') }}</a-button
            >
          </a-col>
        </a-row>
      </a-form>
      <template #footer>
        <div class="dialog-footer">
          <a-button size="default" @click="showButtonsEditDialog = false">{{
            i18nt('designer.hint.closePreview')
          }}</a-button>
        </div>
      </template>
    </a-modal>

    <a-modal
      :title="i18nt('designer.setting.renderFunction')"
      v-model:visible="showRenderDialogFlag"
      :show-close="true"
      custom-class="drag-dialog small-padding-dialog"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <a-alert
        type="info"
        :closable="false"
        message="function customRender(text, record, index, column) {"
      />
      <code-editor
        :mode="'javascript'"
        :readonly="false"
        v-model="renderJson"
        ref="dsResultEditor"
      />
      <a-alert type="info" :closable="false" message="}" />
      <template v-slot:footer>
        <div class="dialog-footer">
          <a-button size="default" type="primary" @click="saveColumnRender">
            {{ i18nt('designer.hint.confirm') }}</a-button
          >
          <a-button size="default" @click="showRenderDialogFlag = false">
            {{ i18nt('designer.hint.cancel') }}</a-button
          >
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import i18n from '@/utils/i18n';
  import { deepClone, generateId, getDSByName } from '@/utils/util';
  import Sortable from 'sortablejs';
  import CodeEditor from '@/components/code-editor/index';
  import SelectionsEditor from './data-table-selections-editor.vue';
  import RowKeyEditor from './data-table-rowKey-editor.vue';

  export default {
    name: 'data-table-customClass-editor',
    componentName: 'PropertyEditor',
    mixins: [i18n],
    components: {
      CodeEditor,
      SelectionsEditor,
      RowKeyEditor
    },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        dialogVisible: false,
        dataDialogVisible: false,
        showButtonsEditDialog: false,
        oldButtonName: '',
        cssClassList: [],
        tableDataOptions: [],
        dataSetList: [],
        widgetSizes: [
          { label: 'default', value: 'default' },
          { label: 'middle', value: 'middle' },
          { label: 'small', value: 'small' }
        ],
        alignOptions: [
          {
            value: 'left',
            label: 'left'
          },
          {
            value: 'center',
            label: 'center'
          },
          {
            value: 'right',
            label: 'right'
          }
        ],
        fieldTypeOptions: [
          {
            value: 'text',
            label: 'Text'
          },
          {
            value: 'number',
            label: 'Number'
          },
          {
            value: 'date',
            label: 'Date'
          }
        ],
        op: [
          {
            label: 'Date Format',
            options: [
              { value: 'd1', label: 'YYYY-MM-DD' },
              { value: 'd2', label: 'YYYY/MM/DD' },
              { value: 'd3', label: 'YYYY年MM月DD日' },
              { value: 'd4', label: 'YYYY-MM-DD HH:mm:ss' },
              { value: 'd5', label: 'YYYY-MM-DD hh:mm:ss' }
            ]
          },
          {
            label: 'Number Format',
            options: [
              { value: 'n1', label: '###,###,###,##0.######' },
              { value: 'n2', label: '###,###,###,##0.00####' },
              { value: 'n3', label: '###,###,###,##0.000000' },
              { value: 'n4', label: '###,###,###,##0.000' },
              { value: 'n5', label: '###,###,###,##0.00' },
              { value: 'n6', label: '###,###,###,##0' },
              { value: 'n7', label: '###,##0.00##%' }
            ]
          }
        ],

        showRenderDialogFlag: false,
        renderJson: '',
        currentTableColumn: null,

        nameRules: [
          {
            required: true,
            trigger: ['blur', 'change'],
            message: this.i18nt('designer.setting.fieldValueRequired')
          }
        ]
      };
    },
    computed: {
      dataSourceList() {
        if (!this.designer.formConfig || !this.designer.formConfig.dataSources) {
          return [];
        } else {
          return this.designer.formConfig.dataSources;
        }
      }
    },
    watch: {
      selectedWidget: {
        handler(val, oldVal) {
          if (!val) {
            return;
          }

          this.loadDataSet(val.options.dsName);
        },
        immediate: true
      }
    },
    created() {
      this.cssClassList = deepClone(this.designer.getCssClassList());
      //监听表单css代码改动事件并重新加载！
      this.designer.handleEvent('form-css-updated', cssClassList => {
        this.cssClassList = cssClassList;
      });
    },
    mounted() {
      // this.dragSort()
    },
    methods: {
      //表格拖动排序
      dragSort() {
        const [el] = document.querySelectorAll('#singleTable tbody');

        const tableData = this.optionModel.tableColumns;
        this.sortable = Sortable.create(el, {
          ghostClass: 'sortable-ghost',
          setData: function (dataTransfer) {
            dataTransfer.setData('Text', '');
          },
          onEnd: e => {
            //e.oldIndex为拖动一行原来的位置，e.newIndex为拖动后新的位置
            const targetRow = tableData.splice(e.oldIndex, 1)[0];
            tableData.splice(e.newIndex, 0, targetRow);
            const dragId = tableData[e.newIndex].id; //拖动行的id
            let oneId, twoId;
            //拖动行的前一行
            if (tableData[e.newIndex - 1]) {
              oneId = tableData[e.newIndex - 1].id;
            } else {
              oneId = '';
            }
            //拖动行的后一行
            if (tableData[e.newIndex + 1]) {
              twoId = tableData[e.newIndex + 1].id;
            } else {
              twoId = '';
            }
          }
        });
      },

      openTableDataEdit() {
        this.dataDialogVisible = true;
        this.tableDataOptions = JSON.stringify(this.optionModel.dataSource, null, '  ');
      },

      saveTableData() {
        try {
          this.optionModel.dataSource = JSON.parse(this.tableDataOptions);
          this.dataDialogVisible = false;
        } catch (ex) {
          this.$message.error(this.i18nt('designer.hint.invalidOptionsData') + ex.message);
        }
      },

      openSetting() {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.dragSort();
        });
      },

      // 确认表格列更改
      colSubmit() {
        this.dialogVisible = false;
      },

      addCol() {
        const newRow = { columnId: new Date().getTime(), show: false };
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

      showRenderDialog(tableColumn) {
        this.currentTableColumn = tableColumn;
        this.renderJson = tableColumn.customRender || '';
        this.showRenderDialogFlag = true;
      },

      saveColumnRender() {
        this.currentTableColumn.customRender = this.renderJson;
        this.showRenderDialogFlag = false;
      },

      onButtonNameFocus(event) {
        console.log('test', event);
        this.oldButtonName = event.target.value;
      },

      onButtonNameChange(newName, btnIdx) {
        let sameNameFlag = false;
        this.optionModel.operationButtons.map((tb, tbIdx) => {
          if (tb.name === newName && tbIdx !== btnIdx) {
            sameNameFlag = true;
          }
        });
        if (sameNameFlag) {
          this.$message.error(this.i18nt('designer.setting.operationButtonDuplicatedNameError'));
          this.optionModel.operationButtons[btnIdx].name = this.oldButtonName;
        }
      },

      editButtonsColumn() {
        this.showButtonsEditDialog = true;
      },

      deleteOperationButton(idx) {
        this.$confirm(
          this.i18nt('designer.setting.deleteOperationButtonHint'),
          this.i18nt('render.hint.prompt'),
          {
            confirmButtonText: this.i18nt('render.hint.confirm'),
            cancelButtonText: this.i18nt('render.hint.cancel')
          }
        )
          .then(() => {
            this.optionModel.operationButtons.splice(idx, 1);
          })
          .catch(error => {
            //this.$message.error(error)
          });
      },

      addOperationButton() {
        this.optionModel.operationButtons = this.optionModel.operationButtons || [];
        this.optionModel.operationButtons.push({
          name: 'btn' + generateId(),
          label: 'new btn',
          type: 'text',
          size: 'small',
          round: false,
          hidden: false,
          disabled: false
        });
      },

      loadDataSet(dsName) {
        this.dataSetList.length = 0;
        if (!dsName) {
          return;
        }

        const dsModel = getDSByName(this.designer.formConfig, dsName);
        if (!!dsModel && !!dsModel.dataSets) {
          dsModel.dataSets.forEach(dSet => {
            this.dataSetList.push({
              name: dSet.name,
              remark: dSet.remark
            });
          });
        }
      },

      getDataSetList() {
        this.optionModel.dataSetName = '';
        this.loadDataSet(this.optionModel.dsName);
      },

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

<style lang="scss" scoped>
  li.col-item {
    list-style: none;

    span.col-span-title {
      display: inline-block;
      font-size: 13px;
      width: 120px;
    }

    .col-delete-button {
      margin-left: 6px;
    }
  }

  .panes-setting {
    ul {
      padding-inline-start: 0;
      padding-left: 0; /* 重置IE11默认样式 */
      margin: 0;
    }

    .drag-option {
      cursor: move;
    }

    li.ghost {
      background: #fff;
      border: 2px dotted $--color-primary;
    }
  }

  .small-padding-dialog {
    :deep(.el-dialog__body) {
      padding: 6px 15px 12px 15px !important;
    }

    :deep(.ace-container) {
      border: 1px solid #dcdfe6;
    }

    .dialog-footer {
      text-align: center;
    }
  }

  .button-row {
    border-bottom: 1px solid #e1e2e3;
    margin-bottom: 12px;
  }

  .drag-sort-col {
    padding-top: 8px;
    cursor: move;
  }
</style>
