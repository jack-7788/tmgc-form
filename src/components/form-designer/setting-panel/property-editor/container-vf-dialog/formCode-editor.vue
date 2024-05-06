<template>
  <a-form-item :label="`关联表单`">
    <a-select
      v-model:value="optionModel.formCode"
      allowClear
      :options="ops"
      :fieldNames="{ label: 'formCode', value: 'formCode' }"
    />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import http from '@/utils/http';

  export default {
    name: 'formCode-editor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        ops: []
      };
    },
    created() {
      this.getOps();
    },
    methods: {
      async getOps() {
        const p = {
          pageCode: 'FormDefinitionManagement',
          conditions: [],
          requiredFields: [
            'formCode',
            'terminalTypeName',
            'entityCode',
            'createDatetime',
            'createUserName',
            'modifyDatetime',
            'modifyUserName'
          ],
          page: 1,
          pageSize: null,
          sorts: []
        };
        this.ops = await http
          .post('/api/tmgc2-query/dataQuery/execute', p)
          .then(res => res.data.object.list || [])
          .then(list => list.map(item => ({ formCode: item.formCode })));
      }
    }
  };
</script>
