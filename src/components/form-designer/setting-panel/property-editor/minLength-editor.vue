<template>
  <a-form-item :label="i18nt('designer.setting.minLength')">
    <a-input-number @input="inputNumberHandler" class="hide-spin-button"
              :min="0" v-model:value="minLength" style="width: 100%"></a-input-number>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "minLength-editor",
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    computed: {
      minLength: {
        get() {
          return this.optionModel['minLength']
        },

        set(newValue) {
          if (!newValue || isNaN(newValue)) {
            this.optionModel.minLength = null
          } else {
            this.optionModel.minLength = Number(newValue)
          }
        }
      },

    }
  }
</script>

<style scoped>

</style>
