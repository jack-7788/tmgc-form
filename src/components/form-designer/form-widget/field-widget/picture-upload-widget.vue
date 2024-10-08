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
    v-if="!handleHidden()"
  >
    <!-- el-upload增加:name="field.options.name"后，会导致又拍云上传失败！故删除之！！ -->
    <a-upload
      ref="fieldEditor"
      :disabled="handleDisabled() || isReadMode"
      :action="realUploadURL"
      :headers="uploadHeaders"
      :data="uploadData"
      :with-credentials="field.options.withCredentials"
      :multiple="field.options.multipleSelect"
      :file-list="fileList"
      :show-file-list="field.options.showFileList"
      list-type="picture-card"
      :class="{ hideUploadDiv: uploadBtnHidden || isReadMode }"
      :limit="field.options.limit"
      :on-exceed="handlePictureExceed"
      :on-preview="handlePicturePreview"
      :before-upload="beforePictureUpload"
      :on-success="handlePictureUpload"
      :on-error="handleUploadError"
      :before-remove="handleBeforeRemove"
      :on-remove="handlePictureRemove"
    >
      <template #tip>
        <div class="el-upload__tip" v-if="!!field.options.uploadTip">{{
          field.options.uploadTip
        }}</div>
      </template>
      <div class="uploader-icon"><svg-icon icon-class="el-plus" /></div>
    </a-upload>

    <a-modal
      title=""
      v-model:visible="showPreviewDialogFlag"
      append-to-body
      width="60%"
      :show-close="true"
      custom-class="drag-dialog small-padding-dialog"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :destroy-on-close="true"
    >
      <img :src="previewUrl" style="width: 100%" alt="" />
    </a-modal>
  </form-item-wrapper>
</template>

<script>
  import FormItemWrapper from './form-item-wrapper';
  import SvgIcon from '@/components/svg-icon';
  import emitter from '@/utils/emitter';
  import i18n, { translate } from '@/utils/i18n';
  import { deepClone } from '@/utils/util';
  import fieldMixin from '@/components/form-designer/form-widget/field-widget/fieldMixin';

  export default {
    name: 'picture-upload-widget',
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
      FormItemWrapper,
      SvgIcon
    },
    data() {
      return {
        oldFieldValue: null, //field组件change之前的值
        fieldModel: [],
        rules: [],

        uploadHeaders: {},
        uploadData: {
          key: '' //七牛云上传文件名
          //token: '',  //七牛云上传token

          //policy: '',  //又拍云上传policy
          //authorization: '',  //又拍云上传签名
        },
        fileList: [], //上传文件列表
        fileListBeforeRemove: [], //删除前的文件列表

        previewUrl: '',
        showPreviewDialogFlag: false
      };
    },
    computed: {
      realUploadURL() {
        const uploadURL = this.field.options.uploadURL;
        if (!!uploadURL && (uploadURL.indexOf('DSV.') > -1 || uploadURL.indexOf('DSV[') > -1)) {
          const DSV = this.getGlobalDsv();
          return eval(this.field.options.uploadURL);
        }

        return this.field.options.uploadURL;
      },

      uploadBtnHidden() {
        return !this.fileList || this.fileList.length >= this.field.options.limit;
      }
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
      console.log('thjis', this);
      this.handleOnMounted();
    },

    beforeUnmount() {
      this.unregisterFromRefList();
    },

    methods: {
      handlePictureExceed() {
        const uploadLimit = this.field.options.limit;
        this.$message.warning(
          this.i18nt('render.hint.uploadExceed').replace('${uploadLimit}', uploadLimit)
        );
      },

      handlePicturePreview(file) {
        this.previewUrl = file.url;
        this.showPreviewDialogFlag = true;
      },

      beforePictureUpload(file) {
        let fileTypeCheckResult = false;
        if (!!this.field.options && !!this.field.options.fileTypes) {
          const uploadFileTypes = this.field.options.fileTypes;
          if (uploadFileTypes.length > 0) {
            fileTypeCheckResult = uploadFileTypes.some(ft => {
              return file.type === 'image/' + ft;
            });
          }
        }
        if (!fileTypeCheckResult) {
          this.$message.error(this.i18nt('render.hint.unsupportedFileType') + file.type);
          return false;
        }

        let fileSizeCheckResult = false;
        let uploadFileMaxSize = 5; //5MB
        if (!!this.field.options && !!this.field.options.fileMaxSize) {
          uploadFileMaxSize = this.field.options.fileMaxSize;
        }
        fileSizeCheckResult = file.size / 1024 / 1024 <= uploadFileMaxSize;
        if (!fileSizeCheckResult) {
          this.$message.error(this.$('render.hint.fileSizeExceed') + uploadFileMaxSize + 'MB');
          return false;
        }

        this.uploadData.key = file.name;
        return this.handleOnBeforeUpload(file);
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

      updateFieldModelAndEmitDataChangeForUpload(fileList, customResult, defaultResult) {
        this.fieldModel = this.fieldModel || [];
        const oldValue = deepClone(this.fieldModel);
        if (!!customResult && !!customResult.name && !!customResult.url) {
          this.fieldModel.push({
            name: customResult.name,
            url: customResult.url
          });
        } else if (!!defaultResult && !!defaultResult.name && !!defaultResult.url) {
          this.fieldModel.push({
            name: defaultResult.name,
            url: defaultResult.url
          });
        } else {
          this.fieldModel = deepClone(fileList);
        }

        this.syncUpdateFormModel(this.fieldModel);
        this.emitFieldDataChange(this.fieldModel, oldValue);
      },

      handlePictureUpload(res, file, fileList) {
        if (file.status === 'success') {
          let customResult = null;
          if (!!this.field.options.onUploadSuccess) {
            const customFn = new Function(
              'result',
              'file',
              'fileList',
              this.field.options.onUploadSuccess
            );
            customResult = customFn.call(this, res, file, fileList);
          }

          this.updateFieldModelAndEmitDataChangeForUpload(fileList, customResult, res);
          this.fileList = deepClone(fileList);
        }
      },

      updateFieldModelAndEmitDataChangeForRemove(file, fileList) {
        const oldValue = deepClone(this.fieldModel);
        let foundFileIdx = -1;
        this.fileListBeforeRemove.map((fi, idx) => {
          /* 跟element-ui不同，element-plus删除文件时this.fileList数组对应元素已被删除！！ */
          if (fi.name === file.name && (fi.url === file.url || (!!fi.uid && fi.uid === file.uid))) {
            /* 这个判断有问题？？ */
            foundFileIdx = idx;
          }
        });
        if (foundFileIdx > -1) {
          this.fieldModel.splice(foundFileIdx, 1);
        }

        this.syncUpdateFormModel(this.fieldModel);
        this.emitFieldDataChange(this.fieldModel, oldValue);
      },

      handleBeforeRemove(file, fileList) {
        /* 保留删除之前的文件列表！！ */
        this.fileListBeforeRemove = deepClone(fileList);
      },

      handlePictureRemove(file, fileList) {
        this.updateFieldModelAndEmitDataChangeForRemove(file, fileList);
        this.fileList = deepClone(fileList);

        if (!!this.field.options.onFileRemove) {
          const customFn = new Function('file', 'fileList', this.field.options.onFileRemove);
          customFn.call(this, file, fileList);
        }
      },

      handleUploadError(err, file, fileList) {
        if (!!this.field.options.onUploadError) {
          const customFn = new Function(
            'error',
            'file',
            'fileList',
            this.field.options.onUploadError
          );
          customFn.call(this, err, file, fileList);
        } else {
          this.$message({
            message: this.i18nt('render.hint.uploadError') + err,
            duration: 3000,
            type: 'error'
          });
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../../styles/global.scss'; /* form-item-wrapper已引入，还需要重复引入吗？ */

  .full-width-input {
    width: 100% !important;
  }

  .hideUploadDiv {
    :deep(div.el-upload--picture-card) {
      /* 隐藏最后的图片上传按钮 */
      display: none;
    }

    :deep(div.el-upload--text) {
      /* 隐藏最后的文件上传按钮 */
      display: none;
    }

    :deep(div.el-upload__tip) {
      /* 隐藏最后的文件上传按钮提示 */
      display: none;
    }
  }

  .uploader-icon {
    height: 100%;
    display: flex;
    color: #8c939d;
    font-size: 28px;
    justify-content: center;
    align-items: center;
  }
</style>
