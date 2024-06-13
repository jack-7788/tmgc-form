<template>
  <form-item-wrapper
    :designer="designer"
    :field="field"
    :rules="rules"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
  >
    <a-upload
      ref="fieldEditor"
      :disabled="handleDisabled() || isReadMode"
      class="dynamicPseudoAfter"
      :class="['tpf-upload', { isReadonly: isReadMode }]"
      :multiple="field.options.multiple"
      :accept="field.options.accept.join(',')"
      :file-list="fileList"
      :customRequest="customRequest"
      :iconRender="iconRender"
      @preview="onPreview"
      @remove="removeFile"
    >
      <a-space :size="10" align="start">
        <a-button :loading="loading" class="tpf-button" type="primary" :disabled="handleDisabled()">
          <SvgIcon icon-class="daochu" /> 上传文件
        </a-button>
        <div :gutter="20" style="flex-flow: unset; flex-direction: column">
          <div v-for="(item, inx) in descCol" :key="inx">
            <span v-if="descCol.length > 1">{{ inx + 1 }}、{{ item }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </a-space>
    </a-upload>
  </form-item-wrapper>
</template>

<script lang="jsx">
  import FormItemWrapper from './form-item-wrapper';
  import emitter from '@/utils/emitter';
  import i18n, { translate } from '@/utils/i18n';
  import fieldMixin from '@/components/form-designer/form-widget/field-widget/fieldMixin';
  import SvgIcon from '@/components/svg-icon/index';
  import { useFilesystemApi } from '@/api/useFilesystemApi';
  import { PaperClipOutlined } from '@ant-design/icons-vue';

  const filesystemApi = useFilesystemApi();

  export default {
    name: 'file-upload-widget',
    componentName: 'FieldWidget', //必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin, i18n],
    props: {
      field: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,

      designState: {
        type: Boolean,
        default: false
      },

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
    components: {
      SvgIcon,
      FormItemWrapper
    },
    data() {
      return {
        loading: false,
        oldFieldValue: null, //field组件change之前的值
        fieldModel: [],
        rules: [],

        fileList: [] //上传文件列表
      };
    },
    computed: {
      descCol() {
        const { accept, maxSize } = this.field.options;
        const acceptList = (accept || []).join(',');
        return [
          acceptList.length ? `支持扩展名${acceptList}` : '',
          maxSize ? `支持文件大小${maxSize}M` : ''
        ].filter(Boolean);
      }
      // uploadBtnHidden() {
      //   return !this.fileList || this.fileList.length >= this.field.options.limit;
      // }
    },
    beforeCreate() {
      /* 这里不能访问方法和属性！！ */
    },

    created() {
      /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
      this.registerToRefList();
      this.initFieldModel();
      this.initEventHandler();
      this.buildFieldRules();

      this.handleOnCreated();
    },

    mounted() {
      this.handleOnMounted();
    },

    beforeUnmount() {
      this.unregisterFromRefList();
    },

    methods: {
      iconRender({ file }) {
        const fieldTypes = file.fileName.slice(file.fileName.lastIndexOf('.'));

        if (['.xls', '.xlsx'].includes(fieldTypes.toLowerCase())) {
          return <SvgIcon icon-class="excel" />;
        }
        if (['.doc', '.docx'].includes(fieldTypes.toLowerCase())) {
          return <SvgIcon icon-class="word" />;
        }
        if (['.pdf'].includes(fieldTypes.toLowerCase())) {
          return <SvgIcon icon-class="pdf" />;
        }

        return <PaperClipOutlined />;
      },
      onPreview(file) {
        filesystemApi.downloadFileObject({ fileCode: file.fileCode });
      },
      handleOnBeforeUpload(file) {
        if (!!this.field.options.onBeforeUpload) {
          const bfFunc = new Function('file', this.field.options.onBeforeUpload);
          const result = bfFunc.call(this, file);
          if (typeof result === 'boolean') {
            return result;
          } else {
            return true;
          }
        }
        return true;
      },
      removeFile(file) {
        const findInx = this.fileList.findIndex(item => item.uid === file.uid);
        this.fileList.splice(findInx, 1);
        this.handleChangeEvent(this.fileList);
      },
      async customRequest(upload) {
        const { accept, maxSize, limit, businessType, multiple } = this.field.options;
        const fileName = upload.file.name;
        const fieldTypesArr = accept.map(item => item.toLowerCase());
        const fieldTypes = fileName.slice(fileName.lastIndexOf('.'));
        const { message } = await import('ant-design-vue');

        if (!fieldTypesArr.includes(fieldTypes.toLowerCase())) {
          return message.error(`目前仅支持${accept}格式的文件`);
        }

        if (maxSize && upload.file.size > maxSize * 1024 * 1024) {
          message.error(`文件大小不能超过${maxSize}M`);
          return;
        }

        if (limit && this.fileList.length >= limit) {
          message.error('超出限制上传文件数');
          return;
        }

        const flag = this.handleOnBeforeUpload(upload);

        if (!flag) return;
        this.loading = true;
        try {
          const res = await filesystemApi.uploadFileObject({
            businessType: businessType,
            file: upload.file
          });

          const { fileName: name } = res.data.object;
          if (limit > 1) {
            const findIndex = this.fileList.findIndex(item => item.name === name);
            if (findIndex > -1) {
              this.fileList.splice(findIndex, 1);
            }
            if (this.fileList.length < limit) {
              this.fileList.push({ ...res.data.object, name });
            }
          } else {
            this.fileList = [{ ...res.data.object, name }];
          }
        } finally {
          this.handleChangeEvent(this.fileList);
          this.loading = false;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../../styles/global.scss'; /* form-item-wrapper已引入，还需要重复引入吗？ */
</style>
