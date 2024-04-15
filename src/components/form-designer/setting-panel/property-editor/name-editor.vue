<template>
  <a-form-item name="name" :rules="nameRequiredRule">
    <template #label>
      <span>
        {{ i18nt('designer.setting.uniqueName') }}
        <a-tooltip :title="i18nt('designer.setting.editNameHelp')">
          <svg-icon icon-class="el-info" />
        </a-tooltip>
      </span>
    </template>
    <template v-if="!!selectedWidget.category || noFieldList">
      <a-input
        type="text"
        v-model:value="optionModel.name"
        :readonly="widgetNameReadonly"
        @change="updateWidgetNameAndRef"
      >
        <template #suffix>
          <a @click="copyFormJson">复制</a>
        </template>
      </a-input>
    </template>
    <template v-else>
      <div class="t-flex">
        <a-select
          class="t-flex-1"
          v-model:value="optionModel.name"
          allowClear
          :disabled="widgetNameReadonly"
          @change="updateWidgetNameAndRef"
          :title="i18nt('designer.setting.editNameHelp')"
          :options="fieldList"
          :fieldNames="{ label: 'showName', value: 'fieldCode' }"
        />
        <a @click="copyFormJson">复制</a>
      </div>
    </template>
  </a-form-item>
</template>

<script>
  import SvgIcon from '@/components/svg-icon';
  import i18n from '@/utils/i18n';
  import { isEmptyStr, copyToClipboard } from '@/utils/util';

  export default {
    name: 'name-editor',
    mixins: [i18n],
    components: {
      SvgIcon
    },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    inject: ['serverFieldList', 'getDesignerConfig'],
    data() {
      return {
        nameRequiredRule: [{ required: true, message: '名称必填' }]
      };
    },
    watch: {
      fieldList: {
        deep: true,
        handler(val) {
          if (val.length) {
            this.optionModel.name = '';
          }
        }
      }
    },
    computed: {
      fieldList() {
        if (this.serverFieldList) {
          return this.serverFieldList() || [];
        }
        return [];
      },
      noFieldList() {
        if (this.fieldList) {
          return this.fieldList.length <= 0;
        }
        return true;
      },

      widgetNameReadonly() {
        return !!this.getDesignerConfig().widgetNameReadonly;
      }
    },
    methods: {
      copyFormJson(e) {
        copyToClipboard(this.optionModel.name, e, this.$message, '复制成功', '复制失败');
      },
      updateWidgetNameAndRef(newName, ops) {
        console.log('newName, ops: ', newName, ops);
        if (ops) {
          this.optionModel.label = ops.showName;
        }
        const oldName = this.designer.selectedWidgetName;
        if (isEmptyStr(newName)) {
          this.selectedWidget.options.name = oldName;
          this.$message.warning(this.i18nt('designer.hint.nameRequired'));
          return;
        }

        if (!!this.designer.formWidget) {
          const foundRef = this.designer.formWidget.getWidgetRef(newName); // 检查newName是否已存在！！
          if (!!foundRef) {
            this.selectedWidget.options.name = oldName;
            this.$message.warning(this.i18nt('designer.hint.duplicateName') + newName);
            return;
          }

          const widgetInDesign = this.designer.formWidget.getWidgetRef(oldName);
          if (!!widgetInDesign && !!widgetInDesign.registerToRefList) {
            widgetInDesign.registerToRefList(oldName); //注册组件新的ref名称并删除老的ref！！
            const newLabel = this.getLabelByFieldName(newName);
            this.designer.updateSelectedWidgetNameAndLabel(this.selectedWidget, newName, newLabel);
          }
        }
      },

      getLabelByFieldName(fieldName) {
        for (let i = 0; i < this.serverFieldList.length; i++) {
          if (this.serverFieldList[i].name === fieldName) {
            return this.serverFieldList[i].label;
          }
        }

        return null;
      }
    }
  };
</script>

<style lang="scss" scoped></style>
