<template>
  <container-item-wrapper
    :style="{ display: 'flex', height: parseFloat(tableHeight || 0) + 'px' }"
    v-show="handleHidden()"
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
      :rowSelection="handleRowSelection()"
      :pagination="fmtPagination"
      :customRow="handleCustomRow"
      :rowClassName="rowClassName"
      @change="handleTablePageChange"
      @resizeColumn="handleResizeColumn"
      :loading="loading"
    >
      <template #emptyText>
        <a-empty />
      </template>
      <a-table-column
        v-if="widget.options.showIndex"
        title="序号"
        align="left"
        :width="80"
        fixed="left"
        :resizable="true"
        :customRender="customRenderIndex"
      />
      <template v-for="(item, index) in widget.options.tableColumns">
        <a-table-column
          v-if="item.show !== false"
          :key="index"
          v-bind="handleColumnItem(item)"
          :showSorterTooltip="false"
        />
      </template>
      <template v-if="!!widget.options.showButtonsColumn">
        <a-table-column
          :fixed="'right'"
          class-name="data-table-buttons-column"
          :align="'center'"
          :title="widget.options.buttonsColumnTitle"
          :width="widget.options.buttonsColumnWidth"
          :resizable="true"
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
  // import TableColumnCustomRender from '@/components/form-render/table-column-custom-render';
  // import { deepClone, getDSByName, overwriteObj, runDataSourceRequest } from '@/utils/util';
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
      getDataTableRef() {
        return this;
      },

      selectWidget(widget) {
        this.designer.setSelected(widget);
      },

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

      // --------------------- 以下为组件支持外部调用的API方法 begin ------------------//
      /* 提示：用户可自行扩充这些方法！！！ */

      getTableColumns() {
        return this.widget.options.tableColumns;
      },

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
