import { getUuidKey } from '@/utils/util';

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

export const cascader = (ops = {}) => {
  return {
    key: getUuidKey(),
    type: 'cascader',
    icon: 'cascader-field',
    id: ops.name,
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
      holdHidden: true,
      allowClear: true,
      multiple: false,
      dsEnabled: true, // 是否使用数据源数据
      labelKey: 'label',
      valueKey: 'value',
      childrenKey: 'children',
      http: {
        url: '',
        method: 'get',
        data: {},
        params: {}
      },
      optionItems: [
        { label: 'select 1', value: 1, children: [{ label: 'child 1', value: 11 }] },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
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
      onFocus: '',
      onBlur: '',
      onValidate: '',
      ...ops
    }
  };
};
export const treeSelect = (ops = {}) => {
  return {
    key: getUuidKey(),
    type: 'treeSelect',
    icon: 'tree_line',
    id: ops.name,
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
      holdHidden: true,
      allowClear: true,
      multiple: false,
      treeDefaultExpandAll: false,
      dsEnabled: true, // 是否使用数据源数据
      labelKey: 'label',
      valueKey: 'value',
      childrenKey: 'children',
      http: {
        url: '',
        method: 'get',
        data: {},
        params: {}
      },
      optionItems: [
        { label: 'select 1', value: 1, children: [{ label: 'child 1', value: 11 }] },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
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
      onFocus: '',
      onBlur: '',
      onValidate: '',
      ...ops
    }
  };
};
export const richEditor = (ops = {}) => {
  return {
    type: 'rich-editor',
    icon: 'rich-editor-field',
    id: ops.name,
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
      validation: '', // 自定义校验选项
      validationHint: '', //自定义校验提示语
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
      onValidate: '',
      ...ops
    }
  };
};

export const advancedFieldsEnums = {
  cascader,
  treeSelect,
  richEditor,
  codeEditor
};
