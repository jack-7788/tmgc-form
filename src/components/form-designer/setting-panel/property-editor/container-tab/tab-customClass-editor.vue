<!--
  因tabs属性并不包含于options属性之中，故只能跟其他options属性之内的属性值合并设置，此处选择与customClass合并！！
-->

<template>
  <div>
    <a-form-item :label="i18nt('designer.setting.customClass')">
      <a-select
        v-model:value="optionModel.customClass"
        allowClear
        mode="tags"
        :options="cssClassList"
      />
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.tabPaneSetting')" />
    <a-form-item label-width="0" class="panes-setting">
      <a-radio-group v-model:value="optionModel.activeTab">
        <draggable
          tag="ul"
          :list="selectedWidget.tabs"
          item-key="id"
          v-bind="{ group: 'panesGroup', ghostClass: 'ghost', handle: '.drag-option' }"
        >
          <template #item="{ element: tpItem, index: tpIdx }">
            <li class="col-item">
              <a-radio :value="tpItem.options.label" style="margin-right: 8px">
                {{ i18nt('designer.setting.paneActive') }}
              </a-radio>
              <a-input type="text" v-model:value="tpItem.options.label" style="width: 120px" />
              <i class="iconfont icon-drag drag-option"></i>
              <a-button
                size="small"
                type="danger"
                @click="deleteTabPane(selectedWidget, tpIdx, tpItem)"
                class="col-delete-button"
              >
                删除
              </a-button>
            </li>
          </template>
        </draggable>
      </a-radio-group>
      <div>
        <a-button type="text" @click="addTabPane(selectedWidget)">
          {{ i18nt('designer.setting.addTabPane') }}
        </a-button>
      </div>
    </a-form-item>
  </div>
</template>

<script>
  import i18n from '@/utils/i18n';
  //import Draggable from 'vuedraggable'
  import { deepClone } from '@/utils/util';

  export default {
    name: 'tab-customClass-editor',
    componentName: 'PropertyEditor',
    mixins: [i18n],
    components: {
      //Draggable,
    },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        cssClassList: []
      };
    },
    created() {
      this.cssClassList = deepClone(this.designer.getCssClassList());
      //监听表单css代码改动事件并重新加载！
      this.designer.handleEvent('form-css-updated', cssClassList => {
        this.cssClassList = cssClassList;
      });
    },
    methods: {
      onTabPaneActiveChange(evt, tpItem) {
        //TODO: !!!
      },

      addTabPane(curTabs) {
        this.designer.addTabPaneOfTabs(curTabs);
        this.designer.emitHistoryChange();
      },

      deleteTabPane(curTabs, tpIdx, tpItem) {
        console.log('curTabs, tpIdx: ', curTabs, tpIdx, tpItem);
        if (curTabs.tabs.length === 1) {
          this.$message.info(this.i18nt('designer.hint.lastPaneCannotBeDeleted'));
          return;
        }
        if (this.optionModel.activeTab === tpItem.options.label) {
          this.optionModel.activeTab = '';
        }
        this.designer.deleteTabPaneOfTabs(curTabs, tpIdx);
        this.designer.emitHistoryChange();
      }
    }
  };
</script>

<style lang="scss" scoped>
  li.col-item {
    list-style: none;

    span.col-span-title {
      display: inline-block;
      font-size: 13px;
      width: 120px;
    }

    .col-delete-button {
      margin-left: 6px;
    }
  }

  .panes-setting {
    ul {
      padding-inline-start: 0;
      padding-left: 0; /* 重置IE11默认样式 */
      margin: 0;
    }

    .drag-option {
      cursor: move;
    }

    li.ghost {
      background: #fff;
      border: 2px dotted $--color-primary;
    }
  }
</style>
