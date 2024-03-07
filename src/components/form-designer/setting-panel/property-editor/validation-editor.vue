<template>
  <a-form-item>
    <template #label>
      <span>{{i18nt('designer.setting.validation')}}
        <a-tooltip effect="light" :title="i18nt('designer.setting.validationHelp')">
          <svg-icon icon-class="el-info" /></a-tooltip>
      </span>
    </template>
    <a-select v-model="optionModel.validation" filterable allowClear allow-create default-first-option>
      <a-select-option v-for="(fv, fvIdx) in fieldValidators"
                 :key="fvIdx"
                 :label="fv.label"
                 :value="fv.value"> {{ fv.label }}
      </a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import SvgIcon from '@/components/svg-icon'
  import i18n from "@/utils/i18n"

  export default {
    name: "validation-editor",
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
        fieldValidators: [
          {value: 'number', label: this.i18nt('designer.hint.numberValidator')},
          {value: 'letter', label: this.i18nt('designer.hint.letterValidator')},
          {value: 'letterAndNumber', label: this.i18nt('designer.hint.letterAndNumberValidator')},
          {value: 'mobilePhone', label: this.i18nt('designer.hint.mobilePhoneValidator')},
          {value: 'email', label: this.i18nt('designer.hint.emailValidator')},
          {value: 'url', label: this.i18nt('designer.hint.urlValidator')},
          {value: 'noChinese', label: this.i18nt('designer.hint.noChineseValidator')},
          {value: 'chinese', label: this.i18nt('designer.hint.chineseValidator')},
        ],
      }
    },

  }
</script>

<style scoped>

</style>
