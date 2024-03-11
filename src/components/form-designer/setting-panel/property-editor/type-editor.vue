<template>
  <a-form-item :label="i18nt('designer.setting.displayType')" v-if="selectedWidget.type === 'input'">
    <a-select v-model:value="optionModel.type">
      <a-select-option   value="text">text</a-select-option>
      <!-- 当input的type设置为number时，如果输入非数字字符，则v-model拿到的值为空字符串，无法实现输入校验！故屏蔽之！！ -->
      <!--
      <a-option label="number" value="number"></a-option>
      -->
      <a-select-option  value="password"> password </a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"

  export default {
    name: "type-editor",
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    computed: {

    }
  }
</script>

<style lang="scss" scoped>

</style>
