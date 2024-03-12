import { isEmptyStr, isNull } from './util';

export const getRegExp = function (validatorName) {
  const commonRegExp = {
    number: '/^[-]?\\d+(\\.\\d+)?$/',
    letter: '/^[A-Za-z]+$/',
    letterAndNumber: '/^[A-Za-z0-9]+$/',
    mobilePhone: '/^[1][3-9][0-9]{9}$/',
    letterStartNumberIncluded: '/^[A-Za-z]+[A-Za-z\\d]*$/',
    noChinese: '/^[^\u4e00-\u9fa5]+$/',
    chinese: '/^[\u4e00-\u9fa5]+$/',
    email: '/^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\\.)+[A-Za-z0-9]{2,3}$/',
    url: '/^([hH][tT]{2}[pP]:\\/\\/|[hH][tT]{2}[pP][sS]:\\/\\/)(([A-Za-z0-9-~]+)\\.)+([A-Za-z0-9-~\\/])+$/'
  };

  return commonRegExp[validatorName];
};

const validateFn = function (validatorName, rule, value, defaultErrorMsg) {
  console.log('rule: ', rule);
  try {
    //空值不校验
    if (isNull(value) || value.length <= 0) {
      return Promise.resolve();
    }

    const reg = eval(getRegExp(validatorName));

    if (!reg.test(value)) {
      const errTxt = rule.errorMsg || defaultErrorMsg;
      console.log('errTxt: ', errTxt);
      return Promise.reject(errTxt);
    } else {
      return Promise.resolve();
    }
  } catch (error) {
    return Promise.resolve();
  }
};

const FormValidators = {
  /* 数字 */
  number(rule, value) {
    return validateFn('number', rule, value, '[' + rule.label + ']包含非数字字符');
  },

  /* 字母 */
  letter(rule, value) {
    return validateFn('letter', rule, value, '[' + rule.label + ']包含非字母字符');
  },

  /* 字母和数字 */
  letterAndNumber(rule, value) {
    return validateFn('letterAndNumber', rule, value, '[' + rule.label + ']只能输入字母或数字');
  },

  /* 手机号码 */
  mobilePhone(rule, value) {
    return validateFn('mobilePhone', rule, value, '[' + rule.label + ']手机号码格式有误');
  },

  /* 禁止空白字符开头 */
  noBlankStart(rule, value) {
    //暂未实现
  },

  /* 禁止空白字符结尾 */
  noBlankEnd(rule, value) {
    //暂未实现
  },

  /* 字母开头，仅可包含数字 */
  letterStartNumberIncluded(rule, value) {
    return validateFn(
      'letterStartNumberIncluded',
      rule,
      value,
      '[' + rule.label + ']必须以字母开头，可包含数字'
    );
  },

  /* 禁止中文输入 */
  noChinese(rule, value) {
    return validateFn('noChinese', rule, value, '[' + rule.label + ']不可输入中文字符');
  },

  /* 必须中文输入 */
  chinese(rule, value) {
    return validateFn('chinese', rule, value, '[' + rule.label + ']只能输入中文字符');
  },

  /* 电子邮箱 */
  email(rule, value) {
    return validateFn('email', rule, value, '[' + rule.label + ']邮箱格式有误');
  },

  /* URL网址 */
  url(rule, value) {
    return validateFn('url', rule, value, '[' + rule.label + ']URL格式有误');
  },

  /*测试
  test(rule, value) {
    //空值不校验
    if (isNull(value) || (value.length <= 0)) {
      return Promise.resolve()
    }

    if (value < 100) {
      return Promise.reject('[' + rule.label + ']不能小于100')
    } else {
      return Promise.resolve()
    }
  },
  */

  regExp(rule, value) {
    //空值不校验
    if (isNull(value) || value.length <= 0) {
      return Promise.resolve();
    }

    const pattern = eval(rule.regExp);
    if (!pattern.test(value)) {
      const errTxt = rule.errorMsg || '[' + rule.label + ']invalid value';
      return Promise.reject(errTxt);
    } else {
      return Promise.resolve();
    }
  }
};

export default FormValidators;
