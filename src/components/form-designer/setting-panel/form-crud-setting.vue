<template>
  <div class="t-p-[10px]">
    <a-form-item>
      <HttpEditor
        label="设置表单编辑api"
        buttonName="编辑"
        drawerTitle="表单配置"
        :optionModel="formConfig.serveList.vformUpdate"
      />
      <HttpEditor
        label="设置表单获取详情api"
        buttonName="编辑"
        drawerTitle="表单配置"
        :optionModel="formConfig.serveList.vformDetail"
      />
    </a-form-item>
    <a-form-item v-if="false">
      <a-form-item
        :label="eventName"
        label-width="150px"
        v-for="(eventValue, eventName) in eventParamsMap"
        :key="eventName"
      >
        <a-button
          type="info"
          shape="round"
          :class="[getFormEventHandled(eventName) ? 'button-text-highlight' : '']"
          @click="editFormEventHandler(eventName)"
        >
          {{ i18nt('designer.setting.addEventHandler') }}
        </a-button>
      </a-form-item>
    </a-form-item>
    <a-modal
      :title="i18nt('designer.setting.editFormEventHandler')"
      v-model:visible="showFormEventDialogFlag"
      :show-close="true"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <a-alert type="info" :closable="false" :message="'form.' + eventParamsMap[curEventName]" />
      <code-editor
        :mode="'javascript'"
        :readonly="false"
        v-model="formEventHandlerCode"
        ref="ecEditor"
      />
      <a-alert type="info" :closable="false" message="}" />
      <template #footer>
        <div class="dialog-footer">
          <a-button @click="showFormEventDialogFlag = false">
            {{ i18nt('designer.hint.cancel') }}
          </a-button>
          <a-button type="primary" @click="saveFormEventHandler">
            {{ i18nt('designer.hint.confirm') }}
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
  import i18n from '@/utils/i18n';
  import HttpEditor from '@/components/http-editor/index.vue';
  import CodeEditor from '@/components/code-editor/index';

  export default {
    name: 'form-crud-setting',
    mixins: [i18n],
    inject: ['getGlobalDsv'],
    components: { HttpEditor, CodeEditor },
    props: {
      designer: Object,
      formConfig: Object
    },
    data() {
      return {
        curEventName: '',
        formEventHandlerCode: '',
        showFormEventDialogFlag: false,
        eventParamsMap: {}
      };
    },
    methods: {
      saveFormEventHandler() {
        const codeHints = this.$refs.ecEditor.getEditorAnnotations();
        let syntaxErrorFlag = false;
        if (!!codeHints && codeHints.length > 0) {
          codeHints.forEach(chItem => {
            if (chItem.type === 'error') {
              syntaxErrorFlag = true;
            }
          });

          if (syntaxErrorFlag) {
            this.$message.error(this.i18nt('designer.setting.syntaxCheckWarning'));
            return;
          }
        }

        this.formConfig[this.curEventName] = this.formEventHandlerCode;
        this.showFormEventDialogFlag = false;
      },
      editFormEventHandler(eventName) {
        this.curEventName = eventName;
        this.formEventHandlerCode = this.formConfig[eventName];
        this.showFormEventDialogFlag = true;
      },
      getFormEventHandled(eventName) {
        return !!this.formConfig[eventName] && this.formConfig[eventName].length > 0;
      }
    }
  };
</script>
