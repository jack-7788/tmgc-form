<template>
  <div class="field-wrapper" :class="{ 'design-time-bottom-margin': !!this.designer }">
    <a-form-item
      v-if="!!field.formItemFlag && (!field.options.hidden || designState === true)"
      :labelCol="{ style: { width: labelWidth + 'px' } }"
      :title="field.options.labelTooltip"
      :size="size"
      :rules="rules"
      :name="getPropName()"
      :labelAlign="labelAlign"
      :class="[selected ? 'selected' : '', customClass]"
      @click.stop="selectField(field)"
    >
      <template #label>
        <div class="label-box">
          <span v-if="!!field.options.labelIconClass" class="custom-label">
            <template v-if="field.options.labelIconPosition === 'front'">
              <template v-if="!!field.options.labelTooltip">
                <a-tooltip :title="field.options.labelTooltip" :overlayStyle="{ zIndex: 1000 }">
                  <svg-icon :icon-class="field.options.labelIconClass" />
                </a-tooltip>
                <a-tooltip :title="label" :overlayStyle="{ zIndex: 1000 }">
                  <div class="label-text">
                    {{ label }}
                  </div>
                </a-tooltip>
              </template>
              <template v-else>
                <svg-icon :icon-class="field.options.labelIconClass" />
                <a-tooltip :title="label" :overlayStyle="{ zIndex: 1000 }">
                  <div class="label-text">
                    {{ label }}
                  </div>
                </a-tooltip>
              </template>
            </template>
            <template v-else-if="field.options.labelIconPosition === 'rear'">
              <template v-if="!!field.options.labelTooltip">
                <a-tooltip :title="label" :overlayStyle="{ zIndex: 1000 }">
                  <div class="label-text">
                    {{ label }}
                  </div>
                </a-tooltip>
                <a-tooltip :title="field.options.labelTooltip" :overlayStyle="{ zIndex: 1000 }">
                  <svg-icon :icon-class="field.options.labelIconClass" />
                </a-tooltip>
              </template>
              <template v-else>
                <a-tooltip :title="label" :overlayStyle="{ zIndex: 1000 }">
                  <div class="label-text">
                    {{ label }}
                  </div>
                </a-tooltip>
                <svg-icon :icon-class="field.options.labelIconClass" />
              </template>
            </template>
          </span>
          <template v-else>
            <a-tooltip :title="label" :overlayStyle="{ zIndex: 1000 }">
              <div class="label-text">
                {{ label }}
              </div>
            </a-tooltip>
          </template>
        </div>
      </template>

      <slot></slot>
    </a-form-item>

    <template v-if="!!this.designer">
      <div class="field-action" v-if="designer.selectedId === field.id">
        <i
          :title="i18nt('designer.hint.selectParentWidget')"
          @click.stop="selectParentWidget(field)"
          ><svg-icon icon-class="el-back"
        /></i>
        <i
          v-if="!!parentList && parentList.length > 1"
          :title="i18nt('designer.hint.moveUpWidget')"
          @click.stop="moveUpWidget(field)"
        >
          <svg-icon icon-class="el-move-up" />
        </i>
        <i
          v-if="!!parentList && parentList.length > 1"
          :title="i18nt('designer.hint.moveDownWidget')"
          @click.stop="moveDownWidget(field)"
        >
          <svg-icon icon-class="el-move-down" />
        </i>
        <i :title="i18nt('designer.hint.remove')" @click.stop="removeFieldWidget">
          <svg-icon icon-class="el-delete" />
        </i>
      </div>

      <div class="drag-handler background-opacity" v-if="designer.selectedId === field.id">
        <i :title="i18nt('designer.hint.dragHandler')"><svg-icon icon-class="el-drag-move" /></i>
        <i>
          {{ i18n2t(`designer.widgetLabel.${field.type}`, `extension.widgetLabel.${field.type}`) }}
        </i>
        <i v-if="field.options.hidden === true"><svg-icon icon-class="el-hide" /></i>
      </div>
    </template>
  </div>
</template>

<script>
  import SvgIcon from '@/components/svg-icon';
  import i18n from '@/utils/i18n';

  export default {
    name: 'form-item-wrapper',
    mixins: [i18n],
    components: {
      SvgIcon
    },
    props: {
      field: Object,
      designer: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,

      designState: {
        type: Boolean,
        default: false
      },

      subFormRowIndex: {
        /* 子表单组件行索引，从0开始计数 */ type: Number,
        default: -1
      },
      subFormColIndex: {
        /* 子表单组件列索引，从0开始计数 */ type: Number,
        default: -1
      },
      subFormRowId: {
        /* 子表单组件行Id，唯一id且不可变 */ type: String,
        default: ''
      },

      rules: Array
    },
    inject: ['getFormConfig', 'getSubFormFieldFlag', 'getSubFormName'],
    computed: {
      formConfig() {
        return this.getFormConfig();
      },

      selected() {
        return !!this.designer && this.field.id === this.designer.selectedId;
      },

      label() {
        if (!!this.field.options.labelHidden) {
          return '';
        }

        return this.field.options.label;
      },

      labelWidth() {
        if (!!this.field.options.labelHidden) {
          return 0;
        }

        if (!!this.field.options.labelWidth) {
          return this.field.options.labelWidth;
        }

        if (!!this.designer) {
          return this.designer.formConfig.labelWidth;
        } else {
          return this.formConfig.labelWidth;
        }
      },

      labelAlign() {
        if (!!this.field.options.labelAlign) {
          return this.field.options.labelAlign;
        }

        if (!!this.designer) {
          return this.designer.formConfig.labelAlign || 'right';
        } else {
          return this.formConfig.labelAlign || 'right';
        }
      },
      size() {
        if (!!this.field.options.size) {
          return this.field.options.size;
        }
        if (!!this.designer) {
          return this.designer.formConfig.size || 'middle';
        } else {
          return this.formConfig.size || 'middle';
        }
      },

      customClass() {
        return this.field.options.customClass.join(' ');
      },

      subFormName() {
        return !!this.getSubFormName ? this.getSubFormName() : '';
      },

      subFormItemFlag() {
        return !!this.getSubFormFieldFlag ? this.getSubFormFieldFlag() : false;
      }
    },
    created() {
      //
    },
    methods: {
      selectField(field) {
        if (!!this.designer) {
          this.designer.setSelected(field);
          this.designer.emitEvent('field-selected', this.parentWidget); //发送选中组件的父组件对象
        }
      },

      selectParentWidget() {
        if (this.parentWidget) {
          this.designer.setSelected(this.parentWidget);
        } else {
          this.designer.clearSelected();
        }
      },

      moveUpWidget() {
        this.designer.moveUpWidget(this.parentList, this.indexOfParentList);
        this.designer.emitHistoryChange();
      },

      moveDownWidget() {
        this.designer.moveDownWidget(this.parentList, this.indexOfParentList);
        this.designer.emitHistoryChange();
      },

      removeFieldWidget() {
        if (!!this.parentList) {
          let nextSelected = null;
          if (this.parentList.length === 1) {
            if (!!this.parentWidget) {
              nextSelected = this.parentWidget;
            }
          } else if (this.parentList.length === 1 + this.indexOfParentList) {
            nextSelected = this.parentList[this.indexOfParentList - 1];
          } else {
            nextSelected = this.parentList[this.indexOfParentList + 1];
          }

          this.$nextTick(() => {
            this.parentList.splice(this.indexOfParentList, 1);
            //if (!!nextSelected) {
            this.designer.setSelected(nextSelected);
            //}

            this.designer.emitHistoryChange();
          });
        }
      },

      getPropName() {
        if (this.subFormItemFlag && !this.designState) {
          return this.subFormName + '.' + this.subFormRowIndex + '.' + this.field.options.name + '';
        } else {
          return this.field.options.name;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../../styles/global.scss';

  .design-time-bottom-margin {
    margin-bottom: 5px;
  }

  .field-wrapper {
    position: relative;

    .field-action {
      position: absolute;
      bottom: 0;
      right: -2px;
      height: 22px;
      line-height: 22px;
      background: var(--ant-primary-4); //$--color-primary;

      // background: var(--ant-primary-color);
      z-index: 9;

      i {
        font-size: 14px;
        color: #fff;
        margin: 0 3px;
        cursor: pointer;
      }
    }

    .drag-handler {
      position: absolute;
      top: 0;
      left: -1px;
      height: 20px;
      line-height: 20px;
      z-index: 9;

      i {
        font-size: 12px;
        font-style: normal;
        color: #fff;
        margin: 4px;
        cursor: move;
      }

      &:hover {
        background: var(--ant-primary-color);
      }
    }
  }

  .field-action,
  .drag-handler {
    :deep(.svg-icon) {
      margin-left: 0;
      margin-right: 0;
    }
  }
  .ant-form-item {
    position: relative;

    :deep(.ant-form-item-label) {
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    span.custom-label {
      display: flex;
      i {
        margin: 0 3px;
      }
    }

    /* 隐藏Chrome浏览器中el-input数字输入框右侧的上下调整小箭头 */
    :deep(.hide-spin-button) input::-webkit-outer-spin-button,
    :deep(.hide-spin-button) input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
    }
  }

  .static-content-item {
    min-height: 20px;
    display: flex; /* 垂直居中 */
    align-items: center; /* 垂直居中 */
  }
  .ant-form-item.selected,
  .static-content-item.selected {
    outline: 2px solid var(--ant-primary-color);
  }
</style>
