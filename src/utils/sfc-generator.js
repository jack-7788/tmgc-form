import { isNotNull, generateId } from '@/utils/util';
import { genVue2JS } from '@/utils/vue2js-generator';
import { beautifierOpts } from '@/utils/beautifierLoader';
import { genVue3JS } from '@/utils/vue3js-generator';
import {
  formatDate1,
  formatDate2,
  formatDate3,
  formatDate4,
  formatDate5,
  formatNumber1,
  formatNumber2,
  formatNumber3,
  formatNumber4,
  formatNumber5,
  formatNumber6,
  formatNumber7
} from '@/utils/format';
import { emptyAttr } from '@/utils/sfc-util';

export function buildClassAttr(ctn, defaultClass) {
  const cop = ctn.options;
  const gridClassArray = [];
  !!defaultClass && gridClassArray.push(defaultClass);
  !!cop.customClass && cop.customClass.length > 0 && gridClassArray.push(cop.customClass.join(' '));
  return gridClassArray.length > 0 ? `class="${gridClassArray.join(' ')}"` : '';
}

export function getLabelAlign(widget, subWidget) {
  return subWidget.options.labelAlign || widget.options.labelAlign;
}

export function getCustomLabel(subWidget) {
  const html = [];
  if (!!subWidget.options.labelIconClass) {
    html.push(`<span class="custom-label">`);
    if (subWidget.options.labelIconPosition === 'front') {
      html.push(
        `<a-tooltip message="${subWidget.options.labelTooltip}" ><i class="${subWidget.options.labelIconClass}"></i></el-tooltip>${subWidget.options.label}`
      );
    } else {
      html.push(`<i class="${subWidget.options.labelIconClass}"></i>${subWidget.options.label}`);
    }
    html.push(`</span>`);
  } else {
    html.push(
      `<span title="${subWidget.options.labelTooltip || ''}">${subWidget.options.label}</span>`
    );
  }

  return html.join('');
}

const rowId = () => {
  return `id${generateId()}`;
};

const containerTemplates = {
  //容器组件属性
  grid: (ctn, formConfig) => {
    const gridClassAttr = buildClassAttr(ctn);
    const gridTemplate = `<a-row ${gridClassAttr}>
${ctn.cols
  .map(col => {
    const colOpt = col.options;
    const spanAttr = !!colOpt.responsive ? '' : `:span="${colOpt.span}"`;
    const mdAttr = !colOpt.responsive ? '' : `:md="${colOpt.md}"`;
    const smAttr = !colOpt.responsive ? '' : `:sm="${colOpt.sm}"`;
    const xsAttr = !colOpt.responsive ? '' : `:xs="${colOpt.xs}"`;
    const offsetAttr = !!colOpt.offset ? `:offset="${colOpt.offset}"` : '';
    const pushAttr = !!colOpt.push ? `:push="${colOpt.push}"` : '';
    const pullAttr = !!colOpt.pull ? `:pull="${colOpt.pull}"` : '';
    const colClassAttr = buildClassAttr(col, 'grid-cell');
    return `<a-col ${spanAttr} ${mdAttr} ${smAttr} ${xsAttr} ${offsetAttr} ${pushAttr} ${pullAttr} ${colClassAttr}>
    ${col.widgetList
      .map(cw => {
        if (cw.category === 'container') {
          return buildContainerWidget(cw, formConfig);
        } else {
          return buildFieldWidget(cw, formConfig);
        }
      })
      .join('')}
    </a-col>`;
  })
  .join('')}
</a-row>`;

    return gridTemplate;
  },

  table: (ctn, formConfig) => {
    const tableClassAttr = buildClassAttr(ctn, 'table-layout');
    const tableTemplate = `<div class="table-container">
  <table ${tableClassAttr}><tbody>
  ${ctn.rows
    .map(tr => {
      return `<tr>${tr.cols
        .filter(td => !td.merged)
        .map(td => {
          const tdOpt = td.options;
          const tdClassAttr = buildClassAttr(td, 'table-cell');
          const colspanAttr =
            !isNaN(tdOpt.colspan) && tdOpt.colspan !== 1 ? `colspan="${tdOpt.colspan}"` : '';
          const rowspanAttr =
            !isNaN(tdOpt.rowspan) && tdOpt.rowspan !== 1 ? `rowspan="${tdOpt.rowspan}"` : '';

          const tdStyleArray = [];
          !!tdOpt.cellWidth && tdStyleArray.push('width: ' + tdOpt.cellWidth + ' !important');
          !!tdOpt.cellHeight && tdStyleArray.push('height: ' + tdOpt.cellHeight + ' !important');
          const tdStyleAttr = tdStyleArray.length > 0 ? `style="${tdStyleArray.join(';')}"` : '';

          return `<td ${tdClassAttr} ${colspanAttr} ${rowspanAttr} ${tdStyleAttr}>${td.widgetList
            .map(tw => {
              if (tw.category === 'container') {
                return buildContainerWidget(tw, formConfig);
              } else {
                return buildFieldWidget(tw, formConfig);
              }
            })
            .join('')}
                    </td>`;
        })
        .join('')}</tr>`;
    })
    .join('')}
  </tbody></table>
</div>`;
    return tableTemplate;
  },

  tab: (ctn, formConfig) => {
    const tabClassAttr = buildClassAttr(ctn);
    const vModel = ctn.tabs && ctn.tabs.length > 0 ? `v-model="${ctn.options.name}ActiveTab"` : '';
    const tabTemplate = `<div class="tab-container">
  <a-tabs ${vModel} type="${ctn.displayType}" ${tabClassAttr}>
    ${ctn.tabs
      .map(tab => {
        const tabOpt = tab.options;
        const disabledAttr = tabOpt.disabled === true ? `disabled` : '';
        return `<a-tab-pane key="${tabOpt.name}" tab="${tabOpt.label}" ${disabledAttr}>
        ${tab.widgetList
          .map(tw => {
            if (tw.category === 'container') {
              return buildContainerWidget(tw, formConfig);
            } else {
              return buildFieldWidget(tw, formConfig);
            }
          })
          .join('')}</a-tab-pane>`;
      })
      .join('')}
  </a-tabs>
</div>`;

    return tabTemplate;
  },

  'sub-form': (ctn, formConfig, vue3Flag = false) => {
    const tabClassAttr = buildClassAttr(ctn);

    const tableTemplate = `<div class="container-wrapper"  ${emptyAttr('class', tabClassAttr)}>
      <div key="${ctn.id}" class="sub-form-container">
        <a-row class="header-row">
        <div class="action-header-column">
          <span class="action-label">操作</span>
          <a-button round type="primary" size="mini" class="action-button" @click="addSubFormRow('${
            ctn.id
          }')" title="新增行">新增${
      vue3Flag
        ? ` <Plus style="width:1em; height:1em;" />`
        : `<i class="el-icon-plus el-icon-right"></i>`
    }
          </a-button>
        </div>

          ${ctn.widgetList
            .map(subWidget => {
              const subWidgetContainer = `<div key="${
                subWidget.id + 'thc'
              }" class="field-header-column"

            ${emptyAttr(
              'class',
              (getLabelAlign(ctn, subWidget), !!subWidget.options.required ? 'is-required' : '')
            )}
            style="width: ${subWidget.options.columnWidth}">
              ${getCustomLabel(subWidget)}
            </div>`;
              return subWidgetContainer;
            })
            .join('')}
        </a-row>

        ${(() => {
          const rowHtml = [];

          rowHtml.push(
            `<a-row class="sub-form-row" v-for="(subWidget,sfrIdx) in formData.${ctn.id}" :key="sfrIdx">`
          );

          rowHtml.push(`<div class="sub-form-action-column hide-label">
            <div class="action-button-column">
              <a-button circle type="" ${
                vue3Flag ? `icon="Plus"` : `icon="el-icon-circle-plus-outline"`
              } @click="insertSubFormRow('${ctn.id}',sfrIdx)"
                         title="插入行"></el-button>
              <a-button circle type="" ${
                vue3Flag ? `icon="Delete"` : `icon="el-icon-delete"`
              } @click="deleteSubFormRow('${ctn.id}',sfrIdx)"
                         title="删除行"></a-button>
              <span class="row-number-span">#{{sfrIdx+1}}</span>
            </div>
          </div>`);
          ctn.widgetList.map((subWidget, swIdx) => {
            rowHtml.push(
              `<div class="sub-form-table-column hide-label" key="${
                subWidget.id + 'tc' + rowId()
              }"  style="width: ${subWidget.options.columnWidth}">`
            );
            rowHtml.push(buildSubFormFieldWidget(subWidget, formConfig, ctn));
            rowHtml.push(`</div>`);
          });

          rowHtml.push(`</el-row>`);
          return rowHtml.join('');
        })()}
      </div>
    </div>`;

    return tableTemplate;
  },

  'grid-sub-form': (ctn, formConfig, vue3Flag = false) => {
    const tabClassAttr = buildClassAttr(ctn);

    const tableTemplate = `<div class="container-wrapper"  ${emptyAttr('class', tabClassAttr)}>
      <div key="${ctn.id}" class="sub-form-container">
        <a-row class="header-row">
        <div class="grid-sub-form action-header-column">
          <span class="action-label">操作</span>
          <a-button  round type="primary" size="mini" class="action-button" @click="addSubFormRow('${
            ctn.id
          }')"
          title="新增行">新增${
            vue3Flag
              ? ` <Plus style="width:1em; height:1em;" />`
              : `<i class="el-icon-plus el-icon-right"></i>`
          }
          </a-button>
        </div>
        </a-row>

        ${(() => {
          const rowHtml = [];

          rowHtml.push(
            `<div class="grid-sub-form sub-form-row" v-for="(subWidget,sfrIdx) in formData.${ctn.id}" :key="sfrIdx">`
          );

          rowHtml.push(`<div class="grid-sub-form sub-form-action-column hide-label">
            <div class="action-button-column">
              <a-button circle type="" ${
                vue3Flag ? `icon="Plus"` : `icon="el-icon-circle-plus-outline"`
              } @click="insertSubFormRow('${ctn.id}',sfrIdx)"
                         title="插入行"></a-button>
              <a-button circle type="" ${
                vue3Flag ? `icon="Delete"` : `icon="el-icon-delete"`
              } @click="deleteSubFormRow('${ctn.id}',sfrIdx)"
                         title="删除行"></a-button>
              <span class="row-number-span">#{{sfrIdx+1}}</span>
            </div>
          </div>`);

          rowHtml.push(`<div class="grid-sub-form grid-sub-form-data-row">`);

          ctn.widgetList
            .map(subWidget => {
              rowHtml.push(containerTemplates['grid'](subWidget, formConfig, ctn, vue3Flag));
            })
            .join('');

          rowHtml.push(`  </div>`);
          rowHtml.push(`</div>`);

          return rowHtml.join('');
        })()}
      </div>
    </div>`;

    return tableTemplate;
  },

  'data-table': (ctn, formConfig, vue3Flag = false) => {
    const tabClassAttr = buildClassAttr(ctn, 'container-wrapper');

    const buttonsColumnFixed = () => {
      if (ctn.options.buttonsColumnFixed === undefined) {
        return 'right';
      }

      return !ctn.options.buttonsColumnFixed ? false : ctn.options.buttonsColumnFixed;
    };
    const paginationLayout = () => {
      return !!ctn.options.smallPagination
        ? 'prev, pager, next'
        : 'total, prev, pager, next, jumper';
    };

    const formatterValue = (row, column, cellValue) => {
      if (!cellValue) {
        return '';
      }

      if (!!column.formatS) {
        switch (column.formatS) {
          case 'd1':
            return formatDate1(cellValue);
          case 'd2':
            return formatDate2(cellValue);
          case 'd3':
            return formatDate3(cellValue);
          case 'd4':
            return formatDate4(cellValue);
          case 'd5':
            return formatDate5(cellValue);
          case 'n1':
            return formatNumber1(cellValue);
          case 'n2':
            return formatNumber2(cellValue);
          case 'n3':
            return formatNumber3(cellValue);
          case 'n4':
            return formatNumber4(cellValue);
          case 'n5':
            return formatNumber5(cellValue);
          case 'n6':
            return formatNumber6(cellValue);
          case 'n7':
            return formatNumber7(cellValue);
        }
      }
      return cellValue;
    };

    const tableTemplate = `<div ${tabClassAttr}>
    <a-table ref="dataTable" :data="formData.${ctn.id}.tableData" ${emptyAttr(
      'class',
      ctn.options.customClass.toString().replace(/,/g, ' ')
    )}
								height="${ctn.options.tableHeight}" :style="{width: '${ctn.options.tableWidth}'}"
								:border="${ctn.options.border}" :show-summary="${ctn.options.showSummary}"
								size="${ctn.options.tableSize}" :stripe="${ctn.options.stripe}"
                :highlight-current-row="${!ctn.options.showCheckBox}"
								:cell-style="{padding: '${ctn.options.rowSpacing + 'px 0'} '}" >

      ${(() => {
        if (!!ctn.options.showIndex) {
          return ` <a-table-column  type="index" width="50" fixed="left"></a-table-column>`;
        } else {
          return ``;
        }
      })()}

      ${(() => {
        if (!!ctn.options.showCheckBox) {
          return `<a-table-column type="selection" :width="${
            !ctn.options.showSummary ? 50 : 55
          }"  fixed="left"></a-table-column>`;
        } else {
          return ``;
        }
      })()}


      ${(() => {
        const html = [];
        ctn.options.tableColumns.forEach((item, index) => {
          html.push(`<a-table-column
                      prop="${item.prop}"
                      label="${item.label}"
                      ${emptyAttr(':sortable', item.sortable)}
                      ${!item.fixed ? ':fixed' : 'fixed'}="${!item.fixed ? 'false' : item.fixed}"
                      align="${item.align ? item.align : 'center'}"
                      :formatter="formatterValue"
                      ${emptyAttr('format', item.format)}
                      :show-overflow-tooltip="true"
                      :min-width="${item.width}"
                      >`);

          if (item.formatS === 'render' && !!item.render) {
            html.push(`<template ${vue3Flag ? `#default="scope">` : `slot-scope="scope">`}`);
            html.push(`自定义render`);
            html.push(`</el-table-column>`);
          } else if (!!item.formatS) {
            html.push(`<template ${vue3Flag ? `#default="scope">` : `slot-scope="scope">`}`);
            html.push(
              `<span>{{formatterValue(scope.row, formData.${ctn.id}.tableColumns[${index}], scope.row['${item.prop}'])}}</span>`
            );

            html.push(`</template>`);
          } else {
            html.push(`<template ${vue3Flag ? `#default="scope">` : `slot-scope="scope">`}`);
            html.push(`<span>{{scope.row['${item.prop}']}}</span>`);
            html.push(`</template>`);
          }
          html.push(`</a-table-column>`);
        });

        return html.join('');
      })()}


      ${(() => {
        if (!!ctn.options.showButtonsColumn)
          return `
            <a-table-column fixed="${buttonsColumnFixed()}"
                            class-name="data-table-buttons-column" align="'center'"
                            label="${ctn.options.buttonsColumnTitle}"
                            :width="${ctn.options.buttonsColumnWidth}">
              <template #default="scope">
                  ${(() => {
                    const buttons = [];
                    for (let i = 0; i < ctn.options.operationButtons.length; i++) {
                      const ob = ctn.options.operationButtons[i];
                      if (!ob.hidden) {
                        buttons.push(`<a-button type="${ob.type}" size="${ob.size}" :round="${
                          ob.round
                        }"
                          :disabled="${ob.disabled}"
                          :class="['${'data-table-' + ob.name + '-button'}']">${
                          ob.label
                        }</a-button>`);
                      }
                    }
                    return buttons.join('');
                  })()}
              </template>
            </a-table-column>
        `;
        else {
          return '';
        }
      })()}

			</a-table>

      ${(() => {
        if (!!ctn.options.showPagination)
          return `
              <a-pagination :small="${ctn.options.smallPagination}"
                            ${vue3Flag ? `current-page="1"` : `:current-page="1"`}
                            :page-sizes="[10,20,50,100]"
                            :page-size="10"
                            layout="${paginationLayout()}"
                            :total="${ctn.options.tableData.length}">
              </a-pagination>
         `;
      })()}

    </div>`;
    return tableTemplate;
  }
};

export function buildContainerWidget(widget, formConfig, vue3Flag = false) {
  return containerTemplates[widget.type]
    ? containerTemplates[widget.type](widget, formConfig, vue3Flag)
    : null;
}

function getElAttrs(widget, formConfig, parentWidget) {
  //获取El组件属性
  const wop = widget.options;
  let vModel = '';
  if (!parentWidget) {
    vModel = `v-model="${formConfig.modelName}.${wop.name}"`;
  } else {
    vModel = `v-model="subWidget.${wop.name}"`;
  }

  return {
    vModel,
    readonly: wop.readonly ? `readonly="true"` : '',
    disabled: wop.disabled ? `:disabled="true"` : '',
    size: !!wop.size ? `size="${wop.size}"` : '',
    type: !!wop.type ? `type="${wop.type === 'number' ? 'text' : wop.type}"` : '',
    showPassword: !!wop.showPassword ? `:show-password="${wop.showPassword}"` : '',
    placeholder: !!wop.placeholder ? `placeholder="${wop.placeholder}"` : '',
    rows: isNotNull(wop.rows) && !isNaN(wop.rows) ? `rows="${wop.rows}"` : '',
    allowClear: !!wop.allowClear ? 'allowClear' : '',
    minlength:
      isNotNull(wop.minLength) && !isNaN(wop.minLength) ? `:minlength="${wop.minLength}"` : '',
    maxlength:
      isNotNull(wop.maxLength) && !isNaN(wop.maxLength) ? `:maxlength="${wop.maxLength}"` : '',
    showCount: !!wop.showCount ? `:show-word-limit="true"` : '',
    addonBefore: !!wop.addonBefore ? `prefix-icon="${wop.addonBefore}"` : '',
    addonAfter: !!wop.addonAfter ? `suffix-icon="${wop.addonAfter}"` : '',
    controlsPosition: wop.controlsPosition === 'right' ? `controls-position="right"` : '',
    min: isNotNull(wop.min) && !isNaN(wop.min) ? `:min="${wop.min}"` : '',
    max: isNotNull(wop.max) && !isNaN(wop.max) ? `:max="${wop.max}"` : '',
    precision:
      isNotNull(wop.precision) && !isNaN(wop.precision) ? `:precision="${wop.precision}"` : '',
    step: isNotNull(wop.step) && !isNaN(wop.step) ? `:step="${wop.step}"` : '',
    filterable: !!wop.filterable ? `filterable` : '',
    allowCreate: !!wop.allowCreate ? `allow-create` : '',
    defaultFirstOption: !!wop.filterable && !!wop.allowCreate ? `default-first-option` : '',
    multiple: !!wop.multiple ? `multiple` : '',
    multipleLimit:
      !isNaN(wop.multipleLimit) && wop.multipleLimit > 0
        ? `:multiple-limit="${wop.multipleLimit}"`
        : '',
    automaticDropdown: !!wop.automaticDropdown ? `automatic-dropdown` : '',
    showSearch: !!wop.showSearch ? `showSearch` : '',
    format: !!wop.format ? `format="${wop.format}"` : '',
    valueFormat: !!wop.valueFormat ? `value-format="${wop.valueFormat}"` : '',
    editable: !!wop.editable ? `:editable="${wop.editable}"` : '',
    startPlaceholder: !!wop.startPlaceholder ? `start-placeholder="${wop.startPlaceholder}"` : '',
    endPlaceholder: !!wop.endPlaceholder ? `end-placeholder="${wop.endPlaceholder}"` : '',

    checkedChildren: !!wop.checkedChildren ? `active-text="${wop.checkedChildren}"` : '',
    unCheckedChildren: !!wop.unCheckedChildren ? `inactive-text="${wop.unCheckedChildren}"` : '',
    activeColor: !!wop.activeColor ? `active-color="${wop.activeColor}"` : '',
    inactiveColor: !!wop.inactiveColor ? `inactive-color="${wop.inactiveColor}"` : '',
    switchWidth:
      !isNaN(wop.switchWidth) && wop.switchWidth !== 40 ? `:width="${wop.switchWidth}"` : '',

    rateMax: !isNaN(wop.max) && wop.max !== 5 ? `:max="${wop.max}"` : '',
    lowThreshold:
      !isNaN(wop.lowThreshold) && wop.lowThreshold !== 2
        ? `:low-threshold="${wop.lowThreshold}"`
        : '',
    highThreshold:
      !isNaN(wop.highThreshold) && wop.highThreshold !== 4
        ? `:high-threshold="${wop.highThreshold}"`
        : '',
    allowHalf: !!wop.allowHalf ? `allow-half` : '',
    showText: !!wop.showText ? `show-text` : '',
    showScore: !!wop.showScore ? `show-score` : '',

    sliderMin: !isNaN(wop.min) && wop.min !== 0 ? `:min="${wop.min}"` : '',
    sliderMax: !isNaN(wop.max) && wop.max !== 100 ? `:max="${wop.max}"` : '',
    sliderStep: !isNaN(wop.step) && wop.step !== 1 ? `:step="${wop.step}"` : '',
    sliderRange: !!wop.range ? `range` : '',
    sliderVertical: !!wop.vertical ? `vertical` : '',

    uploadAction: !!wop.uploadURL ? `action="${wop.uploadURL}"` : '',
    withCredentials: !!wop.withCredentials ? `with-credentials` : '',
    multipleSelect: !!wop.multipleSelect ? `multiple` : '',
    showFileList: !!wop.showFileList ? `show-file-list` : '',
    limit: !isNaN(wop.limit) ? `:limit="${wop.limit}"` : '',
    uploadTipSlotChild: !!wop.uploadTip
      ? `<template #tip><div class="el-upload__tip">${wop.uploadTip}</div></template>`
      : '',
    pictureUploadIconChild: `<template #default><i class="el-icon-plus"></i></template>`,
    fileUploadIconChild: `<template #default><i class="el-icon-plus"></i></template>`,

    buttonType: !!wop.type ? `type="${wop.type}"` : '',
    buttonPlain: !!wop.plain ? `plain` : '',
    buttonRound: !!wop.round ? `round` : '',
    buttonCircle: !!wop.circle ? `circle` : '',
    buttonIcon: !!wop.icon ? `icon="${wop.icon}"` : '',

    contentPosition:
      !!wop.contentPosition && wop.contentPosition !== 'center'
        ? `content-position="${wop.contentPosition}"`
        : '',

    appendButtonChild: !!wop.appendButton
      ? `<template #append><a-button class="${wop.buttonIcon}" ${
          !!wop.appendButtonDisabled ? 'disabled' : ''
        }></a-button></template>`
      : ''
  };
}

function buildRadioChildren(widget, formConfig) {
  const wop = widget.options;
  const childTag = !!wop.buttonStyle ? 'el-radio-button' : 'el-radio';
  const borderAttr = !!wop.border ? `border` : '';
  const styleAttr = `style="{display: ${wop.displayStyle}}"`;
  return `<${childTag} v-for="(item, index) in ${wop.name}Options" :key="index" :label="item.value"
          :disabled="item.disabled" ${borderAttr} ${styleAttr}>{{item.label}}</${childTag}>`;
}

function buildCheckboxChildren(widget, formConfig) {
  const wop = widget.options;
  const childTag = !!wop.buttonStyle ? 'el-checkbox-button' : 'el-checkbox';
  const borderAttr = !!wop.border ? `border` : '';
  const styleAttr = `style="{display: ${wop.displayStyle}}"`;
  return `<${childTag} v-for="(item, index) in ${wop.name}Options" :key="index" :label="item.value"
          :disabled="item.disabled" ${borderAttr} ${styleAttr}>{{item.label}}</${childTag}>`;
}

function buildSelectChildren(widget, formConfig) {
  const wop = widget.options;
  const childTag = 'el-option';
  return `<${childTag} v-for="(item, index) in ${wop.name}Options" :key="index" :label="item.label"
          :value="item.value" :disabled="item.disabled"></${childTag}>`;
}

const elTemplates = {
  //字段组件属性
  input: (widget, formConfig, parentWidget) => {
    const {
      vModel,
      readonly,
      disabled,
      size,
      type,
      showPassword,
      placeholder,
      allowClear,
      minlength,
      maxlength,
      showCount,
      addonBefore,
      addonAfter,
      appendButtonChild
    } = getElAttrs(widget, formConfig, parentWidget);
    return `<a-input ${vModel} ${readonly} ${disabled} ${size} ${type} ${showPassword} ${placeholder} ${allowClear}
            ${minlength} ${maxlength} ${showCount} ${addonBefore} ${addonAfter}>${appendButtonChild}</a-input>`;
  },

  textarea: (widget, formConfig, parentWidget) => {
    const {
      vModel,
      readonly,
      disabled,
      size,
      type,
      showPassword,
      placeholder,
      rows,
      allowClear,
      minlength,
      maxlength,
      showCount
    } = getElAttrs(widget, formConfig, parentWidget);
    return `<a-input type="textarea" ${vModel} ${readonly} ${disabled} ${size} ${type} ${showPassword} ${placeholder}
            ${rows} ${allowClear} ${minlength} ${maxlength} ${showCount}></a-input>`;
  },

  number: (widget, formConfig, parentWidget) => {
    const {
      vModel,
      disabled,
      size,
      type,
      showPassword,
      placeholder,
      controlsPosition,
      min,
      max,
      precision,
      step
    } = getElAttrs(widget, formConfig, parentWidget);
    return `<a-input-number ${vModel} class="full-width-input" ${disabled} ${size} ${type} ${showPassword}
            ${placeholder} ${controlsPosition} ${min} ${max} ${precision} ${step}></a-input-number>`;
  },

  radio: (widget, formConfig, parentWidget) => {
    const { vModel, disabled, size } = getElAttrs(widget, formConfig, parentWidget);
    const radioOptions = buildRadioChildren(widget, formConfig);
    return `<a-radio-group ${vModel} ${disabled} ${size}>${radioOptions}</a-radio-group>`;
  },

  checkbox: (widget, formConfig, parentWidget) => {
    const { vModel, disabled, size } = getElAttrs(widget, formConfig, parentWidget);
    const checkboxOptions = buildCheckboxChildren(widget, formConfig);
    return `<a-checkbox-group ${vModel} ${disabled} ${size}>${checkboxOptions}</a-checkbox-group>`;
  },

  select: (widget, formConfig, parentWidget) => {
    const {
      vModel,
      disabled,
      size,
      allowClear,
      filterable,
      allowCreate,
      defaultFirstOption,
      automaticDropdown,
      multiple,
      multipleLimit,
      showSearch,
      placeholder
    } = getElAttrs(widget, formConfig, parentWidget);
    const selectOptions = buildSelectChildren(widget, formConfig);
    return `<a-select ${vModel} class="full-width-input" ${disabled} ${size} ${allowClear} ${filterable}
            ${allowCreate} ${defaultFirstOption} ${automaticDropdown} ${multiple} ${multipleLimit} ${placeholder}
            ${showSearch}>${selectOptions}</a-select>`;
  },

  time: (widget, formConfig, parentWidget) => {
    const { vModel, readonly, disabled, size, placeholder, allowClear, format, editable } =
      getElAttrs(widget, formConfig, parentWidget);
    return `<a-time-picker ${vModel} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
            value-format="HH:mm:ss" ${placeholder} ${allowClear} ${editable}></a-time-picker>`;
  },

  'time-range': (widget, formConfig, parentWidget) => {
    const {
      vModel,
      readonly,
      disabled,
      size,
      startPlaceholder,
      endPlaceholder,
      allowClear,
      format,
      editable
    } = getElAttrs(widget, formConfig, parentWidget);
    return `<a-time-picker is-range ${vModel} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
            value-format="HH:mm:ss" ${startPlaceholder} ${endPlaceholder} ${allowClear} ${editable}></a-time-picker>`;
  },

  date: (widget, formConfig, parentWidget) => {
    const {
      vModel,
      readonly,
      disabled,
      size,
      type,
      placeholder,
      allowClear,
      format,
      valueFormat,
      editable
    } = getElAttrs(widget, formConfig, parentWidget);
    return `<a-date-picker ${vModel} ${type} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
              ${valueFormat} ${placeholder} ${allowClear} ${editable}></a-date-picker>`;
  },

  'date-range': (widget, formConfig, parentWidget) => {
    const {
      vModel,
      readonly,
      disabled,
      size,
      type,
      startPlaceholder,
      endPlaceholder,
      allowClear,
      format,
      valueFormat,
      editable
    } = getElAttrs(widget, formConfig, parentWidget);
    return `<a-date-picker is-range ${vModel} ${type} class="full-width-input" ${readonly} ${disabled} ${size} ${format}
            ${valueFormat} ${startPlaceholder} ${endPlaceholder} ${allowClear} ${editable}></a-date-picker>`;
  },

  switch: (widget, formConfig, parentWidget) => {
    const {
      vModel,
      disabled,
      checkedChildren,
      unCheckedChildren,
      activeColor,
      inactiveColor,
      switchWidth
    } = getElAttrs(widget, formConfig, parentWidget);
    return `<a-switch ${vModel} ${disabled} ${checkedChildren} ${unCheckedChildren} ${activeColor} ${inactiveColor}
            ${switchWidth}></a-switch>`;
  },

  rate: (widget, formConfig, parentWidget) => {
    const {
      vModel,
      disabled,
      rateMax,
      lowThreshold,
      highThreshold,
      allowHalf,
      showText,
      showScore
    } = getElAttrs(widget, formConfig, parentWidget);
    return `<a-rate ${vModel} ${disabled} ${rateMax} ${lowThreshold} ${highThreshold} ${allowHalf}
            ${showText} ${showScore}></a-rate>`;
  },

  color: (widget, formConfig, parentWidget) => {
    const { vModel, disabled, size } = getElAttrs(widget, formConfig, parentWidget);
    return `<a-color-picker ${vModel} ${disabled} ${size}></a-color-picker>`;
  },

  slider: (widget, formConfig, parentWidget) => {
    const { vModel, disabled, sliderMin, sliderMax, sliderStep, sliderRange, sliderVertical } =
      getElAttrs(widget, formConfig, parentWidget);
    return `<a-slider ${vModel} ${disabled} ${sliderMin} ${sliderMax} ${sliderStep} ${sliderRange}
            ${sliderVertical}></a-slider>`;
  },

  'picture-upload': (widget, formConfig, parentWidget) => {
    const {
      vModel,
      disabled,
      uploadAction,
      withCredentials,
      multipleSelect,
      showFileList,
      limit,
      uploadTipSlotChild,
      pictureUploadIconChild
    } = getElAttrs(widget, formConfig, parentWidget);
    const wop = widget.options;
    return `<a-upload :file-list="${wop.name}FileList" :headers="${wop.name}UploadHeaders" :data="${wop.name}UploadData"
            ${disabled} ${uploadAction} list-type="picture-card" ${withCredentials} ${multipleSelect} ${showFileList}
            ${limit}>${uploadTipSlotChild} ${pictureUploadIconChild}</a-upload>`;
  },

  'file-upload': (widget, formConfig, parentWidget) => {
    const {
      vModel,
      disabled,
      uploadAction,
      withCredentials,
      multipleSelect,
      showFileList,
      limit,
      uploadTipSlotChild,
      fileUploadIconChild
    } = getElAttrs(widget, formConfig, parentWidget);
    const wop = widget.options;
    return `<a-upload :file-list="${wop.name}FileList" :headers="${wop.name}UploadHeaders" :data="${wop.name}UploadData"
            ${disabled} ${uploadAction} list-type="picture-card" ${withCredentials} ${multipleSelect} ${showFileList}
            ${limit}>${uploadTipSlotChild} ${fileUploadIconChild}</a-upload>`;
  },

  'rich-editor': (widget, formConfig, parentWidget) => {
    const { vModel, disabled, placeholder } = getElAttrs(widget, formConfig, parentWidget);
    return `<vue-editor ${vModel} ${disabled} ${placeholder}></vue-editor>`;
  },

  cascader: (widget, formConfig, parentWidget) => {
    const { vModel, disabled, size, allowClear, filterable, placeholder } = getElAttrs(
      widget,
      formConfig,
      parentWidget
    );
    const wop = widget.options;
    const optionsAttr = `:options="${wop.name}Options"`;
    return `<a-cascader ${vModel} class="full-width-input" ${optionsAttr} ${disabled} ${size} ${allowClear}
            ${filterable} ${placeholder}></a-cascader>`;
  },

  'static-text': (widget, formConfig) => {
    return `<div>${widget.options.textContent}</div>`;
  },

  'html-text': (widget, formConfig) => {
    return `<div v-html="${widget.options.htmlContent}"></div>`;
  },

  button: (widget, formConfig, parentWidget) => {
    const { buttonType, buttonPlain, buttonRound, buttonCircle, buttonIcon, disabled } = getElAttrs(
      widget,
      formConfig,
      parentWidget
    );
    return `<a-button ${buttonType} ${buttonPlain} ${buttonRound} ${buttonCircle} ${buttonIcon}
            ${disabled}>${widget.options.label}</a-button>`;
  },

  divider: (widget, formConfig, parentWidget) => {
    const { contentPosition } = getElAttrs(widget, formConfig, parentWidget);
    return `<a-divider direction="horizontal" ${contentPosition}></a-divider>`;
  }
};

export function buildFieldWidget(widget, formConfig, parentWidget, vue3Flag = false) {
  const wop = widget.options;
  const label = wop.labelHidden ? '' : wop.label;
  const labelWidthAttr = wop.labelHidden
    ? `label-width="0"`
    : !!wop.labelWidth
    ? `label-width="${wop.labelWidth}px"`
    : '';
  const labelTooltipAttr = wop.labelTooltip ? `title="${wop.labelTooltip}"` : '';
  const propAttr = `prop="${wop.name}"`;

  const classArray = [];
  !!wop.required && classArray.push('required');
  !!wop.customClass && wop.customClass.length > 0 && classArray.push(wop.customClass.join(' '));
  if (!!wop.labelAlign) {
    wop.labelAlign !== 'left' && classArray.push(wop.labelAlign);
  } else if (!!widget.formItemFlag) {
    formConfig.labelAlign !== 'left' && classArray.push(formConfig.labelAlign);
  }
  if (!widget.formItemFlag) {
    classArray.push('static-content-item');
  }
  const classAttr = classArray.length > 0 ? `class="${classArray.join(' ')}"` : '';

  let customLabelDom = `<template #label><span class="custom-label">${
    wop.labelIconPosition === 'front'
      ? !!wop.labelTooltip
        ? `<a-tooltip message="${wop.labelTooltip}" ><i class="${wop.labelIconClass}"></i></a-tooltip>${wop.label}`
        : `<i class="${wop.labelIconClass}"></i>${wop.label}`
      : !!wop.labelTooltip
      ? `${wop.label}<a-tooltip content="${wop.labelTooltip}" ><i class="${wop.labelIconClass}"></i></a-tooltip>`
      : `${wop.label}<i class="${wop.labelIconClass}"></i>`
  }
</span></template>`;
  !wop.labelIconClass && (customLabelDom = '');

  const fwDom = elTemplates[widget.type]
    ? elTemplates[widget.type](widget, formConfig, parentWidget, vue3Flag)
    : null;
  const isFormItem = !!widget.formItemFlag;
  const vShowAttr = !!wop.hidden ? `v-show="false"` : '';
  return isFormItem
    ? `<a-form-item label="${label}" ${labelWidthAttr} ${labelTooltipAttr} ${propAttr} ${classAttr}>
  ${customLabelDom}
  ${fwDom}
</a-form-item>`
    : `<div ${classAttr} ${vShowAttr}>${fwDom}</div>`;
}

export function buildSubFormFieldWidget(widget, formConfig, subformWidget, vue3Flag = false) {
  const wop = widget.options;
  const label = wop.labelHidden ? '' : wop.label;
  const labelWidthAttr = wop.labelHidden
    ? `label-width="0"`
    : !!wop.labelWidth
    ? `label-width="${wop.labelWidth}px"`
    : '';
  const labelTooltipAttr = wop.labelTooltip ? `title="${wop.labelTooltip}"` : '';
  const propAttr = `prop="${wop.name}"`;

  const classArray = [];
  !!wop.required && classArray.push('required');
  !!wop.customClass && wop.customClass.length > 0 && classArray.push(wop.customClass.join(' '));
  if (!!wop.labelAlign) {
    wop.labelAlign !== 'left' && classArray.push(wop.labelAlign);
  } else if (!!widget.formItemFlag) {
    formConfig.labelAlign !== 'left' && classArray.push(formConfig.labelAlign);
  }
  if (!widget.formItemFlag) {
    classArray.push('static-content-item');
  }
  const classAttr = classArray.length > 0 ? `class="${classArray.join(' ')}"` : '';

  let customLabelDom = `<template #label><span class="custom-label">${
    wop.labelIconPosition === 'front'
      ? !!wop.labelTooltip
        ? `<a-tooltip message="${wop.labelTooltip}" ><i class="${wop.labelIconClass}"></i></a-tooltip>${wop.label}`
        : `<i class="${wop.labelIconClass}"></i>${wop.label}`
      : !!wop.labelTooltip
      ? `${wop.label}<a-tooltip message="${wop.labelTooltip}" ><i class="${wop.labelIconClass}"></i></a-tooltip>`
      : `${wop.label}<i class="${wop.labelIconClass}"></i>`
  }
</span></template>`;
  !wop.labelIconClass && (customLabelDom = '');

  const fwDom = elTemplates[widget.type]
    ? elTemplates[widget.type](widget, formConfig, subformWidget)
    : null;
  const isFormItem = !!widget.formItemFlag;
  const vShowAttr = !!wop.hidden ? `v-show="false"` : '';
  return `${customLabelDom} ${fwDom}`;
}

function genTemplate(formConfig, widgetList, vue3Flag = false) {
  const submitAttr = !!vue3Flag ? `@submit.prevent` : `@submit.native.prevent`;
  const childrenList = [];
  widgetList.forEach(wgt => {
    if (wgt.category === 'container') {
      childrenList.push(buildContainerWidget(wgt, formConfig, vue3Flag));
    } else {
      childrenList.push(buildFieldWidget(wgt, formConfig, null, vue3Flag));
    }
  });

  const formTemplate = `  <a-form :model="${formConfig.modelName}" ref="${
    formConfig.refName
  }" :rules="${formConfig.rulesName}"
    label-position="${formConfig.labelPosition}" label-width="${formConfig.labelWidth}px" size="${
    formConfig.size || 'default'
  }"
    ${submitAttr}>
  ${!!childrenList ? childrenList.join('\n') : ''}
</a-form>`;

  return formTemplate;
}

const genGlobalCSS = function (formConfig) {
  const globalCssTemplate = `  .el-input-number.full-width-input, .el-cascader.full-width-input {
    width: 100% !important;
  }

  .el-form-item--medium {
    .el-radio {
      line-height: 36px !important;
    }

    .el-rate{
      margin-top: 8px;
    }
  }

  .el-form-item--small {
    .el-radio {
      line-height: 32px !important;
    }

    .el-rate{
      margin-top: 6px;
    }
  }

  .el-form-item--mini {
    .el-radio {
      line-height: 28px !important;
    }

    .el-rate{
      margin-top: 4px;
    }
  }

  .clear-fix:before, .clear-fix:after {
    display: table;
    content: "";
  }

  .clear-fix:after {
    clear: both;
  }

  .float-right {
    float: right;
  }

${formConfig.cssCode}`;

  return globalCssTemplate;
};

const genScopedCSS = function (formConfig, vue3Flag = false) {
  //const vDeep = !!vue3Flag ? `::v-deep` : `:deep`
  const cssTemplate = `  div.table-container {
    table.table-layout {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;

      td.table-cell {
        display: table-cell;
        height: 36px;
        border: 1px solid #e1e2e3;
      }
    }
  }

  div.tab-container {
  }

  .label-left-align ${
    !!vue3Flag ? `:deep(.el-form-item__label)` : `::v-deep .el-form-item__label`
  } {
    text-align: left;
  }

  .label-center-align ${
    !!vue3Flag ? `:deep(.el-form-item__label)` : `::v-deep .el-form-item__label`
  } {
    text-align: center;
  }

  .label-right-align ${
    !!vue3Flag ? `:deep(.el-form-item__label)` : `::v-deep .el-form-item__label`
  } {
    text-align: right;
  }

  .custom-label {
  }

  .static-content-item {
    min-height: 20px;
    display: flex;
    align-items: center;

    ${!!vue3Flag ? `:deep(.el-divider--horizontal)` : `::v-deep .el-divider--horizontal`} {
      margin: 0;
    }
  }`;

  return cssTemplate;
};

const genSubformScopedCSS = function (formConfig, vue3Flag = false) {
  const cssTemplate = `
  .sub-form-container {
    margin-bottom: 8px;
    text-align: left; //IE浏览器强制居左对齐

    ${vue3Flag ? `:deep(.el-row)` : `::v-deep .el-row`}.header-row {
      padding: 0;
      display: flex;
    }

    ${vue3Flag ? `:deep(.el-form-item)` : `::v-deep .el-form-item`} {
    margin-bottom: 0;
  }
  ${vue3Flag ? `:deep(.el-row)` : `::v-deep .el-row`}.sub-form-row {
      padding: 0;
      display: flex;

      .row-number-span {
        margin-left: 16px;
      }
    }
  }

  div.action-header-column {
    display: inline-block;
    width: 120px;
    border: 1px solid #e1e2e3;
    background: #f1f2f3;
    padding: 8px;

    .action-label {
      margin-right: 12px;
    }

    .action-button {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  div.field-header-column {
    display: inline-block;
    //overflow: hidden;
    //white-space: nowrap;  //文字超出长度不自动换行
    //text-overflow: ellipsis;  //文字超出长度显示省略号
    border: 1px solid #e1e2e3;
    background: #f1f2f3;
    padding: 8px;

    span.custom-label i {
      margin: 0 3px;
    }
  }

  div.field-header-column.is-required:before {
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
  }

  div.label-center-left {
    text-align: left;
  }

  div.label-center-align {
    text-align: center;
  }

  div.label-right-align {
    text-align: right;
  }

  div.sub-form-action-column {
    display: flex;
    align-items: center;
    width: 120px;
    border: 1px solid #e1e2e3;
    padding: 8px;

    ${vue3Flag ? `:deep(.el-form-item)` : `::v-deep .el-form-item`} {
      margin-bottom: 0;
    }

    ${vue3Flag ? `:deep(.el-button)` : `::v-deep .el-button`} {
      font-size: 18px;
      padding: 0;
      background: #DCDFE6;
      border: 4px solid #DCDFE6;
      height:30px;
      width:30px;
    }

  }

  div.sub-form-action-column.hide-label {
    ${vue3Flag ? `:deep(.el-form-item__label)` : `::v-deep .el-form-item__label`} {
      display: none;
    }
  }

  div.sub-form-table-column {
    display: inline-block;
    //width: 200px;
    border: 1px solid #e1e2e3;
    padding: 8px;

    ${vue3Flag ? `:deep(.el-form-item)` : `::v-deep .el-form-item`} {
      margin-left: 4px;
      margin-right: 4px;
      margin-bottom: 0;
    }

    ${vue3Flag ? `:deep(.el-form-item__content)` : `::v-deep .el-form-item__content`} {
      margin-left: 0 !important;
    }
  }

  div.sub-form-table-column.hide-label {
    ${vue3Flag ? `:deep(.el-form-item__label)` : `::v-deep .el-form-item__label`} {
      display: none;
    }
  }
  `;

  return cssTemplate;
};

const genGridSubformScopedCSS = function (formConfig, vue3Flag = false) {
  const cssTemplate = `
  .sub-form-container {
    ${
      vue3Flag
        ? `:deep( div.grid-sub-form.sub-form-row)`
        : `::v-deep  div.grid-sub-form.sub-form-row`
    } {
      display:flex;
      align-items: center;
      border: 1px solid #e1e2e3;
    }
  }

  div.grid-sub-form.action-header-column {
    width: 100%;
  }


  div.grid-sub-form.sub-form-action-column {
    display: inline-block;
    align-items: center;
    justify-content: initial;
    text-align: center;
    border:initial;
    .action-button-column{
      display:flex;
      justify-content:space-between;

      .row-number-span{
        line-height:30px;
      }
    }
  }

  div.grid-sub-form.grid-sub-form-data-row {
    display: inline-block;
    width: 100%;
    border-left: 1px solid #e1e2e3;
    border-right: 1px solid #e1e2e3;
  }
  `;

  return cssTemplate;
};

/**
 * 注册容器组件的代码生成器
 * @param containerType 容器类型，必须唯一
 * @param ctGenerator 代码生成器函数，接收两个参数(containerWidget, formConfig)，返回生成的容器组件代码
 */
export const registerCWGenerator = function (containerType, ctGenerator) {
  containerTemplates[containerType] = ctGenerator;
};

/**
 * 注册字段组件的代码生成器
 * @param fieldType 字段类型，必须唯一
 * @param ftGenerator 代码生成器函数，接收两个参数(fieldWidget, formConfig)，返回生成的字段组件代码
 */
export const registerFWGenerator = function (fieldType, ftGenerator) {
  elTemplates[fieldType] = ftGenerator;
};

export const genSFC = function (formConfig, widgetList, beautifier, vue3Flag = false) {
  const html = beautifier.html(genTemplate(formConfig, widgetList, vue3Flag), beautifierOpts.html);
  const js = beautifier.js(
    !!vue3Flag ? genVue3JS(formConfig, widgetList) : genVue2JS(formConfig, widgetList),
    beautifierOpts.js
  );
  const globalCss = beautifier.css(genGlobalCSS(formConfig), beautifierOpts.css);
  const scopedCss = beautifier.css(genScopedCSS(formConfig, vue3Flag), beautifierOpts.css);

  let scopedSubformCss = '';
  let scopedGridSubformCss = '';
  let widget = widgetList.find(x => x.type === 'sub-form');
  if (widget) {
    scopedSubformCss = beautifier.css(
      genSubformScopedCSS(formConfig, vue3Flag),
      beautifierOpts.css
    );
  }
  widget = widgetList.find(x => x.type === 'grid-sub-form');
  if (widget) {
    scopedSubformCss = beautifier.css(
      genSubformScopedCSS(formConfig, vue3Flag),
      beautifierOpts.css
    );

    scopedGridSubformCss = beautifier.css(
      genGridSubformScopedCSS(formConfig, vue3Flag),
      beautifierOpts.css
    );
  }

  return `<!--
Codes Generated By VForm:
https://www.vform666.com
-->

<template>
${html}
</template>

<script>
${js}
</script>

<style lang="scss">
${globalCss}
</style>

<style lang="scss" scoped>
${scopedCss}
${scopedSubformCss}
${scopedGridSubformCss}
</style>`;
};
