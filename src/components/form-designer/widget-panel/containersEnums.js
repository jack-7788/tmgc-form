import { getUuidKey } from '@/utils/util';

/**
 * 选择人员
 * @param {*} ops
 * @returns
 */
const grid = (ops = {}) => {
  return {
    key: getUuidKey(),
    type: 'grid', // 组件类型
    alias: '', //组件别名，可以自定义
    category: 'container', //容器类型
    icon: 'grid', //icon
    cols: [], // 列配置
    options: {
      // 配置
      name: '', //名称
      hidden: false, //是否隐藏
      gutter: 12, //'栅格间隔',
      colHeight: null, //栅格列统一高度属性，用于解决栅格列设置响应式布局浮动后被挂住的问题！！
      customClass: [], //自定义css类名
      ...ops
    }
  };
};

const gridCol = (ops = {}) => {
  return {
    key: getUuidKey(),
    type: 'grid-col',
    category: 'container',
    icon: 'grid-col',
    internal: true,
    widgetList: [],
    options: {
      name: '',
      hidden: false,
      span: 12,
      offset: 0,
      push: 0,
      pull: 0,
      responsive: false, //是否开启响应式布局
      md: 12,
      sm: 12,
      xs: 12,
      customClass: [], //自定义css类名
      ...ops
    }
  };
};
const dataTable = (ops = {}) => {
  return {
    key: getUuidKey(),
    type: 'data-table', //数据表格
    category: 'container',
    icon: 'data-table',
    widgetList: [],
    options: {
      name: '',
      label: 'data-table',
      hidden: false,
      tableHeight: '300px', //高度，百分比或像素
      tableWidth: '100%', //宽度，百分比或像素宽度
      customClass: [], //自定义css样式
      // stripe: true, // 是否斑马线
      showIndex: false, // 是否显示行号列
      showPagination: true, // 是否分页
      border: true, // 是否带有纵向边框（拖拽）
      tableSize: 'small', // 表格大小，large大、default中、small小
      tableColumns: [
        //表格列信息
        {
          columnId: 1,
          dataIndex: 'name',
          title: '姓名',
          width: 150,
          show: true,
          align: 'center',
          fixed: '',
          sorter: false,
          customRender: '',
          ellipsis: true,
          resizable: true,
          showSorterTooltip: false
        }
      ],
      showButtonsColumn: false, // 是否显示操作列
      buttonsColumnTitle: '操作',
      buttonsColumnWidth: 200,
      operationButtons: [
        {
          // 操作按钮配置
          name: 'detail',
          label: '详情',
          type: 'link',
          shape: 'default',
          size: 'small',
          hidden: false,
          disabled: false,
          onClick: ''
        }
      ],
      dsEnabled: false, //是否使用数据源数据
      http: {
        url: '',
        method: 'get',
        data: {},
        params: {}
      },
      dataReqHandlerCode: '',
      dataHandlerCode: '',
      rowKey: 'name', //树形数据数据row-key
      childrenKey: 'children', //树形数据children
      dataSource: [
        //表格数据
        {
          date: '2016-05-02',
          date2: '2016-05-02 23:12:12',
          date3: '2016-05-02 9:11:12',
          name: '小二',
          add: '上海市普陀区金沙江路 1518 弄',
          age: 100
        }
      ],
      onCreated: '',
      onMounted: '',
      //设置操作按钮是否隐藏回调事件（必须有返回值）
      onHideOperationButton: '',
      //设置操作按钮是否禁用回调事件（必须有返回值）
      onDisableOperationButton: '',
      //设置操作按钮文本回调事件（必须有返回值）
      //操作按钮点击事件
      onOperationButtonClick: '',
      customRow: { onClick: '', onDblclick: '', onMouseenter: '', onMouseleave: '' },

      //合并行、列事件
      onTableChange: '', //分页、排序、筛选变化时触发
      pagination: {
        pageSizeOptions: ['10', '20', '50', '100'],
        current: 1, //当前页数
        hideOnSinglePage: false, //只有一页时是否隐藏分页器
        pageSize: 20, //每页条数
        total: 0, //数据总数
        showQuickJumper: true, //是否可以快速跳转至某页
        showSizeChanger: true, //是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
        position: ['bottomRight'],
        showTotal: total => `共 ${total} 条`
      },
      colorRow: true,
      rowSelection: {
        hasRowSelection: false,
        preserveSelectedRowKeys: false, //当数据被删除时仍然保留选项的 key
        // type:"checkbox",//多选/单选，checkbox or radio
        fixed: true, //把选择框列固定在左边
        onChange: 'console.log(122222,selectedRowKeys, selectedRows)', //选中项发生变化时的回调 Function(selectedRowKeys, selectedRows)
        columnWidth: 100
      }, //antd 功能的配置
      ...ops
    }
  };
};

const vfDialog = (ops = {}) => {
  return {
    key: getUuidKey(),
    type: 'vf-dialog', //弹窗
    category: 'container',
    icon: 'vf-dialog',
    widgetList: [],
    options: {
      name: '',
      title: '标题',
      width: '50%',
      height: '600px',
      bodyStyle: '',
      formCode: '',
      showClose: true,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      readMode: false,
      disabledMode: false,
      okButtonLabel: '',
      okButtonHidden: false,
      cancelButtonLabel: '',
      cancelButtonHidden: false,
      onOkButtonClick: '',
      onCancelButtonClick: '',
      onDialogOpened: '',
      onDialogBeforeClose: '',
      ...ops
    }
  };
};

const vfCollapse = (ops = {}) => {
  return {
    key: getUuidKey(),
    type: 'vf-collapse', //折叠面板
    category: 'container',
    icon: 'zhediemianban',
    widgetList: [],
    headerRightSlotList: [],
    defaultSlotsList: [],
    cols: [],
    options: {
      name: '',
      title: '标题',
      height: '',
      bodyStyle: '',
      formCode: '',
      collapseIcon: 'xiangshang',
      unCollapseIcon: 'xiangxia',
      isCollapse: true,
      rightSlotCss: [],
      ...ops
    }
  };
};
const vfBox = (ops = {}) => {
  return {
    key: getUuidKey(),
    type: 'vf-box',
    showName: '盒容器',
    category: 'container',
    icon: 'ccgl-zhouzhuanxiang-4',
    widgetList: [],
    options: {
      name: '',
      // title: '标题',
      // width: '100%',
      // height: '600px',
      formCode: '',
      customClass: []
    }
  };
};
const tab = (ops = {}) => {
  return {
    key: getUuidKey(),
    type: 'tab',
    category: 'container',
    icon: 'tab',
    displayType: 'border-card',
    tabs: [],
    options: {
      name: '',
      hidden: false,
      customClass: [], //自定义css类名
      onTabClick: '', //tab被选中时触发
      tabBarGutter: 30,
      tabPosition: 'top',
      type: 'line',
      onCreated: '',
      onMounted: ''
    }
  };
};

const tabPane = () => {
  return {
    key: getUuidKey(),
    type: 'tab-pane',
    category: 'container',
    icon: 'tab-pane',
    internal: true,
    widgetList: [],
    options: {
      name: '',
      label: '',
      hidden: false,
      active: false,
      disabled: false,
      customClass: [] //自定义css类名
    }
  };
};

export const containersEnums = {
  grid,
  gridCol,
  dataTable,
  vfDialog,
  vfCollapse,
  vfBox,
  tab,
  tabPane
};
