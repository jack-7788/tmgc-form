<template>
  <container-item-wrapper
    :style="{ display: 'flex', height: parseFloat(tableHeight || 0) + 'px' }"
    v-show="!widget.options.hidden"
    :widget="widget"
  >
    <a-table
      class="tpf-table"
      ref="dataTable2"
      :dataSource="widget.options.dataSource"
      :rowKey="record => record[widget.options.rowKey]"
      :scroll="{ y: parseFloat(tableHeight || 0), x: 300 }"
      :class="[customClass]"
      :size="widgetSize"
      :bordered="widget.options.border"
      :style="{ width: widget.options.tableWidth }"
      :row-class-name="rowClassName"
      :rowSelection="handleRowSelection(widget.options.rowSelection)"
      :pagination="fmtPagination()"
      :customRow="handleCustomRow"
      @change="handleTablePageChange"
    >
      <a-table-column
        v-if="widget.options.showIndex"
        title="序号"
        align="left"
        :width="80"
        fixed="left"
        :customRender="customRenderIndex"
      />
      <template v-for="(item, index) in widget.options.tableColumns">
        <a-table-column v-if="item.show !== false" :key="index" v-bind="handleColumnItem(item)" />
      </template>
      <template v-if="!!widget.options.showButtonsColumn">
        <a-table-column
          :fixed="'right'"
          class-name="data-table-buttons-column"
          :align="'center'"
          :title="widget.options.buttonsColumnTitle"
          :width="widget.options.buttonsColumnWidth"
        >
          <template #default="scope">
            <a-button
              v-for="(ob, inx) in widget.options.operationButtons"
              v-show="showOperationButton(ob, scope.index, scope.record)"
              :key="inx"
              :type="ob.type"
              :size="ob.size"
              :shape="ob.shape"
              :disabled="disableOperationButton(ob, scope.index, scope.record)"
              @click="handleOperationButtonClick(ob.name, scope.index, scope.record, scope, ob)"
              :class="['data-table-' + ob.name + '-button']"
            >
              {{ getOperationButtonLabel(ob, scope.index, scope.record) }}
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </container-item-wrapper>
</template>

<script>
  import ContainerItemWrapper from '@/components/form-render/container-item/container-item-wrapper.vue';
  import emitter from '@/utils/emitter';

  import i18n from '@/utils/i18n';

  import FieldComponents from '@/components/form-designer/form-widget/field-widget/index';
  import refMixin from '@/components/form-render/refMixin';
  import containerItemMixin from '@/components/form-render/container-item/containerItemMixin';
  import TableColumnCustomRender from '@/components/form-render/table-column-custom-render';
  import { deepClone, getDSByName, overwriteObj, runDataSourceRequest } from '@/utils/util';
  import { omit } from 'lodash-es';
  import useDataTableMixin from '@/mixins/useDataTableMixin';

  export default {
    name: 'DataTableItem',
    componentName: 'ContainerItem', // 必须固定为ContainerItem，用于接收父级组件的broadcast事件
    mixins: [emitter, i18n, refMixin, containerItemMixin, useDataTableMixin],
    components: {
      ContainerItemWrapper,
      ...FieldComponents
    },
    props: {
      widget: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,

      subFormRowIndex: {
        /* 子表单组件行索引，从0开始计数 */ type: Number,
        default: -1
      },
      subFormColIndex: {
        /* 子表单组件列索引，从0开始计数 */ type: Number,
        default: -1
      },
      subFormRowId: {
        /* 子表单组件行Id，唯一id且不可变 */ type: String,
        default: ''
      }
    },
    inject: ['refList', 'sfRefList', 'globalModel', 'getFormConfig', 'getGlobalDsv'],
    data() {
      return {
        // selectAllFlag: false,
        // selectedIndices: [],
        // selectedRows: []
        // pageSize: this.widget.options.pagination.pageSize,
        // pageSizes: this.widget.options.pagination.pageSizes,
        // currentPage: this.widget.options.pagination.currentPage,
        // total: this.widget.options.pagination.total,
        // 是否跳过selectionChange事件
        // skipSelectionChangeEvent: false
      };
    },
    computed: {
      formConfig() {
        return this.getFormConfig();
      }

      // paginationLayout() {
      //   return !!this.widget.options.smallPagination
      //     ? 'prev, pager, next'
      //     : 'total, sizes, prev, pager, next, jumper';
      // },

      // customClass() {
      //   return this.widget.options.customClass || '';
      // },

      // widgetSize() {
      //   return this.widget.options.tableSize || 'default';
      // },

      // singleRowSelectFlag() {
      //   return !this.widget.options.showCheckBox;
      // },

      // buttonsColumnFixed() {
      //   if (this.widget.options.buttonsColumnFixed === undefined) {
      //     return 'right';
      //   }

      //   return !this.widget.options.buttonsColumnFixed
      //     ? false
      //     : this.widget.options.buttonsColumnFixed;
      // },

      // tableHeight() {
      //   return this.widget.options.tableHeight || undefined;
      // }

      // selectionWidth() {
      //   return !this.widget.options.showSummary
      //     ? !this.widget.options.treeDataEnabled
      //       ? 42
      //       : 70
      //     : 53;
      // }
    },
    created() {
      this.initRefList();
      this.handleOnCreated();
    },
    mounted() {
      this.loadDataTableDataSource();
      // if (!!this.widget.options.dsEnabled) {
      //   this.loadDataFromDS({});
      // }

      this.$nextTick(() => {
        this.handleOnMounted();
      });
    },
    beforeUnmount() {
      this.unregisterFromRefList();
    },
    methods: {
      // handleRowSelection(info) {
      //   if (!info.hasRowSelection) {
      //     return undefined;
      //   }
      //   return {
      //     ...omit(info, ['onChange']),
      //     onChange: (selectedRowKeys, selectedRows) => {
      //       console.log('选择了操作: ', selectedRowKeys, selectedRows);
      //       const rcFunc = new Function('selectedRowKeys', 'selectedRows', info.onChange);
      //       rcFunc.call(this, selectedRowKeys, selectedRows);
      //     }
      //   };
      // },
      getDataTableRef() {
        return this;
      },

      selectWidget(widget) {
        this.designer.setSelected(widget);
      },

      // renderHeader(h, { column, $index }) {
      //   // debugger
      //   // console.log('column=====', column)
      //   let colCount = 0;
      //   if (this.widget.options.showIndex) {
      //     colCount++;
      //   }
      //   if (this.widget.options.showCheckBox) {
      //     colCount++;
      //   }

      //   column.formatS = this.widget.options.tableColumns[$index - colCount].formatS;
      //   return column.label;
      // },

      // formatter(row, column, cellValue) {
      //   return cellValue;
      // },

      // getColumnRender(row, column) {
      //   /* TODO: 每个table-cell，render函数会执行2次，原因不明！！！ */
      //   return new Function('h', 'params', 'components', column.render);
      // },

      /* 注意：在加载树形结构数据时，此方法只能获取第一级选中节点，选择子节点时返回-1，应在文档中加以说明！！！ */
      // getRowIndex(row) {
      //   return this.widget.options.tableData.lastIndexOf(row);
      // },

      // findColumnAndSetHidden(columnName, hiddenFlag) {
      //   this.widget.options.tableColumns.forEach(tc => {
      //     if (tc.prop === columnName) {
      //       tc.show = !hiddenFlag;
      //     }
      //   });
      // },

      handleOnCreated() {
        if (!!this.widget.options.onCreated) {
          const customFunc = new Function(this.widget.options.onCreated);
          customFunc.call(this);
        }
      },

      handleOnMounted() {
        if (!!this.widget.options.onMounted) {
          const customFunc = new Function(this.widget.options.onMounted);
          customFunc.call(this);
        }
      },

      // handleCurrentChange(currentRow, oldCurrentRow) {
      //   if (!!this.skipSelectionChangeEvent) {
      //     return;
      //   }

      //   if (!!this.widget.options.showCheckBox) {
      //     return;
      //   }

      //   this.selectedIndices.length = 0;
      //   this.selectedRows.length = 0;
      //   const rowIndex = this.getRowIndex(currentRow);
      //   this.selectedIndices.push(rowIndex);
      //   this.selectedRows.push(currentRow);

      //   if (!!this.widget.options.onSelectionChange) {
      //     const customFn = new Function(
      //       'selection',
      //       'selectedIndices',
      //       this.widget.options.onSelectionChange
      //     );
      //     customFn.call(this, [currentRow], this.selectedIndices);
      //   } else {
      //     /* 必须调用mixins中的dispatch方法逐级向父组件发送消息！！ */
      //     this.dispatch('VFormRender', 'dataTableSelectionChange', [
      //       this,
      //       [currentRow],
      //       this.selectedIndices
      //     ]);
      //   }
      // },

      /**
       * 注意：加载树形数据后，选中行如包含子节点则会触发两次该事件！！
       * @param selection
       */
      // handleSelectionChange(selection) {
      //   if (!!this.skipSelectionChangeEvent) {
      //     return;
      //   }

      //   this.selectedIndices.length = 0;
      //   this.selectedRows.length = 0;
      //   selection.map(row => {
      //     const rowIndex = this.getRowIndex(row);
      //     this.selectedIndices.push(rowIndex);
      //     this.selectedRows.push(row);
      //   });

      //   if (!!this.widget.options.onSelectionChange) {
      //     const customFn = new Function(
      //       'selection',
      //       'selectedIndices',
      //       this.widget.options.onSelectionChange
      //     );
      //     customFn.call(this, selection, this.selectedIndices);
      //   } else {
      //     /* 必须调用mixins中的dispatch方法逐级向父组件发送消息！！ */
      //     this.dispatch('VFormRender', 'dataTableSelectionChange', [
      //       this,
      //       selection,
      //       this.selectedIndices
      //     ]);
      //   }
      // },

      // handleSortChange({ column, prop, order }) {
      // this.dispatch('VFormRender', 'dataTableSortChange',
      // 				[this, column, prop, order, this.pageSize, this.currentPage])
      //
      // console.log('test====', prop)
      // },

      // handlePageSizeChange(pageSize) {
      //   this.pageSize = pageSize;
      //   if (!!this.widget.options.dsEnabled && !!this.widget.options.dsName) {
      //     this.loadDataFromDS();
      //   }

      //   if (!!this.widget.options.onPageSizeChange) {
      //     const customFn = new Function(
      //       'pageSize',
      //       'currentPage',
      //       this.widget.options.onPageSizeChange
      //     );
      //     customFn.call(this, pageSize, this.currentPage);
      //   } else {
      //     this.dispatch('VFormRender', 'dataTablePageSizeChange', [
      //       this,
      //       pageSize,
      //       this.currentPage
      //     ]);
      //   }
      // },

      // handleCurrentPageChange(currentPage) {
      //   this.currentPage = currentPage;
      //   if (!!this.widget.options.dsEnabled && !!this.widget.options.dsName) {
      //     this.loadDataFromDS();
      //   }

      //   if (!!this.widget.options.onCurrentPageChange) {
      //     const customFn = new Function(
      //       'pageSize',
      //       'currentPage',
      //       this.widget.options.onCurrentPageChange
      //     );
      //     customFn.call(this, this.pageSize, currentPage);
      //   } else {
      //     this.dispatch('VFormRender', 'dataTablePageChange', [this, this.pageSize, currentPage]);
      //   }
      // },
      // customRenderIndex({ index }) {
      //   return index + 1;
      // },
      // handleTablePageChange(pagination, filters, sorter, { currentDataSource }) {
      //   console.log('pagination: ', pagination);
      //   const fn = this.widget.options.onTableChange;
      //   this.widget.options.pagination.current = pagination.current;
      //   this.widget.options.pagination.pageSize = pagination.pageSize;
      //   if (fn) {
      //     const changeFunc = new Function(
      //       'pagination',
      //       'filters',
      //       'sorter',
      //       'currentDataSource',
      //       fn
      //     );
      //     changeFunc.call(this, pagination, filters, sorter, {
      //       currentDataSource
      //     });
      //   }
      // },

      // handleOperationButtonClick(btnName, rowIndex, row, scope, ob) {
      //   this.skipSelectionChangeEvent = true;
      //   try {
      //     if (ob.onClick) {
      //       const clcFn = new Function('record', 'index', 'column', 'btn', ob.onClick);
      //       clcFn.call(this, row, rowIndex, scope.column, ob);

      //       return;
      //     }
      //     if (!!this.widget.options.onOperationButtonClick) {
      //       const customFn = new Function(
      //         'buttonName',
      //         'rowIndex',
      //         'row',
      //         this.widget.options.onOperationButtonClick
      //       );
      //       customFn.call(this, btnName, rowIndex, row);
      //     } else {
      //       this.dispatch('VFormRender', 'operationButtonClick', [this, btnName, rowIndex, row]);
      //     }
      //   } finally {
      //     this.skipSelectionChangeEvent = false;
      //   }
      // },

      // showOperationButton(buttonConfig, rowIndex, row) {
      //   if (!!this.widget.options.onHideOperationButton) {
      //     const customFn = new Function(
      //       'buttonConfig',
      //       'rowIndex',
      //       'row',
      //       this.widget.options.onHideOperationButton
      //     );
      //     return !customFn.call(this, buttonConfig, rowIndex, row);
      //   } else {
      //     return !buttonConfig.hidden;
      //   }
      // },

      // disableOperationButton(buttonConfig, rowIndex, row) {
      //   if (!!this.widget.options.onDisableOperationButton) {
      //     const customFn = new Function(
      //       'buttonConfig',
      //       'rowIndex',
      //       'row',
      //       this.widget.options.onDisableOperationButton
      //     );
      //     return customFn.call(this, buttonConfig, rowIndex, row);
      //   } else {
      //     return buttonConfig.disabled;
      //   }
      // },

      // getRowClassName({ row, rowIndex }) {
      //   if (!!this.widget.options.onGetRowClassName) {
      //     const customFn = new Function('rowIndex', 'row', this.widget.options.onGetRowClassName);
      //     return customFn.call(this, rowIndex, row);
      //   } else {
      //     return '';
      //   }
      // },

      // getSpanMethod({ row, column, rowIndex, columnIndex }) {
      //   if (!!this.widget.options.onGetSpanMethod) {
      //     const customFn = new Function(
      //       'row',
      //       'column',
      //       'rowIndex',
      //       'columnIndex',
      //       this.widget.options.onGetSpanMethod
      //     );
      //     return customFn.call(this, row, column, rowIndex, columnIndex);
      //   }
      // },

      // handleHeaderClick(column, event) {
      //   if (!!this.widget.options.onHeaderClick) {
      //     const customFn = new Function('column', 'event', this.widget.options.onHeaderClick);
      //     return customFn.call(this, column, event);
      //   }
      // },

      // handleRowClick(row, column, event) {
      //   if (!!this.widget.options.onRowClick) {
      //     const customFn = new Function('row', 'column', 'event', this.widget.options.onRowClick);
      //     return customFn.call(this, row, column, event);
      //   }
      // },

      // handleRowDoubleClick(row, column, event) {
      //   if (!!this.widget.options.onRowDoubleClick) {
      //     const customFn = new Function(
      //       'row',
      //       'column',
      //       'event',
      //       this.widget.options.onRowDoubleClick
      //     );
      //     return customFn.call(this, row, column, event);
      //   }
      // },

      // handleCellClick(row, column, cell, event) {
      //   if (!!this.widget.options.onCellClick) {
      //     const customFn = new Function(
      //       'row',
      //       'column',
      //       'cell',
      //       'event',
      //       this.widget.options.onCellClick
      //     );
      //     return customFn.call(this, row, column, cell, event);
      //   }
      // },

      // handleCellDoubleClick(row, column, cell, event) {
      //   if (!!this.widget.options.onCellDoubleClick) {
      //     const customFn = new Function(
      //       'row',
      //       'column',
      //       'cell',
      //       'event',
      //       this.widget.options.onCellDoubleClick
      //     );
      //     return customFn.call(this, row, column, cell, event);
      //   }
      // },

      // toggleSelection(row, flag, selectedRows) {
      //   if (row) {
      //     this.$refs.dataTable.toggleRowSelection(row, flag);

      //     if (flag) {
      //       selectedRows.push(row);
      //       return;
      //     }

      //     let foundRowIdx = -1;
      //     const rowKey = this.widget.options.rowKey || 'id';
      //     selectedRows.forEach((sr, idx) => {
      //       if (sr[rowKey] === row[rowKey]) {
      //         foundRowIdx = idx;
      //       }
      //     });

      //     if (foundRowIdx > -1) {
      //       selectedRows.splice(foundRowIdx, 1);
      //     }
      //   }
      // },

      // setChildrenSelected(children, flag, selectedRows) {
      //   const childrenKey = this.widget.options.childrenKey || 'children';
      //   children.map(child => {
      //     this.toggleSelection(child, flag, selectedRows);
      //     if (child[childrenKey]) {
      //       this.setChildrenSelected(child[childrenKey], flag, selectedRows);
      //     }
      //   });
      // },

      // handleRowSelect(selection, row) {
      //   this.skipSelectionChangeEvent = true;

      //   const selectedRows = deepClone(selection);
      //   const rowKey = this.widget.options.rowKey || 'id';
      //   const childrenKey = this.widget.options.childrenKey || 'children';
      //   if (
      //     selection.some(el => {
      //       return row[rowKey] === el[rowKey];
      //     })
      //   ) {
      //     if (row[childrenKey]) {
      //       this.setChildrenSelected(row[childrenKey], true, selectedRows);
      //     }
      //   } else {
      //     if (row[childrenKey]) {
      //       this.setChildrenSelected(row[childrenKey], false, selectedRows);
      //     }
      //   }

      //   this.skipSelectionChangeEvent = false;
      //   // 一次性处理多行选中或取消选中，只触发一次事件！！！
      //   this.$nextTick(() => {
      //     this.handleSelectionChange(selectedRows);
      //   });
      // },

      // setSelectedFlag(data, flag) {
      //   const childrenKey = this.widget.options.childrenKey || 'children';
      //   data.forEach(row => {
      //     this.$refs.dataTable.toggleRowSelection(row, flag);
      //     if (row[childrenKey]) {
      //       this.setSelectedFlag(row[childrenKey], flag);
      //     }
      //   });
      // },

      // handleAllSelect(selection) {
      //   this.skipSelectionChangeEvent = true;
      //   this.selectAllFlag = !this.selectAllFlag;
      //   this.setSelectedFlag(this.widget.options.tableData, this.selectAllFlag);

      //   this.skipSelectionChangeEvent = false;
      //   // 一次性处理多行选中或取消选中，只触发一次事件！！！
      //   this.$nextTick(() => {
      //     this.handleSelectionChange(selection);
      //   });
      // },

      // --------------------- 以下为组件支持外部调用的API方法 begin ------------------//
      /* 提示：用户可自行扩充这些方法！！！ */

      getTableColumns() {
        return this.widget.options.tableColumns;
      },

      /**
       * 设置表格列
       * @param tableColumns
       */
      // setTableColumns(tableColumns) {
      // this.widget.options.tableColumns = tableColumns;
      // this.$nextTick(() => {
      //   this.$refs.dataTable.doLayout(); // 防止行列显示错位！！
      // });
      // },

      /**
       * 设置表格列（为了兼容文档错误，setTableColumn应为setTableColumns）
       * @param tableColumns
       */
      // setTableColumn(tableColumns) {
      //   this.setTableColumns(tableColumns);
      // },

      /**
       * 从数据源加载表格列
       * @param localDsv 本地数据源变量DSV
       * @param dsName 数据源名称
       */
      // loadColumnsFromDS(localDsv = {}, dsName) {
      //   const curDS = getDSByName(this.formConfig, dsName);
      //   if (!!curDS) {
      //     const gDsv = this.getGlobalDsv() || {};
      //     const newDsv = new Object({});
      //     overwriteObj(newDsv, gDsv);
      //     overwriteObj(newDsv, localDsv);
      //     newDsv.widgetName = this.widget.options.name;
      //     runDataSourceRequest(curDS, newDsv, this.getFormRef(), false, this.$message)
      //       .then(res => {
      //         this.setTableColumns(res);
      //       })
      //       .catch(err => {
      //         this.$message.error(err.message);
      //       });
      //   }
      // },

      /**
       * 动态设置表格列的隐藏或显示
       * @param columnNames
       * @param hiddenFlag
       */
      // setTableColumnsHidden(columnNames, hiddenFlag) {
      //   if (!!columnNames) {
      //     if (typeof columnNames === 'string') {
      //       this.findColumnAndSetHidden(columnNames, hiddenFlag);
      //     } else if (Array.isArray(columnNames)) {
      //       columnNames.forEach(cn => {
      //         this.findColumnAndSetHidden(cn, hiddenFlag);
      //       });
      //     }

      //     this.$nextTick(() => {
      //       this.$refs.dataTable.doLayout(); // 防止行列显示错位！！
      //     });
      //   }
      // },

      /**
       * 获取表格数据
       */
      // getTableData() {
      //   return this.widget.options.tableData;
      // },

      /**
       * 设置表格数据
       * @param tableData
       */
      // setTableData(tableData) {
      //   this.widget.options.tableData = tableData;
      // },

      /**
       * 从数据源加载表格数据
       * @param localDsv 本地数据源变量DSV
       * @param dsName 数据源名称，不传此值，则使用dsName属性绑定的数据源
       */
      // loadDataFromDS(localDsv = {}, dsName = '') {
      // const curDSName = dsName || this.widget.options.dsName;
      // const curDSetName = this.widget.options.dataSetName;
      // const curDS = getDSByName(this.formConfig, curDSName);
      // if (!!curDS) {
      //   const gDsv = this.getGlobalDsv() || {};
      //   const newDsv = new Object({});
      //   overwriteObj(newDsv, gDsv);
      //   overwriteObj(newDsv, localDsv);
      //   newDsv.widgetName = this.widget.options.name;
      //   newDsv.pageSize = this.pageSize;
      //   newDsv.currentPage = this.currentPage;
      //   runDataSourceRequest(curDS, newDsv, this.getFormRef(), false, this.$message)
      //     .then(res => {
      //       if (!!curDSetName && res.hasOwnProperty(curDSetName)) {
      //         this.setTableData(res[curDSetName]);
      //       } else {
      //         this.setTableData(res);
      //       }
      //     })
      //     .catch(err => {
      //       this.$message.error(err.message);
      //     });
      // }
      // },

      // /**
      //  * 设置表格分页
      //  * @param pagination
      //  */
      // setPagination(pagination) {
      //   if (pagination.currentPage !== undefined) {
      //     this.currentPage = pagination.currentPage;
      //     this.widget.options.pagination.currentPage = pagination.currentPage;
      //   }

      //   if (pagination.pageSize !== undefined) {
      //     this.pageSize = pagination.pageSize;
      //     this.widget.options.pagination.pageSize = pagination.pageSize;
      //   }

      //   if (pagination.pageSizes !== undefined) {
      //     this.pageSizes = pagination.pageSizes;
      //     this.widget.options.pagination.pageSizes = pagination.pageSizes;
      //   }

      //   if (pagination.total !== undefined) {
      //     this.total = pagination.total;
      //     this.widget.options.pagination.total = pagination.total;
      //   }
      // },

      /**
       * 获取选中行数据，格式为对象数组
       * @returns {[]}
       */
      getSelectedRow() {
        // return this.$refs.dataTable.selection
        return this.selectedRows;
      },

      /**
       * 获取选中行索引，格式为数组
       * @returns {[]}
       */
      getSelectedIndex() {
        return this.selectedIndices;
      }

      // --------------------- 以上为组件支持外部调用的API方法 end ------------------//
    }
  };
</script>

<style lang="scss" scoped>
  .collapse-container {
    margin: 2px;

    .form-widget-list {
      min-height: 28px;
    }
  }

  :deep(.el-collapsed__header) {
    padding: 10px 12px;
  }
</style>

<style scoped>
  :deep(.ant-table) .table-striped td {
    background-color: #fafafa;
  }
</style>
