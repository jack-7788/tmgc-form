<template>
  <a-modal
    :title="title"
    v-model:visible="showWidgetEventDialogFlag"
    :show-close="true"
    :centered="true"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :width="800"
  >
    <a-alert type="info" :closable="false" :message="eventHeader" v-if="eventHeader" />
    <code-editor :mode="mode" :readonly="readonly" v-model="eventHandlerCode" ref="ecEditor" />
    <a-alert type="info" :closable="false" message="}" v-if="eventHeader" />
    <template #footer>
      <div class="dialog-footer">
        <a-button @click="showWidgetEventDialogFlag = false">
          {{ i18nt('designer.hint.cancel') }}
        </a-button>
        <a-button type="primary" @click="saveEventHandler">
          {{ i18nt('designer.hint.confirm') }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script lang="jsx">
  import CodeEditor from './index';
  import i18n from '@/utils/i18n';

  export default {
    name: 'code-modal-editor',
    mixins: [i18n],
    components: { CodeEditor },
    props: {
      modelValue: String,
      eventHeader: String,
      title: {
        type: String,
        default: '事件处理函数'
      },
      readonly: {
        type: Boolean,
        default: false
      },
      mode: {
        type: String,
        default: 'javascript'
      }
    },
    data() {
      return {
        showWidgetEventDialogFlag: false,
        eventHandlerCode: ''
      };
    },
    methods: {
      open(val) {
        const value = this.modelValue || val || '';
        this.showWidgetEventDialogFlag = true;
        this.eventHandlerCode = value.trim();
      },
      saveEventHandler() {
        const val = this.eventHandlerCode.trim();
        this.$emit('update:modelValue', val);
        this.showWidgetEventDialogFlag = false;
        this.$emit('save');
      }
    }
  };
</script>

<style lang="scss" scoped></style>
