import { getUuidKey } from '@/utils/util';

/**
 * 选择人员
 * @param {*} ops
 * @returns
 */
const userSelect = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    showName: '选择用户',
    type: 'select',
    icon: 'yonghu1',
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
      loadingPage: true,
      hidden: false,
      holdHidden: true,
      allowClear: true,
      maxTagCount: 'responsive',
      mode: 'combobox',
      showSearch: true,
      dsEnabled: true, // 是否使用数据源数据
      labelKey: 'userName',
      valueKey: 'userId',
      optionItems: [
        { label: 'select 1', value: 1 },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
      http: {
        url: '/api/tmgc2-org/user/queryUserPageByParam',
        method: 'post',
        data: {
          limitStatus: 0,
          lockFlag: 1
        },
        params: {}
      },
      dataHandlerCode: 'return data.data.object;\n ',
      dataReqHandlerCode: `
      const d=data.data||{};
      Object.keys(d).forEach(k=>{
        if(d[k]==='null'){
          d[k]=null
        }
        });
        const userName = this.keyword||'';
        const {page,pageSize} =this.pager ;
        const p = {userName,page,pageSize} ;

        return {...data,data:{...d,...p}}
        `,

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
/**
 * 选择部门
 * @param {*} ops
 * @returns
 */
const departmentSelect = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    showName: '选择部门',
    type: 'select',
    icon: 'bumen',
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
      loadingPage: true,
      hidden: false,
      holdHidden: true,
      allowClear: true,
      maxTagCount: 'responsive',
      mode: 'combobox',
      showSearch: true,
      dsEnabled: true, // 是否使用数据源数据
      labelKey: 'departmentName',
      valueKey: 'departmentCode',
      optionItems: [
        { label: 'select 1', value: 1 },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
      http: {
        url: '/api/tmgc2-org/department/getDepartmentList',
        method: 'post',
        data: {},
        params: {}
      },
      dataHandlerCode: 'return data.data.object;\n ',
      dataReqHandlerCode: `
      const d=data.data||{};
      Object.keys(d).forEach(k=>{
        if(d[k]==='null'){
          d[k]=null
        }
        });
        const departmentName = this.keyword||'';
        const {page,pageSize} =this.pager ;
        const p = {departmentName,page,pageSize} ;

        return {...data,data:{...d,...p}}
        `,

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
/**
 * 选择岗位
 * @param {*} ops
 * @returns
 */
const postSelect = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    showName: '选择岗位',
    type: 'select',
    icon: 'gangweitubiao',
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
      loadingPage: true,
      hidden: false,
      holdHidden: true,
      allowClear: true,
      maxTagCount: 'responsive',
      mode: 'combobox',
      showSearch: true,
      dsEnabled: true, // 是否使用数据源数据
      labelKey: 'postName',
      valueKey: 'postCode',
      optionItems: [
        { label: 'select 1', value: 1 },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
      http: {
        url: '/api/tmgc2-org/post/getPostList',
        method: 'post',
        data: { lockFlag: '' },
        params: {}
      },
      dataHandlerCode: 'return data.data.object;\n ',
      dataReqHandlerCode: `
      const d=data.data||{};
      Object.keys(d).forEach(k=>{
        if(d[k]==='null'){
          d[k]=null
        }
        });
        const postName = this.keyword||'';
        const {page,pageSize} =this.pager ;
        const p = {postName,page,pageSize} ;
        return {...data,data:{...d,...p}}
        `,

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
/**
 * 选择工序
 * @param {*} ops
 * @returns
 */
const operationSelect = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    showName: '选择工序',
    type: 'select',
    icon: 'gongxu',
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
      loadingPage: true,
      hidden: false,
      holdHidden: true,
      allowClear: true,
      maxTagCount: 'responsive',
      mode: 'combobox',
      showSearch: true,
      dsEnabled: true, // 是否使用数据源数据
      labelKey: 'operationName',
      valueKey: 'operationCode',
      optionItems: [
        { label: 'select 1', value: 1 },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
      http: {
        url: '/api/tmgc2-query/dataQuery/execute',
        method: 'post',
        data: {},
        params: {}
      },
      dataHandlerCode: 'return data.data.object;\n ',
      dataReqHandlerCode: `
        const operationName = this.keyword||'';
        const {page,pageSize} =this.pager ;
        const p = {
          "pageCode":"OperationInfo",
          "conditions":[
            {"fieldCode":"operationName","type":"CONTAINS","value":operationName}
          ],
          "requiredFields":["operationCode","operationName"],
          "page":page,
          "pageSize":pageSize,
          "sorts":[{"fieldCode":"createDatetime","order":"DESC"}]
        }
        return {...data,data:{...p}}
        `,

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
/**
 * 选择物料
 * @param {*} ops
 * @returns
 */
const materialSelect = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    showName: '选择物料',
    type: 'select',
    icon: 'navicon-wlpp',
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
      loadingPage: true,
      hidden: false,
      holdHidden: true,
      allowClear: true,
      maxTagCount: 'responsive',
      mode: 'combobox',
      showSearch: true,
      dsEnabled: true, // 是否使用数据源数据
      labelKey: 'materialName',
      valueKey: 'materialCode',
      optionItems: [
        { label: 'select 1', value: 1 },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
      http: {
        url: '/api/tmgc2-material/material/queryMaterialListByPage-v2',
        method: 'post',
        data: {},
        params: {}
      },
      dataHandlerCode: 'return data.data.object;\n ',
      dataReqHandlerCode: `
        const materialName = this.keyword||'';
        const {page,pageSize} =this.pager ;
        const p = {
          "pageCode":"Material",
          "conditions":[
            {"fieldCode":"materialName","type":"CONTAINS","value":materialName}
          ],
          "requiredFields":["materialName","materialCode"],
          "page":page,
          "pageSize":pageSize,
          "sorts":[{"fieldCode":"modifyDatetime","order":"DESC"}]
        }
        return {...data,data:{...p}}
        `,

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
/**
 * 选择项目
 * @param {*} ops
 * @returns
 */
const projectSelect = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    showName: '选择项目',
    type: 'select',
    icon: 'xiangmu',
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
      loadingPage: true,
      hidden: false,
      holdHidden: true,
      allowClear: true,
      maxTagCount: 'responsive',
      mode: 'combobox',
      showSearch: true,
      dsEnabled: true, // 是否使用数据源数据
      labelKey: 'projectName',
      valueKey: 'projectCode',
      optionItems: [
        { label: 'select 1', value: 1 },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
      http: {
        url: '/api/tmgc2-production/project/queryPopProjectListByPage',
        method: 'post',
        data: {},
        params: {}
      },
      dataHandlerCode: 'return data.data.object;\n ',
      dataReqHandlerCode: `
        const projectName = this.keyword||'';
        const {page,pageSize} =this.pager ;
        const p = {
          "forbidden": "1",
          "projectName":projectName,
          "page":page,
          "pageSize":pageSize
        }
        return {...data,data:{...p}}
        `,

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
/**
 * 选择项目组
 * @param {*} ops
 * @returns
 */
const projectGroupSelect = (ops = {}) => {
  return {
    key: getUuidKey(),
    id: ops.name,
    showName: '选择项目组',
    type: 'select',
    icon: 'changyongtubiao_xiangmuzushezhi',
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
      loadingPage: true,
      hidden: false,
      holdHidden: true,
      allowClear: true,
      maxTagCount: 'responsive',
      mode: 'combobox',
      showSearch: true,
      dsEnabled: true, // 是否使用数据源数据
      labelKey: 'projectGroupName',
      valueKey: 'projectGroupCode',
      optionItems: [
        { label: 'select 1', value: 1 },
        { label: 'select 2', value: 2 },
        { label: 'select 3', value: 3 }
      ],
      http: {
        url: '/api/tmgc2-query/dataQuery/execute',
        method: 'post',
        data: {},
        params: {}
      },
      dataHandlerCode: 'return data.data.object;\n ',
      dataReqHandlerCode: `
        const projectGroupName = this.keyword||'';
        const {page,pageSize} =this.pager ;
        const p = {
          "pageCode":"projectGroup",
          "conditions":[
            {"fieldCode":"projectGroupName","type":"CONTAINS","value":projectGroupName}
          ],
          "requiredFields":["projectGroupCode","projectGroupName"],
          "page":page,
          "pageSize":pageSize,
          "sorts":[]
        }
        return {...data,data:{...p}}
        `,

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

export const businessFieldsEnums = {
  userSelect,
  departmentSelect,
  postSelect,
  operationSelect,
  materialSelect,
  projectSelect,
  projectGroupSelect
};
