<template>
  <div class="side-scroll-bar">
    <div class="panel-container">
      <a-tabs v-model:activeKey="firstTab" class="no-bottom-margin indent-left-margin">
        <a-tab-pane key="componentLib">
          <template #tab>
            <span><svg-icon icon-class="el-set-up" /> {{ i18nt('designer.componentLib') }}</span>
          </template>

          <a-collapse v-model:activeKey="activeNames" class="widget-collapse">
            <a-collapse-panel key="containerTitle" :header="i18nt('designer.containerTitle')">
              <draggable
                tag="ul"
                :list="containers"
                item-key="key"
                :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                :clone="handleContainerWidgetClone"
                ghost-class="ghost"
                :sort="false"
                :move="checkContainerMove"
                @end="onContainerDragEnd"
              >
                <template #item="{ element: ctn }">
                  <li
                    class="container-widget-item"
                    :title="ctn.displayName"
                    @dblclick="addContainerByDbClick(ctn)"
                  >
                    <span>
                      <svg-icon :icon-class="ctn.icon" class-name="color-svg-icon" />
                      {{
                        i18n2t(
                          `designer.widgetLabel.${ctn.type}`,
                          `extension.widgetLabel.${ctn.type}`
                        )
                      }}
                    </span>
                  </li>
                </template>
              </draggable>
            </a-collapse-panel>

            <a-collapse-panel key="basicFieldTitle" :header="i18nt('designer.basicFieldTitle')">
              <draggable
                tag="ul"
                :list="basicFields"
                item-key="key"
                :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                :move="checkFieldMove"
                :clone="handleFieldWidgetClone"
                ghost-class="ghost"
                :sort="false"
              >
                <template #item="{ element: fld }">
                  <li
                    class="field-widget-item"
                    :title="fld.displayName"
                    @dblclick="addFieldByDbClick(fld)"
                  >
                    <span>
                      <svg-icon :icon-class="fld.icon" class-name="color-svg-icon" />
                      {{
                        i18n2t(
                          `designer.widgetLabel.${fld.type}`,
                          `extension.widgetLabel.${fld.type}`
                        )
                      }}
                    </span>
                  </li>
                </template>
              </draggable>
            </a-collapse-panel>

            <a-collapse-panel
              key="advancedFieldTitle"
              :header="i18nt('designer.advancedFieldTitle')"
            >
              <draggable
                tag="ul"
                :list="advancedFields"
                item-key="key"
                :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                :move="checkFieldMove"
                :clone="handleFieldWidgetClone"
                ghost-class="ghost"
                :sort="false"
              >
                <template #item="{ element: fld }">
                  <li
                    class="field-widget-item"
                    :title="fld.displayName"
                    @dblclick="addFieldByDbClick(fld)"
                  >
                    <span>
                      <svg-icon :icon-class="fld.icon" class-name="color-svg-icon" />
                      {{
                        i18n2t(
                          `designer.widgetLabel.${fld.type}`,
                          `extension.widgetLabel.${fld.type}`
                        )
                      }}
                    </span>
                  </li>
                </template>
              </draggable>
            </a-collapse-panel>

            <a-collapse-panel
              v-if="customFields.length"
              key="customFieldTitle"
              :header="i18nt('designer.customFieldTitle')"
            >
              <draggable
                tag="ul"
                :list="customFields"
                item-key="key"
                :group="{ name: 'dragGroup', pull: 'clone', put: false }"
                :move="checkFieldMove"
                :clone="handleFieldWidgetClone"
                ghost-class="ghost"
                :sort="false"
              >
                <template #item="{ element: fld }">
                  <li
                    class="field-widget-item"
                    :title="fld.displayName"
                    @dblclick="addFieldByDbClick(fld)"
                  >
                    <span>
                      <svg-icon :icon-class="fld.icon" class-name="color-svg-icon" />
                      {{
                        i18n2t(
                          `designer.widgetLabel.${fld.type}`,
                          `extension.widgetLabel.${fld.type}`
                        )
                      }}
                    </span>
                  </li>
                </template>
              </draggable>
            </a-collapse-panel>
          </a-collapse>
        </a-tab-pane>

        <a-tab-pane v-if="false && showFormTemplates()" key="formLib" style="padding: 8px">
          <template #tab>
            <span><svg-icon icon-class="el-form-template" /> {{ i18nt('designer.formLib') }}</span>
          </template>

          <template v-for="(ft, idx) in formTemplates" :key="idx">
            <a-card :body-style="{ padding: '0' }" shadow="hover" class="ft-card">
              <a-popover placement="right" trigger="hover">
                <template #content>
                  <img :src="ftImages[idx].imgUrl" style="width: 200px" />
                </template>
                <img :src="ftImages[idx].imgUrl" style="height: 600px; width: 720px" />
              </a-popover>
              <div class="bottom clear-fix">
                <span class="ft-title">#{{ idx + 1 }} {{ ft.title }}</span>
                <a-button type="text" class="right-button" @click="loadFormTemplate(ft.jsonUrl)">
                  {{ i18nt('designer.hint.loadFormTemplate') }}
                </a-button>
              </div>
            </a-card>
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
  import SvgIcon from '@/components/svg-icon';
  import {
    containers as CONS,
    basicFields as BFS,
    advancedFields as AFS,
    customFields as CFS
  } from './widgetsConfig';
  import { formTemplates } from './templatesConfig';
  import { addWindowResizeHandler, generateId } from '@/utils/util';
  import i18n from '@/utils/i18n';
  import axios from 'axios';

  import { TpfConfirm } from '@/hooks/TpfConfirm';

  export default {
    name: 'FieldPanel',
    mixins: [i18n],
    components: { SvgIcon },
    props: {
      designer: Object
    },
    inject: ['getBannedWidgets', 'getDesignerConfig'],
    data() {
      return {
        designerConfig: this.getDesignerConfig(),

        firstTab: 'componentLib',

        scrollerHeight: 0,

        activeNames: [
          'containerTitle',
          'basicFieldTitle',
          'advancedFieldTitle',
          'customFieldTitle'
        ],

        containers: [],
        basicFields: [],
        advancedFields: [],
        customFields: [],

        formTemplates: formTemplates,
        ftImages: []
      };
    },
    computed: {
      //
    },
    created() {
      this.loadWidgets();
    },
    mounted() {
      //this.loadWidgets()

      this.scrollerHeight = window.innerHeight - 56 + 'px';
      addWindowResizeHandler(() => {
        this.$nextTick(() => {
          this.scrollerHeight = window.innerHeight - 56 + 'px';
          //console.log(this.scrollerHeight)
        });
      });
    },
    methods: {
      isBanned(wName) {
        return this.getBannedWidgets().indexOf(wName) > -1;
      },

      showFormTemplates() {
        if (this.designerConfig['formTemplates'] === undefined) {
          return true;
        }

        return !!this.designerConfig['formTemplates'];
      },

      loadWidgets() {
        this.containers = CONS.map(con => {
          return {
            key: generateId(),
            ...con,
            displayName: this.i18n2t(
              `designer.widgetLabel.${con.type}`,
              `extension.widgetLabel.${con.type}`
            )
          };
        }).filter(con => {
          return !con.internal && !this.isBanned(con.type);
        });

        this.basicFields = BFS.map(fld => {
          return {
            key: generateId(),
            ...fld,
            displayName: this.i18n2t(
              `designer.widgetLabel.${fld.type}`,
              `extension.widgetLabel.${fld.type}`
            )
          };
        }).filter(fld => {
          return !this.isBanned(fld.type);
        });

        this.advancedFields = AFS.map(fld => {
          return {
            key: generateId(),
            ...fld,
            displayName: this.i18n2t(
              `designer.widgetLabel.${fld.type}`,
              `extension.widgetLabel.${fld.type}`
            )
          };
        }).filter(fld => {
          return !this.isBanned(fld.type);
        });

        this.customFields = CFS.map(fld => {
          return {
            key: generateId(),
            ...fld,
            displayName: this.i18n2t(
              `designer.widgetLabel.${fld.type}`,
              `extension.widgetLabel.${fld.type}`
            )
          };
        }).filter(fld => {
          return !this.isBanned(fld.type);
        });
      },

      handleContainerWidgetClone(origin) {
        return this.designer.copyNewContainerWidget(origin);
      },

      handleFieldWidgetClone(origin) {
        return this.designer.copyNewFieldWidget(origin);
      },

      /* draggable组件的move钩子是在内部子组件被拖放到其他draggable组件时触发！！ */
      checkContainerMove(evt) {
        return this.designer.checkWidgetMove(evt);
      },

      /* draggable组件的move钩子是在内部子组件被拖放到其他draggable组件时触发！！ */
      checkFieldMove(evt) {
        return this.designer.checkFieldMove(evt);
      },

      onContainerDragEnd(evt) {
        //console.log('Drag end of container: ')
        //console.log(evt)
      },

      addContainerByDbClick(container) {
        this.designer.addContainerByDbClick(container);
      },

      addFieldByDbClick(widget) {
        this.designer.addFieldByDbClick(widget);
      },

      loadFormTemplate(jsonUrl) {
        TpfConfirm({
          type: 'confirm',
          content: this.i18nt('designer.setting.loadFormTemplateHint'),
          title: this.i18nt('render.hint.prompt'),
          okText: this.i18nt('render.hint.confirm'),
          cancelText: this.i18nt('render.hint.cancel')
        })
          .then(() => {
            axios
              .get(jsonUrl)
              .then(res => {
                let modifiedFlag = false;
                if (typeof res.data === 'string') {
                  modifiedFlag = this.designer.loadFormJson(JSON.parse(res.data));
                } else if (res.data.constructor === Object) {
                  modifiedFlag = this.designer.loadFormJson(res.data);
                }
                if (modifiedFlag) {
                  this.designer.emitHistoryChange();
                }

                this.$message.success(this.i18nt('designer.hint.loadFormTemplateSuccess'));
              })
              .catch(error => {
                this.$message.error(
                  this.i18nt('designer.hint.loadFormTemplateFailed') + ':' + error
                );
              });
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .color-svg-icon {
    color: $--color-primary;
  }

  div.panel-container {
    padding-bottom: 10px;
  }

  .no-bottom-margin :deep(.ant-collapse-header) {
    margin-bottom: 0;
  }

  .indent-left-margin {
    :deep(.ant-tabs-nav) {
      margin-left: 20px;
    }
  }
  .ant-collapse-item :deep(ul) > li {
    list-style: none;
  }

  .widget-collapse {
    border-top-width: 0;

    :deep(.ant-collapse-content) {
      padding-bottom: 6px;
      > .ant-collapse-content-box {
        padding: 4px;
      }

      ul {
        padding: 0;
        // padding-left: 10px;  /* 重置IE11默认样式 */
        margin: 0; /* 重置IE11默认样式 */
        margin-block-start: 0;
        margin-block-end: 0.25em;
        display: flex;
        flex-wrap: wrap;

        &:after {
          content: '';
          display: block;
          clear: both;
        }

        .container-widget-item,
        .field-widget-item {
          //text-align: center; // 居中显示不太美观
          width: calc(50% - 5px);
          padding: 5px;
          margin-bottom: 5px;

          cursor: move;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          background: #f1f2f3;
          border: 1px solid transparent;
          &:nth-child(2n) {
            margin-left: 5px;
          }
        }

        .container-widget-item:hover,
        .field-widget-item:hover {
          background: #ebeef5;
          border: 1px solid $--color-primary;
        }

        .drag-handler {
          position: absolute;
          top: 0;
          left: 160px;
          background-color: #dddddd;
          border-radius: 5px;
          padding-right: 5px;
          font-size: 11px;
          color: #666666;
        }
      }
    }
  }

  .ft-card {
    margin-bottom: 10px;

    .bottom {
      margin-top: 10px;
      line-height: 12px;
    }

    .ft-title {
      font-size: 13px;
      font-weight: bold;
    }

    .right-button {
      padding: 0;
      float: right;
    }

    .clear-fix:before,
    .clear-fix:after {
      display: table;
      content: '';
    }

    .clear-fix:after {
      clear: both;
    }
  }
  .side-scroll-bar {
    height: 100%;
    overflow: auto;

    .panel-container {
      height: 100%;
      overflow: auto;

      & > .ant-tabs {
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
        :deep(.ant-tabs-content-holder) {
          flex: 1 0 0;
          overflow: auto;
        }
      }
    }
  }
</style>
