<template>
  <div>
    <a-form-item label-width="0">
      <a-divider class="custom-divider">{{ i18nt('designer.setting.columnSetting') }}</a-divider>
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.gutter')">
      <a-input-number v-model:value="optionModel.gutter" style="width: 100%" />
    </a-form-item>
    <a-form-item :label="i18nt('designer.setting.colsOfGrid')" />
    <a-form-item label-width="0">
      <li v-for="(colItem, colIdx) in selectedWidget.cols" :key="colIdx" class="col-item">
        <span class="col-span-title">
          {{ i18nt('designer.setting.colSpanTitle') }}{{ colIdx + 1 }}
        </span>
        <a-input-number
          v-model:value="colItem.options.span"
          :min="1"
          :max="24"
          @change="
            (newValue, oldValue) => spanChanged(selectedWidget, colItem, colIdx, newValue, oldValue)
          "
          class="cell-span-input"
        />
        <a-button
          circle
          shape="plain"
          size="small"
          type="danger"
          @click="deleteCol(selectedWidget, colIdx)"
          class="col-delete-button"
        >
          删除
        </a-button>
      </li>
      <div>
        <a-button type="primary" @click="addNewCol(selectedWidget)">
          {{ i18nt('designer.setting.addColumn') }}
        </a-button>
      </div>
    </a-form-item>
  </div>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'gutter-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    methods: {
      spanChanged(curGrid) {
        let spanSum = 0;
        curGrid.cols.forEach(colItem => {
          spanSum += colItem.options.span;
        });
        if (spanSum > 24) {
          //this.$message.info('列栅格之和超出24')
          console.log('列栅格之和超出24', this.$message1);
          //TODO: 语言字符串资源化
        }

        this.designer.saveCurrentHistoryStep();
      },

      deleteCol(curGrid, colIdx) {
        this.designer.deleteColOfGrid(curGrid, colIdx);
        this.designer.emitHistoryChange();
      },

      addNewCol(curGrid) {
        this.designer.addNewColOfGrid(curGrid);
        this.designer.emitHistoryChange();
      }
    }
  };
</script>

<style lang="scss" scoped>
  li.col-item {
    list-style: none;
    margin-bottom: 5px;

    span.col-span-title {
      display: inline-block;
      font-size: 13px;
      width: 120px;
    }

    .col-delete-button {
      margin-left: 6px;
    }
  }
</style>
