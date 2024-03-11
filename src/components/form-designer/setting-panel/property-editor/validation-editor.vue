<template>
  <a-form-item>
    <template #label>
      <span>
        {{ i18nt('designer.setting.validation') }}
        <a-tooltip effect="light" :title="i18nt('designer.setting.validationHelp')">
          <svg-icon icon-class="el-info" />
        </a-tooltip>
      </span>
    </template>
    <a-select v-model:value="optionModel.validation" allowClear :options="fieldValidators" />
  </a-form-item>
</template>

<script>
  import SvgIcon from '@/components/svg-icon';
  import i18n from '@/utils/i18n';

  export default {
    name: 'validation-editor',
    mixins: [i18n],
    components: {
      SvgIcon
    },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        fieldValidators: [
          { value: 'number', label: this.i18nt('designer.hint.numberValidator') },
          { value: 'letter', label: this.i18nt('designer.hint.letterValidator') },
          { value: 'letterAndNumber', label: this.i18nt('designer.hint.letterAndNumberValidator') },
          { value: 'mobilePhone', label: this.i18nt('designer.hint.mobilePhoneValidator') },
          { value: 'email', label: this.i18nt('designer.hint.emailValidator') },
          { value: 'url', label: this.i18nt('designer.hint.urlValidator') },
          { value: 'noChinese', label: this.i18nt('designer.hint.noChineseValidator') },
          { value: 'chinese', label: this.i18nt('designer.hint.chineseValidator') }
        ]
      };
    }
  };
</script>
