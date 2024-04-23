<template>
  <a-form-item :label="`菜单弹出位置`">
    <a-select v-model:value="optionModel.placement" allowClear :options="placementList" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';

  export default {
    name: 'placement-editor',
    componentName: 'PropertyEditor',
    mixins: [i18n],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        placementList: [
          { value: 'bottomLeft', label: '下左 ' },
          { value: 'bottom', label: '下中' },
          { value: 'bottomRight', label: '下右' },
          { value: 'topLeft', label: '上左' },
          { value: 'top', label: '上中' },
          { value: 'topRight', label: '上右' }
        ]
      };
    },
    created() {}
  };
</script>

<style scoped></style>
