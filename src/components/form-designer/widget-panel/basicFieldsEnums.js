import { getUuidKey } from '@/utils/util';

export const input = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    type: 'input',
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
      holdHidden: true,
      allowClear: true,
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      maxLength: null,
      showCount: false,
      addonBefore: '',
      addonAfter: '',
      //-------------------
      onCreated: '',
      onMounted: '',
      onInput: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: '',
      ...ops
    }
  };
};

export const textarea = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
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
      holdHidden: true,
      allowClear: true,
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      // minLength: null,
      maxLength: null,
      showCount: false,
      //-------------------
      onCreated: '',
      onMounted: '',
      onInput: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: '',
      ...ops
    }
  };
};

export const number = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    type: 'number',
    icon: 'number-field',
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
      holdHidden: true,
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      min: -99999999,
      max: 99999999,
      precision: 0,
      step: 1,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: '',
      ...ops
    }
  };
};

export const radio = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
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
      holdHidden: true,
      dsEnabled: false, // 是否使用数据源数据
      labelKey: 'label',
      valueKey: 'value',
      optionItems: [
        { label: 'radio 1', value: 1 },
        { label: 'radio 2', value: 2 },
        { label: 'radio 3', value: 3 }
      ],
      http: {
        url: '', // '/api/tmgc2-mgt/pageFieldConfig/queryPageFieldValueOptions',
        method: 'get',
        data: {},
        params: {} // { pageCode: '${pageCode}', fieldCode: '${fieldCode}' }
      },
      dataHandlerCode: 'return data.data;\n ',
      dataReqHandlerCode: `const d=data.data||{};\n Object.keys(d).forEach(k=>{\n if(d[k]==='null'){\n d[k]=null\n }\n })\nreturn {...data,data:d}`,

      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: '',
      ...ops
    }
  };
};

export const checkbox = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
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
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      holdHidden: true,
      labelKey: 'label',
      valueKey: 'value',
      optionItems: [
        { label: 'check 1', value: 1 },
        { label: 'check 2', value: 2 },
        { label: 'check 3', value: 3 }
      ],
      http: {
        url: '',
        method: 'get',
        data: {},
        params: {}
      },
      dataHandlerCode: 'return data.data;\n ',
      dataReqHandlerCode: `const d=data.data||{};\n Object.keys(d).forEach(k=>{\n if(d[k]==='null'){\n d[k]=null\n }\n })\nreturn {...data,data:d}`,

      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: '',
      ...ops
    }
  };
};

export const select = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
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
      useModal: false,
      loadingPage: false,
      hidden: false,
      holdHidden: true,
      allowClear: true,
      maxTagCount: 'responsive',
      mode: 'combobox',
      showSearch: false,
      dsEnabled: false, // 是否使用数据源数据
      labelKey: 'label',
      valueKey: 'value',
      optionItems: [
        { label: 'select 1', value: 1 },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
      http: {
        url: '',
        method: 'get',
        data: {},
        params: {}
      },
      dataHandlerCode: 'return data.data;\n ',
      dataReqHandlerCode: `const d=data.data||{};\n Object.keys(d).forEach(k=>{\n if(d[k]==='null'){\n d[k]=null\n }\n })\nreturn {...data,data:d}`,

      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      // onRemoteQuery: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: '',
      onClickIcon: 'console.log(this,"onClickIcon")',
      ...ops
    }
  };
};

export const time = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
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
      holdHidden: true,
      allowClear: true,
      format: 'HH:mm:ss', //时间格式
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: '',
      ...ops
    }
  };
};

export const timeRange = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
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
      holdHidden: true,
      allowClear: true,
      format: 'HH:mm:ss', //时间格式
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: '',
      ...ops
    }
  };
};

export const date = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
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
      holdHidden: true,
      allowClear: true,
      showTime: false,
      format: 'YYYY-MM-DD', //日期显示格式
      valueFormat: 'YYYY-MM-DD', //日期对象格式
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: '',
      ...ops
    }
  };
};

export const dateRange = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    type: 'date-range',
    icon: 'date-range-field',
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
      holdHidden: true,
      allowClear: true,
      showTime: false,
      format: 'YYYY-MM-DD', //日期显示格式
      valueFormat: 'YYYY-MM-DD', //日期对象格式
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: '',
      ...ops
    }
  };
};

export const switchCom = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
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
      holdHidden: true,
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      switchWidth: 40,
      checkedValue: '1',
      unCheckedValue: '0',
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: '',
      ...ops
    }
  };
};
export const rate = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    type: 'rate',
    icon: 'rate-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: null,
      columnWidth: '200px',
      allowClear: true,
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      holdHidden: true,
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      count: 5,
      allowHalf: false,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: '',
      ...ops
    }
  };
};

export const color = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
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
      holdHidden: true,
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: '',
      ...ops
    }
  };
};

export const slider = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    type: 'slider',
    icon: 'slider-field',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      columnWidth: '200px',
      size: '',
      labelWidth: null,
      labelHidden: false,
      disabled: false,
      hidden: false,
      holdHidden: true,
      required: false,
      requiredHint: '',
      validation: '',
      validationHint: '',
      //-------------------
      customClass: [], //自定义css类名
      labelIconClass: null,
      labelIconPosition: 'rear',
      labelTooltip: null,
      min: 0,
      max: 100,
      step: 1,
      range: false,
      height: null,
      //-------------------
      onCreated: '',
      onMounted: '',
      onChange: '',
      onValidate: '',
      ...ops
    }
  };
};
export const staticText = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    type: 'static-text',
    icon: 'static-text',
    formItemFlag: false,
    options: {
      name: '',
      columnWidth: '200px',
      hidden: false,
      holdHidden: true,
      textContent: 'static text',
      //-------------------
      customClass: [], //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: '',
      ...ops
    }
  };
};

export const htmlText = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    type: 'html-text',
    icon: 'html-text',
    formItemFlag: false,
    options: {
      name: '',
      columnWidth: '200px',
      hidden: false,
      holdHidden: true,
      htmlContent: '<b>html text</b>',
      //-------------------
      customClass: [], //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: '',
      ...ops
    }
  };
};

export const button = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    type: 'button',
    icon: 'button',
    formItemFlag: false,
    options: {
      name: '',
      label: '',
      size: '',
      displayStyle: 'block',
      disabled: false,
      hidden: false,
      holdHidden: true,
      type: 'primary',
      shape: '',
      danger: false,
      ghost: false,
      icon: null,
      //-------------------
      customClass: [], //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: '',
      onClick: '',
      ...ops
    }
  };
};

export const divider = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
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
      holdHidden: true,
      //-------------------
      customClass: [], //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: '',
      ...ops
    }
  };
};
export const dropdown = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    type: 'dropdown',
    icon: 'dropdown',
    formItemFlag: false,
    options: {
      name: '',
      label: '',
      size: '',
      displayStyle: 'block',
      disabled: false,
      hidden: false,
      holdHidden: true,
      type: 'primary',
      shape: '',
      danger: false,
      ghost: false,
      placement: 'bottomLeft',
      menuList: [
        { value: '1', label: '功能1' },
        { value: '2', label: '功能2' }
      ],

      //-------------------
      customClass: [], //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: '',
      onClick: '',
      onMenuClick: '',
      ...ops
    }
  };
};
export const codeEditor = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    showName: '代码编辑器',
    type: 'code-editor',
    icon: 'code-editor',
    formItemFlag: true,
    options: {
      name: '',
      label: '',
      labelAlign: '',
      defaultValue: '',
      columnWidth: '200px',
      labelWidth: null,
      labelHidden: false,
      readonly: false,
      hidden: false,
      holdHidden: true,
      allowClear: true,
      required: false,
      requiredHint: '',
      mode: 'javascript',
      //-------------------
      customClass: [], //自定义css类名
      //-------------------
      onCreated: '',
      onMounted: '',
      onInput: '',
      onChange: '',
      onFocus: '',
      onBlur: '',
      onValidate: `
        const flag = this.$refs.fieldEditor.validateCode();
        if(flag) return Promise.resolve();
        return Promise.reject('语法校验失败');
      `,
      ...ops
    }
  };
};
export const basicFieldsEnums = {
  input,
  textarea,
  number,
  radio,
  checkbox,
  select,
  time,
  timeRange,
  date,
  dateRange,
  switch: switchCom,
  rate,
  color,
  slider,
  staticText,
  htmlText,
  button,
  divider,
  dropdown,
  codeEditor
};
