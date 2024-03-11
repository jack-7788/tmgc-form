<template>
  <a-form-item label="列表主键(唯一性)">
    <a-input v-model:value.trim="optionModel.rowKey" />
  </a-form-item>
</template>

<script>
  export default {
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>
