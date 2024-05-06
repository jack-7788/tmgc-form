<template>
  <div class="tpf-collapse" :style="{ marginBottom: gap }">
    <div class="tpf-collapse-header">
      <a-space :size="5">
        <TpfCollapseTitle :title="title" />
        <SvgIcon
          :icon-class="isCollapse ? collapseIcon : unCollapseIcon"
          size="24px"
          shadow
          cursor
          @click="toggleCollapse"
        />
      </a-space>
      <a-space class="header-right" v-if="isCollapse">
        <a-space :size="5">
          <slot name="right">
            <div class="collapse-right"></div>
          </slot>
        </a-space>
      </a-space>
    </div>
    <Transition
      mode="out-in"
      appear
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <div :class="['tpf-collapse-content']" v-show="isCollapse">
        <!-- <slot></slot> -->
      </div>
    </Transition>
  </div>
</template>

<script setup lang="tsx" name="TpfCollapse">
  import SvgIcon from '@/components/svg-icon/index.vue';

  import { ref } from 'vue';
  import TpfCollapseTitle from './TpfCollapseTitle.vue';

  type Props = {
    title?: string;
    collapseIcon?: string;
    unCollapseIcon?: string;
    gap?: string;
    isHidden?: boolean;
  };

  const props = withDefaults(defineProps<Props>(), {
    collapseIcon: 'xiangshang',
    unCollapseIcon: 'xiangxia',
    title: '这里是标题',
    gap: '0px'
  });

  const isCollapse = ref(!props.isHidden);

  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
  };
</script>

<style lang="less" scoped>
  .tpf-collapse {
    width: 100%;
    background-color: transparent;
    box-sizing: border-box;

    .tpf-collapse-header {
      padding: 10px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      background-color: #f7f8fa;
    }

    .tpf-collapse-content {
      border-radius: 6px;
      overflow: hidden;
      background-color: #fff;
      min-height: 200px;

      :deep(.ant-card-bordered) {
        border-color: transparent;
      }
    }
  }
</style>
