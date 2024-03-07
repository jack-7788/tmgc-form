<template>
  <div class="option-items-pane">
    <a-radio-group v-if="(selectedWidget.type === 'radio') || ((selectedWidget.type === 'select') && !selectedWidget.options.multiple)"
                    v-model="optionModel.defaultValue" @change="emitDefaultValueChange">
      <draggable tag="ul" :list="optionModel.optionItems" item-key="id"
                 v-bind="{group:'optionsGroup', ghostClass: 'ghost', handle: '.drag-option'}">
        <template #item="{ element: option, index: idx }">
          <li>
            <a-radio :label="option.value">
              <a-input v-model:value="option.value" size="small" style="width: 100px"></a-input>
              <a-input v-model:value="option.label" size="small" style="width: 100px"></a-input>
              <i class="iconfont icon-drag drag-option"></i>
              <a-button shape='circle' plain size="small" type="danger" @click="deleteOption(option, idx)"
                         icon="el-icon-minus" class="col-delete-button"></a-button>
            </a-radio>
          </li>
        </template>
      </draggable>
    </a-radio-group>
    <a-checkbox-group v-else-if="(selectedWidget.type === 'checkbox') || ((selectedWidget.type === 'select') && selectedWidget.options.multiple)"
                    v-model:value="optionModel.defaultValue" @change="emitDefaultValueChange">
      <draggable tag="ul" :list="optionModel.optionItems" item-key="id"
                 v-bind="{group:'optionsGroup', ghostClass: 'ghost', handle: '.drag-option'}">
        <template #item="{ element: option, index: idx }">
          <li>
            <a-checkbox :label="option.value">
              <a-input v-model:value="option.value" size="small" style="width: 100px"></a-input>
              <a-input v-model:value="option.label" size="small" style="width: 100px"></a-input>
              <i class="iconfont icon-drag drag-option"></i>
              <a-button circle plain size="small" type="danger" @click="deleteOption(option, idx)"
                         icon="el-icon-minus" class="col-delete-button"></a-button>
            </a-checkbox>
          </li>
        </template>
      </draggable>
    </a-checkbox-group>
    <div v-else-if="(selectedWidget.type === 'cascader')" class="full-width-input">
      <a-cascader v-model:value="optionModel.defaultValue" :options="optionModel.optionItems"
                   @change="emitDefaultValueChange"
                   :placeholder="i18nt('render.hint.selectPlaceholder')">
      </a-cascader>
    </div>
    <div v-if="(selectedWidget.type === 'cascader')">
      <a-button type="text" @click="importCascaderOptions">{{i18nt('designer.setting.importOptions')}}</a-button>
      <a-button type="text" @click="resetDefault">{{i18nt('designer.setting.resetDefault')}}</a-button>
    </div>

    <div v-if="(selectedWidget.type === 'radio') || (selectedWidget.type === 'checkbox') || (selectedWidget.type === 'select')">
      <a-button type="text" @click="addOption">{{i18nt('designer.setting.addOption')}}</a-button>
      <a-button type="text" @click="importOptions">{{i18nt('designer.setting.importOptions')}}</a-button>
      <a-button type="text" @click="resetDefault">{{i18nt('designer.setting.resetDefault')}}</a-button>
    </div>

    <!-- <div v-if="showImportDialogFlag" class="" v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']"> -->
      <a-modal :title="i18nt('designer.setting.importOptions')" v-model:visable="showImportDialogFlag"
                 :show-close="true" custom-class="drag-dialog small-padding-dialog" append-to-body
                 :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <a-form-item>
          <a-textarea type="textarea" rows="10" v-model:value="optionLines"></a-textarea>
        </a-form-item>
        <template #footer>
          <div class="dialog-footer">
            <a-button size="large" type="primary" @click="saveOptions">{{i18nt('designer.hint.confirm')}}</a-button>
            <a-button size="large" @click="showImportDialogFlag = false">{{i18nt('designer.hint.cancel')}}</a-button>
          </div>
        </template>
      </a-modal>
    <!-- </div> -->

    <!-- <div v-if="showImportCascaderDialogFlag" class="" v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']"> -->
      <a-modal :title="i18nt('designer.setting.importOptions')" v-model:visable="showImportCascaderDialogFlag"
                 :show-close="true" custom-class="drag-dialog small-padding-dialog" append-to-body
                 :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <code-editor v-model="cascaderOptions" mode="json" :readonly="false"></code-editor>
        <template #footer>
          <div class="dialog-footer">
            <a-button size="large" type="primary" @click="saveCascaderOptions">{{i18nt('designer.hint.confirm')}}</a-button>
            <a-button size="large" @click="showImportCascaderDialogFlag = false">{{i18nt('designer.hint.cancel')}}</a-button>
          </div>
        </template>
      </a-modal>
    </div>

  <!-- </div> -->
</template>

<script>
  import CodeEditor from '@/components/code-editor/index'
  import i18n from "@/utils/i18n";

  export default {
    name: "OptionItemsSetting",
    mixins: [i18n],
    components: {
      CodeEditor,
    },
    props: {
      designer: Object,
      selectedWidget: Object,
    },
    data() {
      return {
        showImportDialogFlag: false,
        optionLines: '',

        cascaderOptions: '',
        showImportCascaderDialogFlag: false,

        //separator: '||',
        separator: ',',
      }
    },
    computed: {
      optionModel() {
        return this.selectedWidget.options
      },

    },
    watch: {
      'selectedWidget.options': {
        deep: true,
        handler(val) {
          //console.log('888888', 'Options change!')
        }
      },
    },
    methods: {
      emitDefaultValueChange() {
        if (!!this.designer && !!this.designer.formWidget) {
          let fieldWidget = this.designer.formWidget.getWidgetRef(this.selectedWidget.options.name)
          if (!!fieldWidget && !!fieldWidget.refreshDefaultValue) {
            fieldWidget.refreshDefaultValue()
          }
        }
      },

      deleteOption(option, index) {
        this.optionModel.optionItems.splice(index, 1)
      },

      addOption() {
        let newValue = this.optionModel.optionItems.length + 1
        this.optionModel.optionItems.push({
          value: newValue,
          label: 'new option'
        })
      },

      importOptions() {
        this.optionLines = ''
        if (this.optionModel.optionItems.length > 0) {
          this.optionModel.optionItems.forEach((opt) => {
            if (opt.value === opt.label) {
              this.optionLines += opt.value + '\n'
            } else {
              this.optionLines += opt.value + this.separator + opt.label + '\n'
            }
          })
        }

        this.showImportDialogFlag = true
      },

      saveOptions() {
        let lineArray = this.optionLines.split('\n')
        //console.log('test', lineArray)
        if (lineArray.length > 0) {
          this.optionModel.optionItems = []
          lineArray.forEach((optLine) => {
            if (!!optLine && !!optLine.trim()) {
              if (optLine.indexOf(this.separator) !== -1) {
                this.optionModel.optionItems.push({
                  value: optLine.split(this.separator)[0],
                  label: optLine.split(this.separator)[1]
                })
              } else {
                this.optionModel.optionItems.push({
                  value: optLine,
                  label: optLine
                })
              }
            }
          })
        } else {
          this.optionModel.optionItems = []
        }

        this.showImportDialogFlag = false
      },

      resetDefault() {
        if ((this.selectedWidget.type === 'checkbox') ||
            ((this.selectedWidget.type === 'select') && this.selectedWidget.options.multiple)) {
          this.optionModel.defaultValue = []
        } else {
          this.optionModel.defaultValue = ''
        }

        this.emitDefaultValueChange()
      },

      importCascaderOptions() {
        this.cascaderOptions = JSON.stringify(this.optionModel.optionItems, null, '  ')
        this.showImportCascaderDialogFlag = true
      },

      saveCascaderOptions() {
        try {
          let newOptions = JSON.parse(this.cascaderOptions)
          this.optionModel.optionItems = newOptions
          //TODO: 是否需要重置选项默认值？？

          this.showImportCascaderDialogFlag = false
        } catch (ex) {
          this.$message.error(this.i18nt('designer.hint.invalidOptionsData') + ex.message)
        }
      },

    }
  }
</script>

<style lang="scss" scoped>
  .option-items-pane {
    width: 100%;

    ul {
      padding-inline-start: 6px;
      padding-left: 6px; /* 重置IE11默认样式 */
    }
  }

  li.ghost{
    background: #fff;
    border: 2px dotted $--color-primary;
  }

  .drag-option {
    cursor: move;
  }

  .small-padding-dialog :deep(.el-dialog__body) {
    padding: 10px 15px;
  }

  .dialog-footer .el-button {
    width: 100px;
  }

  .full-width-input {
    width: 100% !important;

    :deep(.el-cascader) {
      width: 100% !important;
    }
  }

</style>
