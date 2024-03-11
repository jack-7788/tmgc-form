<template>
  <a-form-item>
    <template #label>
      <span>{{i18nt('designer.setting.fileTypes')}}
        <a-tooltip effect="light" :title="i18nt('designer.setting.fileTypesHelp')">
          <svg-icon icon-class="el-info" /></a-tooltip>
      </span>
    </template>
    <a-select multiple allow-create filterable default-first-option
               v-model="optionModel.fileTypes" style="width: 100%">
      <a-select-option v-for="(ft, ftIdx) in uploadPictureTypes"
                 :key="ftIdx"
                 :label="ft.label"
                 :value="ft.value">
      </a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import SvgIcon from '@/components/svg-icon'
  import i18n from "@/utils/i18n"

  export default {
    name: "picture-upload-fileTypes-editor",
    mixins: [i18n],
    components: {
      SvgIcon
    },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    data() {
      return {
        uploadPictureTypes: [
          {value: 'jpg', label: 'jpg'}, /* label如用大写字母，选择两个文件类型就会导致设置面板快速抖动、闪烁，非常奇怪！！ */
          {value: 'jpeg', label: 'jpeg'},
          {value: 'png', label: 'png'},
          {value: 'gif', label: 'gif'},
        ],
      }
    }
  }
</script>

<style scoped>

</style>
