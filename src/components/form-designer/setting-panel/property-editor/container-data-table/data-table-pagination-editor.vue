<template>
  <a-form-item :label="i18nt('designer.setting.showPagination')">
    <a-space>
      <a-switch v-model:checked="optionModel.showPagination" />
      <a-button
        v-if="optionModel.showPagination"
        type="primary"
        shape="round"
        size="small"
        @click="editPagination"
      >
        编辑
      </a-button>
    </a-space>
  </a-form-item>

  <a-drawer
    class="editor-Selection-drawer"
    v-model:visible="visible"
    title="分页配置"
    placement="right"
  >
    <a-form class="editor-Selection-form" :model="optionModel.pagination" layout="horizontal">
      <a-form-item label="默认的每页条数">
        <a-select v-model:value="optionModel.pagination.pageSize" @change="pageSizeOptionsChange">
          <a-select-option v-for="item in pageSizeList" :key="item" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="指定每页可以显示多少条">
        <a-select
          mode="tags"
          v-model:value="optionModel.pagination.pageSizeOptions"
          @change="pageSizeOptionsChange"
        >
          <a-select-option v-for="item in pageSizeOptionsList" :key="item" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="只有一页时是否隐藏分页器">
        <a-switch v-model:checked="optionModel.pagination.hideOnSinglePage" />
      </a-form-item>
      <a-form-item label="是否可以快速跳转至某页">
        <a-switch v-model:checked="optionModel.pagination.showQuickJumper" />
      </a-form-item>
      <a-form-item label="是否展示 pageSize 切换器">
        <a-switch v-model:checked="optionModel.pagination.showSizeChanger" />
      </a-form-item>
      <a-form-item label="分页器位置">
        <a-select v-model:value="selectPosition" :options="positionList" />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'pagination-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        visible: false,
        pageSizeOptionsList: ['10', '20', '50', '100'],
        positionList: [
          { value: 'topLeft ', label: 'topLeft ' },
          { value: 'topCenter', label: 'topCenter' },
          { value: 'topRight', label: 'topRight' },
          { value: 'bottomLeft', label: 'bottomLeft' },
          { value: 'bottomCenter', label: 'bottomCenter' },
          { value: 'bottomRight', label: 'bottomRight' }
        ]
      };
    },
    computed: {
      pageSizeList() {
        const pageSizeOptions = this.optionModel.pagination.pageSizeOptions.map(item =>
          Number(item)
        );
        if (pageSizeOptions.length === 0) {
          return [];
        }
        return pageSizeOptions.sort((a, b) => a - b);
      },
      selectPosition: {
        get() {
          return this.optionModel.pagination.position[0];
        },
        set(value) {
          this.optionModel.pagination.position[0] = value;
        }
      }
    },
    methods: {
      pageSizeOptionsChange() {
        this.optionModel.pagination.pageSize = this.pageSizeList[0] || 20;
      },
      editPagination() {
        this.visible = true;
      }
    }
  };
</script>

<style lang="scss">
  .editor-Selection-drawer {
    .ant-drawer-body {
      padding: 10px;
    }

    .editor-Selection-form {
      .ant-form-item {
        margin-bottom: 12px;
      }
    }
  }
</style>
