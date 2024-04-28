<template>
  <a-form-item :label="i18nt('designer.setting.hidden')">
    <a-space>
      <a-switch v-model:checked="optionModel.hidden" />
      <a-button
        type="info"
        shape="round"
        :class="[!!optionModel.onHidden ? 'button-text-highlight' : '']"
        @click="editEventHandler('onHidden', eventParams)"
      >
        编辑函数
      </a-button>
    </a-space>
  </a-form-item>
  <a-form-item :label="`隐藏时是否占位`" v-if="!!optionModel.hidden">
    <a-space>
      <a-switch v-model:checked="optionModel.holdHidden" />
    </a-space>
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import eventMixin from '@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin';

  export default {
    name: 'hidden-editor',
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
