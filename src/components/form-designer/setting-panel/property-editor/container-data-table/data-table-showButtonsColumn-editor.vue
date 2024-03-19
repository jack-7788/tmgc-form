<template>
  <a-form-item :label="i18nt('designer.setting.showButtonsColumn')">
    <a-space>
      <a-switch v-model:checked="optionModel.showButtonsColumn" />
      <a-button
        v-if="!!optionModel.showButtonsColumn"
        type="primary"
        shape="round"
        @click="editButtonsColumn"
      >
        {{ i18nt('designer.setting.editAction') }}
      </a-button>
    </a-space>
  </a-form-item>
  <a-modal
    :title="i18nt('designer.setting.buttonsColumnEdit')"
    v-model:visible="showButtonsEditDialog"
    :show-close="true"
    dialogClass="drag-dialog"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    width="1250px"
  >
    <a-form label-width="110" layout="horizontal" :model="optionModel">
      <a-row :gutter="8">
        <a-col :span="11">
          <a-form-item
            name="buttonsColumnTitle"
            :label="i18nt('designer.setting.buttonsColumnTitle')"
          >
            <a-input v-model:value="optionModel.buttonsColumnTitle" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            name="buttonsColumnWidth"
            :label="i18nt('designer.setting.buttonsColumnWidth')"
          >
            <a-input-number v-model:value="optionModel.buttonsColumnWidth" />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item name="buttonsColumnFixed" :label="i18nt('designer.setting.fixedColumn')">
            <a-select v-model:value="optionModel.buttonsColumnFixed" allowClear style="width: 100%">
              <a-select-option value="left">left</a-select-option>
              <a-select-option value="right">right</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-divider content-position="left">
            {{ i18nt('designer.setting.operationButtonsSetting') }}
          </a-divider>
        </a-col>
      </a-row>
      <draggable
        v-model="optionModel.operationButtons"
        item-key="id"
        v-bind="{ ghostClass: 'ghost', handle: '.drag-handler' }"
      >
        <template #item="{ element: btn, index: bIdx }">
          <a-row :gutter="8" class="button-row">
            <a-col :span="1" class="drag-sort-col">
              <i class="iconfont icon-drag drag-handler"></i>
            </a-col>
            <a-col :span="3">
              <a-form-item
                :name="'operationButtons.' + bIdx + '.name'"
                :label="i18nt('designer.setting.operationButtonName')"
              >
                <a-input
                  v-model:value="btn.name"
                  @focus="onButtonNameFocus"
                  @change="event => onButtonNameChange(event.target.value, bIdx)"
                  :placeholder="i18nt('designer.setting.operationButtonName')"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <a-form-item
                :name="'operationButtons.' + bIdx + '.label'"
                :label="i18nt('designer.setting.operationButtonLabel')"
              >
                <a-input
                  v-model:value="btn.label"
                  :placeholder="i18nt('designer.setting.operationButtonLabel')"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <a-form-item
                :name="'operationButtons.' + bIdx + '.type'"
                :label="i18nt('designer.setting.operationButtonType')"
              >
                <a-select
                  v-model:value="btn.type"
                  :placeholder="i18nt('designer.setting.operationButtonType')"
                >
                  <a-select-option value="primary">primary</a-select-option>
                  <a-select-option value="ghost">ghost</a-select-option>
                  <a-select-option value="dashed">dashed</a-select-option>
                  <a-select-option value="text">text</a-select-option>
                  <a-select-option value="link">link</a-select-option>
                  <a-select-option value="default">default</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="3">
              <a-form-item
                :name="'operationButtons.' + bIdx + '.size'"
                :label="i18nt('designer.setting.operationButtonSize')"
              >
                <a-select
                  v-model:value="btn.size"
                  :placeholder="i18nt('designer.setting.operationButtonSize')"
                >
                  <a-select-option value="large">large</a-select-option>
                  <a-select-option value="default">default</a-select-option>
                  <a-select-option value="small">small</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item :label="'按钮形状'">
                <a-select v-model:value="btn.shape">
                  <a-select-option value="default">default</a-select-option>
                  <a-select-option value="circle">circle</a-select-option>
                  <a-select-option value="round">round</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item
                :name="'operationButtons.' + bIdx + '.hidden'"
                :label="i18nt('designer.setting.operationButtonHidden')"
              >
                <a-switch v-model:checked="btn.hidden" />
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item
                :name="'operationButtons.' + bIdx + '.disabled'"
                :label="i18nt('designer.setting.operationButtonDisabled')"
              >
                <a-switch v-model:checked="btn.disabled" />
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-form-item>
                <a-button
                  :class="[{ 'button-text-highlight': !!btn.onClick }]"
                  @click="editClickEvent(btn)"
                >
                  点击事件
                </a-button>
              </a-form-item>
            </a-col>
            <a-col :span="1">
              <a-button type="link" @click="deleteOperationButton(bIdx)">删除</a-button>
            </a-col>
          </a-row>
        </template>
      </draggable>
      <a-row :gutter="0">
        <a-col :span="4">
          <a-button type="primary" size="default" @click="addOperationButton">
            {{ i18nt('designer.setting.addOperationButton') }}
          </a-button>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <div class="dialog-footer">
        <a-button size="default" @click="showButtonsEditDialog = false">
          {{ i18nt('designer.hint.closePreview') }}
        </a-button>
      </div>
    </template>
  </a-modal>
  <CodeModalEditor
    v-model="currentEditBtn.onClick"
    ref="CodeModalEditorRef"
    :event-header="`${currentEditBtn.name}.onClick(record,index,column,btn){`"
  />
</template>

<script>
  import i18n from '@/utils/i18n';
  import { generateId } from '@/utils/util';
  import CodeModalEditor from '@/components/code-editor/code-modal-editor.vue';
  import { TpfConfirm } from '@/hooks/TpfConfirm';

  export default {
    name: 'showButtonsColumn-editor',
    mixins: [i18n],
    components: { CodeModalEditor },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        showButtonsEditDialog: false,
        currentEditBtn: {}
      };
    },
    methods: {
      editClickEvent(row) {
        this.currentEditBtn = row;
        this.$refs.CodeModalEditorRef.open(row.onClick);
      },
      addOperationButton() {
        this.optionModel.operationButtons = this.optionModel.operationButtons || [];
        this.optionModel.operationButtons.push({
          name: 'btn' + generateId(),
          label: 'new btn',
          type: 'text',
          size: 'small',
          shape: 'default',
          hidden: false,
          disabled: false,
          onClick: ''
        });
      },
      onButtonNameFocus(event) {
        this.oldButtonName = event.target.value;
      },
      onButtonNameChange(newName, btnIdx) {
        let sameNameFlag = false;
        this.optionModel.operationButtons.map((tb, tbIdx) => {
          if (tb.name === newName && tbIdx !== btnIdx) {
            sameNameFlag = true;
          }
        });
        if (sameNameFlag) {
          this.$message.error(this.i18nt('designer.setting.operationButtonDuplicatedNameError'));
          this.optionModel.operationButtons[btnIdx].name = this.oldButtonName;
        }
      },
      deleteOperationButton(idx) {
        TpfConfirm({
          type: 'confirm',
          content: this.i18nt('designer.setting.deleteOperationButtonHint'),
          title: this.i18nt('render.hint.prompt'),
          okText: this.i18nt('render.hint.confirm'),
          cancelText: this.i18nt('render.hint.cancel')
        })
          .then(() => {
            this.optionModel.operationButtons.splice(idx, 1);
          })
          .catch(error => {
            //this.$message.error(error)
          });
      },
      editButtonsColumn() {
        this.showButtonsEditDialog = true;
      }
    }
  };
</script>

<style lang="less" scoped>
  .button-row {
    border-bottom: 1px solid #e1e2e3;
    margin-bottom: 12px;
  }
  .drag-sort-col {
    padding-top: 8px;
    cursor: move;
  }
</style>
