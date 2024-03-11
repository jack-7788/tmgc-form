<template>
  <a-form-item label="onDrawerBeforeClose" label-width="150px">
    <a-button type="info"  plain shape='round' :class="[eventHandled ? 'button-text-highlight' : '']"
               @click="editEventHandler('onDrawerBeforeClose', eventParams)">
      {{i18nt('designer.setting.addEventHandler')}}</a-button>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"

  export default {
    name: "onDrawerBeforeClose-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
      eventHandled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        eventParams: [],
      }
    }
  }
</script>

<style scoped lang="scss">
.button-text-highlight {
  &.ant-btn {
    font-weight: bold;
    color: #409eff;
  }
}
</style>