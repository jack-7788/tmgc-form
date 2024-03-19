<template>
  <a-form-item label="customRow.onClick" labelAlign="left" label-width="150px">
    <a-button
      type="info"
      shape="round"
      :class="[!!optionModel.customRow.onClick ? 'button-text-highlight' : '']"
      @click="editEventHandler('customRow.onClick', eventParams)"
    >
      {{ i18nt('designer.setting.addEventHandler') }}
    </a-button>
  </a-form-item>
  <a-form-item label="customRow.onDblclick" labelAlign="left" label-width="150px">
    <a-button
      type="info"
      shape="round"
      :class="[!!optionModel.customRow.onDblclick ? 'button-text-highlight' : '']"
      @click="editEventHandler('customRow.onDblclick', eventParams)"
    >
      {{ i18nt('designer.setting.addEventHandler') }}
    </a-button>
  </a-form-item>
  <a-form-item label="customRow.onMouseenter" labelAlign="left" label-width="150px">
    <a-button
      type="info"
      shape="round"
      :class="[!!optionModel.customRow.onMouseenter ? 'button-text-highlight' : '']"
      @click="editEventHandler('customRow.onMouseenter', eventParams)"
    >
      {{ i18nt('designer.setting.addEventHandler') }}
    </a-button>
  </a-form-item>
  <a-form-item label="customRow.onMouseleave" labelAlign="left" label-width="150px">
    <a-button
      type="info"
      shape="round"
      :class="[!!optionModel.customRow.onMouseleave ? 'button-text-highlight' : '']"
      @click="editEventHandler('customRow.onMouseleave', eventParams)"
    >
      {{ i18nt('designer.setting.addEventHandler') }}
    </a-button>
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import eventMixin from '@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin';

  export default {
    name: 'data-table-customRow-editor',
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
        eventParams: ['record', 'event']
      };
    }
  };
</script>
