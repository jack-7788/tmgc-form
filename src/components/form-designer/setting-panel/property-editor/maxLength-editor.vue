<template>
  <a-form-item :label="i18nt('designer.setting.maxLength')">
    <a-input-number @input="inputNumberHandler" class="hide-spin-button"
              :min="0" v-model:value="maxLength" style="width: 100%"></a-input-number>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "maxLength-editor",
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    computed: {
      maxLength: {
        get() {
          return this.optionModel['maxLength']
        },

        set(newValue) {
          if (!newValue || isNaN(newValue)) {
            this.optionModel.maxLength = null
          } else {
            this.optionModel.maxLength = Number(newValue)
          }
        }
      },
    }
  }
</script>

<style scoped>

</style>
