import SvgIcon from '@/components/svg-icon';
import { Modal } from 'ant-design-vue';

export const TpfConfirm = ops => {
  const option = typeof ops === 'string' ? {} : ops;
  const { type = 'confirm' } = option;
  return new Promise((resolve, reject) => {
    Modal[type]({
      class: 'tpf-model-confirm',
      centered: true,
      icon: (
        <span class="anticon anticon-exclamation-circle">
          <SvgIcon iconClass="el-error-circle" />
        </span>
      ),
      title: '确认删除',
      okText: '确定',
      cancelText: '取消',
      closable: false,
      onOk() {
        resolve('confirm');
      },
      onCancel: () => {
        reject('cancel');
      },
      ...option
    });
  });
};
