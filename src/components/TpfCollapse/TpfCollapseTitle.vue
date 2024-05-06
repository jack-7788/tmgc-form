<template>
  <div class="tpf-collapse-title">{{ title }} </div>
</template>

<script setup lang="tsx">
  type Props = {
    title?: string;
  };

  withDefaults(defineProps<Props>(), {
    title: '这里是标题'
  });
</script>

<style lang="less" scoped>
  .tpf-collapse-title {
    color: #1d2129;
    font-size: 16px;
    position: relative;
    padding-left: 12px;
    line-height: 24px;
    font-weight: 500;

    &::before {
      position: absolute;
      left: 0;
      top: 50%;
      content: '';
      height: 20px;
      width: 4px;
      transform: translateY(-50%);
      background-color: var(--ant-primary-color);
    }
  }
</style>
