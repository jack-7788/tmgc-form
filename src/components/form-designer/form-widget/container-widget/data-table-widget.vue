<template>
  <container-wrapper
    :designer="designer"
    :widget="widget"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
  >
    <div
      :key="widget.id"
      class="collapse-container data-table-container"
      :class="{ selected: selected }"
      @click.stop="selectWidget(widget)"
    >
      <a-table
        ref="dataTable1"
        :dataSource="widget.options.dataSource"
        :rowKey="record => record[widget.options.rowKey]"
        :scroll="{ y: parseFloat(tableHeight || 0), x: 300 }"
        :class="[customClass]"
        :size="widgetSize"
        :bordered="widget.options.border"
        :style="{ width: widget.options.tableWidth }"
        @click.native.stop="selectWidget(widget)"
        :row-class-name="
          widget.options.stripe
            ? (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
            : null
        "
        :rowSelection="handleRowSelection(widget.options.rowSelection)"
        :pagination="widget.options.pagination"
        @change="handleTablePageChange"
      >
        <a-table-column
          v-if="widget.options.showIndex"
          title="序号"
          align="left"
          :width="100"
          fixed="left"
          :customRender="customRenderIndex"
        />
        <template v-for="(item, index) in widget.options.tableColumns">
          <a-table-column v-if="item.show !== false" :key="index" v-bind="handleColumnItem(item)" />
        </template>
        <template v-if="!!widget.options.showButtonsColumn">
          <a-table-column
            :fixed="'right'"
            :align="'center'"
            :title="widget.options.buttonsColumnTitle"
            :width="widget.options.buttonsColumnWidth"
          >
            <template #default="scope">
              <a-space>
                <a-button
                  v-for="(ob, inx) in widget.options.operationButtons"
                  :key="inx"
                  :type="ob.type"
                  :size="ob.size"
                  :round="ob.round"
                  :disabled="disableOperationButton(ob, scope.rowIndex, scope.row)"
                  @click="handleOperationButtonClick(ob.name, scope.rowIndex, scope.record)"
                >
                  {{ getOperationButtonLabel(ob, scope.rowIndex, scope.row) }}
                </a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
  </container-wrapper>
</template>

<script lang="jsx">
  import ContainerWrapper from '@/components/form-designer/form-widget/container-widget/container-wrapper';
  import emitter from '@/utils/emitter';
  import i18n from '@/utils/i18n';
  import FieldComponents from '@/components/form-designer/form-widget/field-widget/index';
  import containerMixin from '@/components/form-designer/form-widget/container-widget/containerMixin';
  import refMixinDesign from '@/components/form-designer/refMixinDesign';
  import { omit } from 'lodash-es';

  export default {
    name: 'DataTableWidget',
    componentName: 'DataTableWidget',
    mixins: [i18n, containerMixin, refMixinDesign],
    inject: ['refList'],
    components: {
      ContainerWrapper,
      ...FieldComponents
    },
    data() {
      return {
        selectAllFlag: false
      };
    },
    props: {
      widget: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,

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
    created() {
      this.initRefList();
    },
    mounted() {
      //
    },
    beforeUnmount() {
      //
    },
    computed: {
      paginationLayout() {
        return !!this.widget.options.smallPagination
          ? 'prev, pager, next'
          : 'total, sizes, prev, pager, next, jumper';
      },

      selected() {
        return this.widget.id === this.designer.selectedId;
      },

      customClass() {
        return this.widget.options.customClass || '';
      },

      widgetSize() {
        return this.widget.options.tableSize || 'default';
      },

      buttonsColumnFixed() {
        if (this.widget.options.buttonsColumnFixed === undefined) {
          return 'right';
        }

        return !this.widget.options.buttonsColumnFixed
          ? false
          : this.widget.options.buttonsColumnFixed;
      },

      tableHeight() {
        return this.widget.options.tableHeight || undefined;
      },

      selectionWidth() {
        return !this.widget.options.showSummary
          ? !this.widget.options.treeDataEnabled
            ? 42
            : 70
          : 53;
      }
    },
    methods: {
      handleColumnItem(item) {
        const res = omit(item, ['customRender']);
        const customRenderFn = item.customRender;

        if (!customRenderFn) return item;
        return {
          ...res,
          customRender: ({ text, record, index, column }) => {
            console.log('customRender: ', text, record, index, column);
            const cusFunc = new Function('text', 'record', 'index', 'column', customRenderFn);
            return cusFunc.call(this, text, record, index, column);
          }
        };
      },
      getOperationButtonLabel(buttonConfig, rowIndex, row) {
        if (!!this.widget.options.onGetOperationButtonLabel) {
          const customFn = new Function(
            'buttonConfig',
            'rowIndex',
            'row',
            this.widget.options.onGetOperationButtonLabel
          );
          //return customFn.call(this, buttonConfig, rowIndex, row) || buttonConfig.label
          return customFn.call(this, buttonConfig, rowIndex, row);
        } else {
          return buttonConfig.label;
        }
      },
      handleOperationButtonClick(btnName, rowIndex, row) {
        this.skipSelectionChangeEvent = true;
        try {
          if (!!this.widget.options.onOperationButtonClick) {
            const customFn = new Function(
              'buttonName',
              'rowIndex',
              'row',
              this.widget.options.onOperationButtonClick
            );
            customFn.call(this, btnName, rowIndex, row);
          } else {
            this.dispatch('VFormRender', 'operationButtonClick', [this, btnName, rowIndex, row]);
          }
        } finally {
          this.skipSelectionChangeEvent = false;
        }
      },
      disableOperationButton(buttonConfig, rowIndex, row) {
        if (!!this.widget.options.onDisableOperationButton) {
          const customFn = new Function(
            'buttonConfig',
            'rowIndex',
            'row',
            this.widget.options.onDisableOperationButton
          );
          return customFn.call(this, buttonConfig, rowIndex, row);
        } else {
          return buttonConfig.disabled;
        }
      },

      customRenderIndex({ index }) {
        return index + 1;
      },
      handleTablePageChange(pagination, filters, sorter, { currentDataSource }) {
        console.log(
          'pagination, filters, sorter,currentDataSource: ',
          pagination,
          filters,
          sorter,
          currentDataSource
        );
        const fn = this.widget.options.onChange;
        this.widget.options.pagination.current = pagination.current;
        this.widget.options.pagination.pageSize = pagination.pageSize;
        if (fn) {
          const changeFunc = new Function(
            'pagination',
            'filters',
            'sorter',
            'currentDataSource',
            fn
          );
          changeFunc.call(this, pagination, filters, sorter, {
            currentDataSource
          });
        }
      },
      handleRowSelection(info) {
        if (!info.hasRowSelection) {
          return undefined;
        }
        return {
          ...omit(info, ['onChange']),
          onChange: (selectedRowKeys, selectedRows) => {
            console.log('选择了操作: ', selectedRowKeys, selectedRows);
            const rcFunc = new Function('selectedRowKeys', 'selectedRows', info.onChange);
            rcFunc.call(this, selectedRowKeys, selectedRows);
          }
        };
      },
      selectWidget(widget) {
        this.designer.setSelected(widget);
      },

      getTableColumns() {
        return this.widget.options.tableColumns;
      },

      setChildrenSelected(children, flag) {
        const childrenKey = this.widget.options.childrenKey;
        children.map(child => {
          this.toggleSelection(child, flag);
          if (child[childrenKey]) {
            this.setChildrenSelected(child[childrenKey], flag);
          }
        });
      },

      toggleSelection(row, flag) {
        if (row) {
          this.$nextTick(() => {
            this.$refs.dataTable.toggleRowSelection(row, flag);
          });
        }
      },

      handleRowSelect(selection, row) {
        const childrenKey = this.widget.options.childrenKey;
        if (
          selection.some(el => {
            return row.id === el.id;
          })
        ) {
          if (row[childrenKey]) {
            this.setChildrenSelected(row[childrenKey], true);
          }
        } else {
          if (row[childrenKey]) {
            this.setChildrenSelected(row[childrenKey], false);
          }
        }
      },

      setSelectedFlag(data, flag) {
        const childrenKey = this.widget.options.childrenKey;
        data.forEach(row => {
          this.$refs.dataTable.toggleRowSelection(row, flag);
          if (row[childrenKey]) {
            this.setSelectedFlag(row[childrenKey], flag);
          }
        });
      },

      handleAllSelect(selection) {
        this.selectAllFlag = !this.selectAllFlag;
        this.setSelectedFlag(this.widget.options.tableData, this.selectAllFlag);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .collapse-container {
    //padding: 5px;
    margin: 2px;

    .form-widget-list {
      min-height: 28px;
    }
  }

  .collapse-container.selected {
    outline: 2px solid $--color-primary !important;
  }

  .data-table-container {
    :deep(.el-scrollbar__view) {
      overflow-x: auto !important;
      /* el-table默认显示水平滚动条！！ */
      height: 100%;
      /* 水平滚动条固定在表格底部显示！！ */
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
s
