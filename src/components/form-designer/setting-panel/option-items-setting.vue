<template>
  <div class="option-items-pane">
    <a-radio-group
      v-if="
        selectedWidget.type === 'radio' ||
        (selectedWidget.type === 'select' && ['combobox'].includes(selectedWidget.options.mode))
      "
      v-model:value="optionModel.defaultValue"
      @change="emitDefaultValueChange"
    >
      <draggable
        tag="ul"
        :list="optionModel.optionItems"
        item-key="id"
        v-bind="{ group: 'optionsGroup', ghostClass: 'ghost', handle: '.drag-option' }"
      >
        <template #item="{ element: option, index: idx }">
          <li>
            <a-radio :value="option.value">
              <a-input v-model:value="option.value" size="small" style="width: 60px" />
              <a-input v-model:value="option.label" size="small" style="width: 70px" />
              <i class="iconfont icon-drag drag-option"></i>
              <a-button size="small" type="danger" @click="deleteOption(option, idx)">
                删除
              </a-button>
            </a-radio>
          </li>
        </template>
      </draggable>
    </a-radio-group>
    <a-checkbox-group
      v-else-if="
        selectedWidget.type === 'checkbox' ||
        (selectedWidget.type === 'select' &&
          ['multiple', 'tags'].includes(selectedWidget.options.mode))
      "
      v-model:value="optionModel.defaultValue"
      @change="emitDefaultValueChange"
      style="width: 100%"
    >
      <draggable
        tag="ul"
        :list="optionModel.optionItems"
        item-key="id"
        v-bind="{ group: 'optionsGroup', ghostClass: 'ghost', handle: '.drag-option' }"
      >
        <template #item="{ element: option, index: idx }">
          <li>
            <a-checkbox :value="option.value">
              <a-input v-model:value="option.value" size="small" style="width: 60px" />
              <a-input v-model:value="option.label" size="small" style="width: 80px" />
              <i class="iconfont icon-drag drag-option"></i>
              <a-button size="small" type="danger" @click="deleteOption(option, idx)">
                删除
              </a-button>
            </a-checkbox>
          </li>
        </template>
      </draggable>
    </a-checkbox-group>
    <!-- 设置联级选择默认值 -->
    <div v-else-if="selectedWidget.type === 'cascader'" class="full-width-input">
      <a-cascader
        v-model:value="optionModel.defaultValue"
        :multiple="optionModel.multiple"
        :options="optionModel.optionItems"
        @change="emitDefaultValueChange"
        :placeholder="i18nt('render.hint.selectPlaceholder')"
      />
    </div>
    <!-- 设置树的默认值 -->
    <div v-else-if="selectedWidget.type === 'treeSelect'" class="full-width-input">
      <a-tree-select
        v-model:value="optionModel.defaultValue"
        :treeData="optionModel.optionItems"
        @change="emitDefaultValueChange"
        :placeholder="i18nt('render.hint.selectPlaceholder')"
      />
    </div>
    <div v-if="['cascader', 'treeSelect'].includes(selectedWidget.type)">
      <a-button type="text" @click="importCascaderOptions">
        {{ i18nt('designer.setting.importOptions') }}
      </a-button>
      <a-button type="text" @click="resetDefault">
        {{ i18nt('designer.setting.resetDefault') }}
      </a-button>
    </div>

    <div v-if="['radio', 'checkbox', 'select'].includes(selectedWidget.type)">
      <a-button type="text" @click="addOption">{{ i18nt('designer.setting.addOption') }}</a-button>
      <a-button type="text" @click="importOptions">
        {{ i18nt('designer.setting.importOptions') }}
      </a-button>
      <a-button type="text" @click="resetDefault">
        {{ i18nt('designer.setting.resetDefault') }}
      </a-button>
    </div>

    <a-modal
      :title="i18nt('designer.setting.importOptions')"
      v-model:visible="showImportDialogFlag"
      :show-close="true"
      custom-class="drag-dialog small-padding-dialog"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <a-form-item>
        <a-textarea type="textarea" rows="10" v-model:value="optionLines" />
      </a-form-item>
      <template #footer>
        <div class="dialog-footer">
          <a-button size="large" type="primary" @click="saveOptions">
            {{ i18nt('designer.hint.confirm') }}
          </a-button>
          <a-button size="large" @click="showImportDialogFlag = false">
            {{ i18nt('designer.hint.cancel') }}
          </a-button>
        </div>
      </template>
    </a-modal>

    <a-modal
      :title="i18nt('designer.setting.importOptions')"
      v-model:visible="showImportCascaderDialogFlag"
      :show-close="true"
      custom-class="drag-dialog small-padding-dialog"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <code-editor v-model="cascaderOptions" mode="json" :readonly="false" />
      <template #footer>
        <div class="dialog-footer">
          <a-button size="large" type="primary" @click="saveCascaderOptions">
            {{ i18nt('designer.hint.confirm') }}
          </a-button>
          <a-button size="large" @click="showImportCascaderDialogFlag = false">
            {{ i18nt('designer.hint.cancel') }}
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import CodeEditor from '@/components/code-editor/index';
  import i18n from '@/utils/i18n';

  export default {
    name: 'OptionItemsSetting',
    mixins: [i18n],
    components: {
      CodeEditor
    },
    props: {
      designer: Object,
      selectedWidget: Object
    },
    data() {
      return {
        showImportDialogFlag: false,
        optionLines: '',

        cascaderOptions: '',
        showImportCascaderDialogFlag: false,

        //separator: '||',
        separator: ','
      };
    },
    computed: {
      optionModel() {
        return this.selectedWidget.options;
      }
    },
    watch: {
      'selectedWidget.options': {
        deep: true,
        handler(val) {
          //console.log('888888', 'Options change!')
        }
      }
    },
    methods: {
      emitDefaultValueChange() {
        if (!!this.designer && !!this.designer.formWidget) {
          const fieldWidget = this.designer.formWidget.getWidgetRef(
            this.selectedWidget.options.name
          );
          if (!!fieldWidget && !!fieldWidget.refreshDefaultValue) {
            fieldWidget.refreshDefaultValue();
          }
        }
      },

      deleteOption(option, index) {
        this.optionModel.optionItems.splice(index, 1);
      },

      addOption() {
        const newValue = this.optionModel.optionItems.length + 1;
        this.optionModel.optionItems.push({
          value: newValue,
          label: 'new option'
        });
      },

      importOptions() {
        this.optionLines = '';
        if (this.optionModel.optionItems.length > 0) {
          this.optionModel.optionItems.forEach(opt => {
            if (opt.value === opt.label) {
              this.optionLines += opt.value + '\n';
            } else {
              this.optionLines += opt.value + this.separator + opt.label + '\n';
            }
          });
        }

        this.showImportDialogFlag = true;
      },

      saveOptions() {
        const lineArray = this.optionLines.split('\n');
        if (lineArray.length > 0) {
          this.optionModel.optionItems = [];
          lineArray.forEach(optLine => {
            if (!!optLine && !!optLine.trim()) {
              if (optLine.indexOf(this.separator) !== -1) {
                this.optionModel.optionItems.push({
                  value: optLine.split(this.separator)[0],
                  label: optLine.split(this.separator)[1]
                });
              } else {
                this.optionModel.optionItems.push({
                  value: optLine,
                  label: optLine
                });
              }
            }
          });
        } else {
          this.optionModel.optionItems = [];
        }

        this.showImportDialogFlag = false;
      },

      resetDefault() {
        if (
          this.selectedWidget.type === 'checkbox' ||
          (this.selectedWidget.type === 'select' && this.selectedWidget.options.multiple)
        ) {
          this.optionModel.defaultValue = [];
        } else {
          this.optionModel.defaultValue = '';
        }

        this.emitDefaultValueChange();
      },

      importCascaderOptions() {
        this.cascaderOptions = JSON.stringify(this.optionModel.optionItems, null, '  ');
        this.showImportCascaderDialogFlag = true;
      },

      saveCascaderOptions() {
        try {
          const newOptions = JSON.parse(this.cascaderOptions);
          this.optionModel.optionItems = newOptions;
          //TODO: 是否需要重置选项默认值？？

          this.showImportCascaderDialogFlag = false;
        } catch (ex) {
          this.$message.error(this.i18nt('designer.hint.invalidOptionsData') + ex.message);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .option-items-pane {
    width: 100%;

    ul {
      padding-inline-start: 6px;
      padding-left: 6px; /* 重置IE11默认样式 */
      > li {
        margin-bottom: 5px;
      }
    }
  }

  li.ghost {
    background: #fff;
    border: 2px dotted $--color-primary;
  }

  .drag-option {
    cursor: move;
  }

  .dialog-footer .ant-button {
    width: 100px;
  }

  .full-width-input {
    width: 100% !important;

    :deep(.ant-cascader) {
      width: 100% !important;
    }
  }
</style>
