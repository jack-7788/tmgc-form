<template>
  <a-form-item>
    <template #label>
      <span>{{i18nt('designer.setting.fileTypes')}}
        <a-tooltip effect="light" :title="i18nt('designer.setting.fileTypesHelp')">
          <svg-icon icon-class="el-info" /></a-tooltip>
      </span>
    </template>
    <a-select multiple allow-create filterable default-first-option
               v-model:value="optionModel.fileTypes" style="width: 100%">
      <a-select-option v-for="(ft, ftIdx) in uploadFileTypes"
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
    name: "file-upload-fileTypes-editor",
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
        uploadFileTypes: [
          {value: 'doc', label: 'doc'},
          {value: 'xls', label: 'xls'},
          {value: 'docx', label: 'docx'},
          {value: 'xlsx', label: 'xlsx'},
        ],
      }
    }
  }
</script>

<style scoped>

</style>
