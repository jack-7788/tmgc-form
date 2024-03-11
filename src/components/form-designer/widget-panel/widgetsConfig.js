export const containers = [
  {
    type: 'grid',
    alias: '', //组件别名，可以自定义
    category: 'container',
    icon: 'grid',
    cols: [],
    options: {
      name: '',
      hidden: false,
      gutter: 12,
      colHeight: null, //栅格列统一高度属性，用于解决栅格列设置响应式布局浮动后被挂住的问题！！
      customClass: '' //自定义css类名
    }
  },

  {
    type: 'table',
    category: 'container',
    icon: 'table',
    rows: [],
    options: {
      name: '',
      hidden: false,
      customClass: '' //自定义css类名
    }
  },

  {
    type: 'tab',
    category: 'container',
    icon: 'tab',
    displayType: 'border-card',
    tabs: [],
    options: {
      name: '',
      hidden: false,
      customClass: '', //自定义css类名
      onTabClick: '' //tab被选中时触发
    }
  },

  {
    type: 'sub-form',
    category: 'container',
    icon: 'sub-form',
    widgetList: [],
    options: {
      name: '',
      showBlankRow: true,
      showRowNumber: true,
      labelAlign: 'label-center-align',
      hidden: false,
      actionColumnPosition: 'left', //操作按钮列位置
      customClass: '', //自定义css类名
      onSubFormRowAdd: '',
      onSubFormRowInsert: '',
      onSubFormRowDelete: '',
      onSubFormRowChange: ''
    }
  },

  // {
  //   type: 'grid-sub-form',// 多行子表单---未实现
  //   category: 'container',
  //   icon: 'grid-sub-form',
  //   widgetList: [],
  //   options: {
  //     name: '',
  //     showBlankRow: true,
  //     showRowNumber: true,
  //     hidden: false,
  //     actionColumnPosition: 'left', //操作按钮列位置
  //     customClass: '', //自定义css类名
  //     onSubFormRowAdd: '',
  //     onSubFormRowInsert: '',
  //     onSubFormRowDelete: '',
  //     onSubFormRowChange: ''
  //   }
  // },

  {
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
      customClass: '' //自定义css类名
    }
  },

  {
    type: 'table-cell',
    category: 'container',
    icon: 'table-cell',
    internal: true,
    widgetList: [],
    merged: false,
    options: {
      name: '',
      cellWidth: '',
      cellHeight: '',
      colspan: 1,
      rowspan: 1,
      customClass: '' //自定义css类名
    }
  },

  {
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
      customClass: '' //自定义css类名
    }
  },

  {
    type: 'data-table', //数据表格
    category: 'container',
    icon: 'data-table',
    widgetList: [],
    options: {
      name: '',
      label: 'data-table',
      hidden: false,
      rowSpacing: 8,
      tableHeight: '300px', //高度，百分比或像素
      tableWidth: '100%', //宽度，百分比或像素宽度
      customClass: '', //自定义css样式
      stripe: true, // 是否斑马线
      showIndex: false, // 是否显示行号列
      // showCheckBox: true, // 是否显示复选框列
      showPagination: true, // 是否分页
      // smallPagination: false, //是否显示小型分页
      // showSummary: false, // 是否合计
      border: true, // 是否带有纵向边框（拖拽）
      tableSize: 'default', // 表格大小，large大、default中、small小
      tableColumns: [
        //表格列信息
        {
          columnId: 1,
          dataIndex: 'name',
          title: '姓名',
          width: 100,
          show: true,
          align: 'left',
          fixed: 'false',
          sorter: true,
          customRender: ''
        }
      ],
      showButtonsColumn: false, // 是否显示操作列
      buttonsColumnFixed: 'right',
      buttonsColumnTitle: '操作',
      buttonsColumnWidth: 200,
      operationButtons: [
        {
          // 操作按钮配置
          name: 'detail',
          label: '详情',
          type: 'text',
          size: 'small',
          round: false,
          hidden: true,
          disabled: false
        },
        {
          name: 'edit',
          label: '编辑',
          type: 'text',
          size: 'small',
          round: false,
          hidden: false,
          disabled: false
        },
        {
          name: 'delete',
          label: '删除',
          type: 'text',
          size: 'small',
          round: false,
          hidden: false,
          disabled: false
        }
      ],
      dsEnabled: false, //是否使用数据源数据
      dsName: '', //数据源名称
      dataSetName: '', //数据集名称
      treeDataEnabled: false, //是否允许加载树形数据
      rowKey: 'name', //树形数据数据row-key
      childrenKey: 'children', //树形数据children
      dataSource: [
        //表格数据
        {
          date: '2016-05-02',
          date2: '2016-05-02 23:12:12',
          date3: '2016-05-02 9:11:12',
          name: '小二',
          f1: 10001000.2,
          f2: 10001000.239567,
          f3: 10001000.239567,
          f4: 10001000.239567,
          f5: 10001000.239567,
          f6: 10001000.239567,
          f7: 0.25,
          add: '上海市普陀区金沙江路 1518 弄',
          ss: 100
        }
      ],

      onCreated: '',
      onMounted: '',
      //分页大小改变事件
      onPageSizeChange: '',
      //当前页改变事件
      onCurrentPageChange: '',
      //选择项改变事件
      onSelectionChange: '',

      //设置操作按钮是否隐藏回调事件（必须有返回值）
      onHideOperationButton: '',
      //设置操作按钮是否禁用回调事件（必须有返回值）
      onDisableOperationButton: '',
      //设置操作按钮文本回调事件（必须有返回值）
      onGetOperationButtonLabel: '',
      //操作按钮点击事件
      onOperationButtonClick: '',

      onHeaderClick: '',
      onRowClick: '',
      onRowDoubleClick: '',
      onCellClick: '',
      onCellDoubleClick: '',

      //获取行样式名称事件
      onGetRowClassName: '',
      //合并行、列事件
      onGetSpanMethod: '',
      onChange: '', //分页、排序、筛选变化时触发
      pagination: {
        current: 1, //当前页数
        hideOnSinglePage: false, //只有一页时是否隐藏分页器
        pageSize: 20, //每页条数
        total: 0, //数据总数
        showQuickJumper: true, //是否可以快速跳转至某页
        showSizeChanger: true //是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
      },
      rowSelection: {
        hasRowSelection: false,
        preserveSelectedRowKeys: false, //当数据被删除时仍然保留选项的 key
        // type:"checkbox",//多选/单选，checkbox or radio
        fixed: true, //把选择框列固定在左边
        onChange: 'console.log(122222,selectedRowKeys, selectedRows)', //选中项发生变化时的回调 Function(selectedRowKeys, selectedRows)
        columnWidth: 100
      } //antd 功能的配置
    }
  }

  // {
  //   type: 'vf-dialog', //弹窗
  //   category: 'container',
  //   icon: 'vf-dialog',
  //   widgetList: [],
  //   options: {
  //     name: '',
  //     title: '',
  //     width: '50%',
  //     fullscreen: false,
  //     showModal: true,
  //     showClose: true,
  //     closeOnClickModal: false,
  //     closeOnPressEscape: false,
  //     center: false,
  //     readMode: false,
  //     disabledMode: false,
  //     okButtonLabel: '',
  //     okButtonHidden: false,
  //     cancelButtonLabel: '',
  //     cancelButtonHidden: false,
  //     onOkButtonClick: '',
  //     onCancelButtonClick: '',
  //     onDialogOpened: '',
  //     onDialogBeforeClose: ''
  //   }
  // },

  // {
  //   type: 'vf-drawer', // 侧滑抽屉
  //   category: 'container',
  //   icon: 'vf-drawer',
  //   widgetList: [],
  //   options: {
  //     name: '',
  //     title: '',
  //     size: '50%',
  //     showModal: true,
  //     showClose: true,
  //     closeOnClickModal: false,
  //     closeOnPressEscape: false,
  //     direction: 'rtl',
  //     readMode: false,
  //     disabledMode: false,
  //     okButtonLabel: '',
  //     okButtonHidden: false,
  //     cancelButtonLabel: '',
  //     cancelButtonHidden: false,
  //     onOkButtonClick: '',
  //     onCancelButtonClick: '',
  //     onDrawerOpened: '',
  //     onDrawerBeforeClose: ''
  //   }
  // }
];

export const basicFields = [
  {
    type: 'input',
    alias: '', //组件别名，可以自定义
    icon: 'text-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      type: 'text',
      defaultValue: '',
      placeholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      disabled: false,
      hidden: false,
      allowClear: true,
      showPassword: false,
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      minLength: null,
      maxLength: null,
      showWordLimit: false,
      prefixIcon: '',
      suffixIcon: '',
      appendButton: false,
      appendButtonDisabled: false,
      buttonIcon: 'custom-search',
      //-------------------
      onCreated: '',
      onMounted: '',
      onInput: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: '',
      onAppendButtonClick: ''
    }
  },

  {
    type: 'textarea',
    icon: 'textarea-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      rows: 3,
      defaultValue: '',
      placeholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      minLength: null,
      maxLength: null,
      showWordLimit: false,
      //-------------------
      onCreated: '',
      onMounted: '',
      onInput: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'number',
    icon: 'number-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: 0,
      placeholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      min: -100000000000,
      max: 100000000000,
      precision: 0,
      step: 1,
      controlsPosition: 'right',
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'radio',
    icon: 'radio-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      columnWidth: '200px',
      size: '',
      displayStyle: 'inline',
      buttonStyle: false,
      border: false,
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      dsEnabled: false, // 是否使用数据源数据
      dsName: '', // 数据源名称
      dataSetName: '', //数据集名称
      labelKey: 'label',
      valueKey: 'value',
      optionItems: [
        { label: 'radio 1', value: 1 },
        { label: 'radio 2', value: 2 },
        { label: 'radio 3', value: 3 }
      ],
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: ''
    }
  },

  {
    type: 'checkbox',
    icon: 'checkbox-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: [],
      columnWidth: '200px',
      size: '',
      displayStyle: 'inline',
      buttonStyle: false,
      border: false,
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      dsEnabled: false, // 是否使用数据源数据
      dsName: '', // 数据源名称
      dataSetName: '', //数据集名称
      labelKey: 'label',
      valueKey: 'value',
      optionItems: [
        { label: 'check 1', value: 1 },
        { label: 'check 2', value: 2 },
        { label: 'check 3', value: 3 }
      ],
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: ''
    }
  },

  {
    type: 'select',
    icon: 'select-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: '',
      placeholder: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      allowClear: true,
      filterable: false,
      allowCreate: false,
      remote: false,
      automaticDropdown: false, //自动下拉
      multiple: false,
      multipleLimit: 0,
      dsEnabled: false, // 是否使用数据源数据
      dsName: '', // 数据源名称
      dataSetName: '', //数据集名称
      labelKey: 'label',
      valueKey: 'value',
      optionItems: [
        { label: 'select 1', value: 1 },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onRemoteQuery: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'time',
    icon: 'time-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      placeholder: '',
      columnWidth: '200px',
      size: '',
      autoFullWidth: true,
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      disabled: false,
      hidden: false,
      allowClear: true,
      editable: false,
      format: 'HH:mm:ss', //时间格式
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'time-range',
    icon: 'time-range-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      startPlaceholder: '',
      endPlaceholder: '',
      columnWidth: '200px',
      size: '',
      autoFullWidth: true,
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      disabled: false,
      hidden: false,
      allowClear: true,
      editable: false,
      format: 'HH:mm:ss', //时间格式
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'date',
    icon: 'date-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      type: 'date',
      defaultValue: null,
      placeholder: '',
      columnWidth: '200px',
      size: '',
      autoFullWidth: true,
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      disabled: false,
      hidden: false,
      allowClear: true,
      editable: false,
      format: 'YYYY-MM-DD', //日期显示格式
      valueFormat: 'YYYY-MM-DD', //日期对象格式
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'date-range',
    icon: 'date-range-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      type: 'daterange',
      defaultValue: null,
      startPlaceholder: '',
      endPlaceholder: '',
      columnWidth: '200px',
      size: '',
      autoFullWidth: true,
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      disabled: false,
      hidden: false,
      allowClear: true,
      editable: false,
      format: 'YYYY-MM-DD', //日期显示格式
      valueFormat: 'YYYY-MM-DD', //日期对象格式
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  },

  {
    type: 'switch',
    icon: 'switch-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      columnWidth: '200px',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      switchWidth: 40,
      activeText: '',
      inactiveText: '',
      activeColor: null,
      inactiveColor: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: ''
    }
  },

  {
    type: 'rate',
    icon: 'rate-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      columnWidth: '200px',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      max: 5,
      lowThreshold: 2,
      highThreshold: 4,
      allowHalf: false,
      showText: false,
      showScore: false,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: ''
    }
  },

  {
    type: 'color',
    icon: 'color-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: ''
    }
  },

  {
    type: 'slider',
    icon: 'slider-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      columnWidth: '200px',
      showStops: true,
      size: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      min: 0,
      max: 100,
      step: 10,
      range: false,
      //vertical: false,
      height: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: ''
    }
  },

  {
    type: 'static-text',
    icon: 'static-text',
    formItemFlag: false,
    options: {
      name: '',
      columnWidth: '200px',
      hidden: false,
      textContent: 'static text',
      //-------------------
      customClass: '', //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: ''
    }
  },

  {
    type: 'html-text',
    icon: 'html-text',
    formItemFlag: false,
    options: {
      name: '',
      columnWidth: '200px',
      hidden: false,
      htmlContent: '<b>html text</b>',
      //-------------------
      customClass: '', //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: ''
    }
  },

  {
    type: 'button',
    icon: 'button',
    formItemFlag: false,
    options: {
      name: '',
      label: '',
      columnWidth: '200px',
      size: '',
      displayStyle: 'block',
      disabled: false,
      hidden: false,
      type: '',
      plain: false,
      round: false,
      circle: false,
      icon: null,
      //-------------------
      customClass: '', //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: '',
      onClick: ''
    }
  },

  {
    type: 'divider',
    icon: 'divider',
    formItemFlag: false,
    options: {
      name: '',
      label: '',
      columnWidth: '200px',
      direction: 'horizontal',
      contentPosition: 'center',
      hidden: false,
      //-------------------
      customClass: '', //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: ''
    }
  }

  //
];

export const advancedFields = [
  {
    type: 'picture-upload',
    icon: 'picture-upload-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      labelWidth: null,
      labelHidden: false,
      columnWidth: '200px',
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      customRule: '',
      customRuleHint: '',
      //-------------------
      uploadURL: '',
      uploadTip: '',
      withCredentials: false,
      multipleSelect: false,
      showFileList: true,
      limit: 3,
      fileMaxSize: 5, //MB
      fileTypes: ['jpg', 'jpeg', 'png'],
      //headers: [],
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onBeforeUpload: '',
      onUploadSuccess: '',
      onUploadError: '',
      onFileRemove: '',
      onValidate: ''
      //onFileChange: '',
    }
  },

  {
    type: 'file-upload',
    icon: 'file-upload-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      labelWidth: null,
      labelHidden: false,
      columnWidth: '200px',
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      customRule: '',
      customRuleHint: '',
      //-------------------
      uploadURL: '',
      uploadTip: '',
      withCredentials: false,
      multipleSelect: false,
      showFileList: true,
      limit: 3,
      fileMaxSize: 5, //MB
      fileTypes: ['doc', 'docx', 'xls', 'xlsx'],
      //headers: [],
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onBeforeUpload: '',
      onUploadSuccess: '',
      onUploadError: '',
      onFileRemove: '',
      onValidate: ''
      //onFileChange: '',
    }
  },

  {
    type: 'rich-editor',
    icon: 'rich-editor-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      placeholder: '',
      labelWidth: null,
      labelHidden: false,
      columnWidth: '200px',
      contentHeight: '200px',
      disabled: false,
      hidden: false,
      required: false,
      requiredHint: '',
      customRule: '',
      customRuleHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      minLength: null,
      maxLength: null,
      showWordLimit: false,
      //-------------------
      onCreated: '',
      onMounted: '',
      onValidate: ''
    }
  },

  {
    type: 'cascader',
    icon: 'cascader-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: '',
      placeholder: '',
      size: '',
      labelWidth: null,
      labelHidden: false,
      columnWidth: '200px',
      disabled: false,
      hidden: false,
      allowClear: true,
      filterable: false,
      multiple: false,
      checkStrictly: false, //可选择任意一级选项，默认不开启
      showAllLevels: true, //显示完整路径
      dsEnabled: false, // 是否使用数据源数据
      dsName: '', // 数据源名称
      dataSetName: '', //数据集名称
      labelKey: 'label',
      valueKey: 'value',
      childrenKey: 'children',
      optionItems: [
        { label: 'select 1', value: 1, children: [{ label: 'child 1', value: 11 }] },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
      required: false,
      requiredHint: '',
      customRule: '',
      customRuleHint: '',
      //-------------------
      customClass: '', //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: ''
    }
  }

  // {
  //   type: 'slot',
  //   icon: 'slot-field',
  //   formItemFlag: false,
  //   options: {
  //     name: '',
  //     label: '',
  //     customClass: '',  //自定义css类名
  //   }
  // },
];

export const customFields = [];

export function addContainerWidgetSchema(containerSchema) {
  containers.push(containerSchema);
}

export function addBasicFieldSchema(fieldSchema) {
  basicFields.push(fieldSchema);
}

export function addAdvancedFieldSchema(fieldSchema) {
  advancedFields.push(fieldSchema);
}

export function addCustomWidgetSchema(widgetSchema) {
  customFields.push(widgetSchema);
}
