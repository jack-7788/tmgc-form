<template>
  <a-form-item :label="i18nt('designer.setting.disabled')">
    <a-space>
      <a-switch v-model:checked="optionModel.disabled" />
      <a-button
        type="info"
        shape="round"
        :class="[!!optionModel.onDisabled ? 'button-text-highlight' : '']"
        @click="editEventHandler('onDisabled', eventParams)"
      >
        编辑函数
      </a-button>
    </a-space>
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import eventMixin from '@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin';

  export default {
    name: 'disabled-editor',
    mixins: [i18n, eventMixin],

    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        eventParams: ['event']
      };
    }
  };
</script>

<style scoped></style>
