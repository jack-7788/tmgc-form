<template>
  <a-form-item :label="i18nt('designer.setting.multipleLimit')">
    <a-input-number v-model:value="optionModel.multipleLimit" :min="0"
                     class="hide-spin-button" style="width: 100%"></a-input-number>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "multipleLimit-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
  }
</script>

<style scoped>

</style>
