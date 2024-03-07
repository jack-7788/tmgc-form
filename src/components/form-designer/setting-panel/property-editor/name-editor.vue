<template>
  <a-form-item name="name" :rules="nameRequiredRule">
    <template #label>
      <span>{{i18nt('designer.setting.uniqueName')}}
        <a-tooltip   :title="i18nt('designer.setting.editNameHelp')">
          <svg-icon icon-class="el-info" /></a-tooltip>
      </span>
    </template>
    <template v-if="!!selectedWidget.category || noFieldList">
      <a-input type="text" v-model:value="optionModel.name" :readonly="widgetNameReadonly" @change="updateWidgetNameAndRef"></a-input>
    </template>
    <template v-else>
      <a-select v-model:value="optionModel.name" allowClear  :disabled="widgetNameReadonly" @change="updateWidgetNameAndRef"
                 :title="i18nt('designer.setting.editNameHelp')">
        <a-select-option v-for="(sf, sfIdx) in serverFieldList" :key="sfIdx"   :value="sf.name">
        {{  sf.label }}
        </a-select-option>
      </a-select>
    </template>
  </a-form-item>
</template>

<script>
  import SvgIcon from '@/components/svg-icon'
  import i18n from "@/utils/i18n"
  import {isEmptyStr} from "@/utils/util"

  export default {
    name: "name-editor",
    mixins: [i18n],
    components: {
      SvgIcon
    },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    inject: ['serverFieldList', 'getDesignerConfig'],
    data() {
      return {
        nameRequiredRule: [{required: true, message: 'name required'}],
      }
    },
    computed: {
      noFieldList() {
        return !this.serverFieldList || (this.serverFieldList.length <= 0)
      },

      widgetNameReadonly() {
        return !!this.getDesignerConfig().widgetNameReadonly
      },

    },
    methods: {
      updateWidgetNameAndRef(newName) {
        let oldName = this.designer.selectedWidgetName
        if (isEmptyStr(newName)) {
          this.selectedWidget.options.name = oldName
          this.$message.info(this.i18nt('designer.hint.nameRequired'))
          return
        }

        if (!!this.designer.formWidget) {
          let foundRef = this.designer.formWidget.getWidgetRef(newName) // 检查newName是否已存在！！
          if (!!foundRef) {
            this.selectedWidget.options.name = oldName
            this.$message.info(this.i18nt('designer.hint.duplicateName') + newName)
            return
          }

          let widgetInDesign = this.designer.formWidget.getWidgetRef(oldName)
          if (!!widgetInDesign && !!widgetInDesign.registerToRefList) {
            widgetInDesign.registerToRefList(oldName)  //注册组件新的ref名称并删除老的ref！！
            let newLabel = this.getLabelByFieldName(newName)
            this.designer.updateSelectedWidgetNameAndLabel(this.selectedWidget, newName, newLabel)
          }
        }
      },

      getLabelByFieldName(fieldName) {
        for (let i = 0; i < this.serverFieldList.length; i++) {
          if (this.serverFieldList[i].name === fieldName) {
            return this.serverFieldList[i].label
          }
        }

        return null
      },

    }
  }
</script>

<style lang="scss" scoped>

</style>
