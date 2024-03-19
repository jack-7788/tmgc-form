<template>
  <a-form-item label="启用左侧勾选设置">
    <a-switch v-model:checked="optionModel.rowSelection.hasRowSelection" />
  </a-form-item>
  <a-form-item label="左侧勾选设置" v-if="optionModel.rowSelection.hasRowSelection">
    <a-button type="primary" plain shape="round" @click="editSelections">编辑</a-button>
  </a-form-item>
  <a-drawer
    class="editor-Selection-drawer"
    v-model:visible="visible"
    title="左侧勾选设置"
    placement="right"
  >
    <a-form class="editor-Selection-form" :model="optionModel.rowSelection" layout="horizontal">
      <a-form-item label="固定在左边">
        <a-switch v-model:checked="optionModel.rowSelection.fixed" />
      </a-form-item>
      <a-form-item label="当数据被删除时仍然保留选项的 key">
        <a-switch v-model:checked="optionModel.rowSelection.preserveSelectedRowKeys" />
      </a-form-item>
      <a-form-item label="自定义列表选择框宽度">
        <a-input-number :min="20" :max="200" v-model:value="optionModel.rowSelection.columnWidth" />
      </a-form-item>
      <a-form-item label="自定义列表选择框标题">
        <a-input v-model:value="optionModel.rowSelection.columnTitle" />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script>
  export default {
    name: 'rowSelection-editor',
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        visible: false
      };
    },
    methods: {
      editSelections() {
        console.log(1212);
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
