<template>
  <a-form-item label="onClick" label-width="150px">
    <a-button
      type="info"
      plain
      shape="round"
      :class="[optionModel.onClick ? 'button-text-highlight' : '']"
      @click="editEventHandler('onClick', eventParams)"
    >
      {{ i18nt('designer.setting.addEventHandler') }}</a-button
    >
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import eventMixin from '@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin';

  export default {
    name: 'onClick-editor',
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
      eventHandled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        eventParams: []
      };
    }
  };
</script>
