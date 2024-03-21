import { isArray } from 'lodash-es';

function validateDate(dateStr) {
  const date = new Date(Date.parse(dateStr));
  return date instanceof Date && !isNaN(date.getTime());
}

export function formatDate1(date) {
  if (!validateDate(date)) {
    return date;
  }
  date = new Date(Date.parse(date)); //转换成Date
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

export function formatDate2(date) {
  if (!validateDate(date)) {
    return date;
  }
  date = new Date(Date.parse(date)); //转换成Date
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '/' + m + '/' + d;
}

export function formatDate3(date) {
  if (!validateDate(date)) {
    return date;
  }
  date = new Date(Date.parse(date)); //转换成Date
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '年' + m + '月' + d + '日';
}

export function formatDate4(date) {
  if (!validateDate(date)) {
    return date;
  }
  date = new Date(Date.parse(date)); //转换成Date
  return date.toLocaleString();
}

export function formatDate5(date) {
  if (!validateDate(date)) {
    return date;
  }
  date = new Date(Date.parse(date)); //转换成Date
  return date.toLocaleString('chinese', { hour12: false });
}

// ###,###,###,##0.######
export function formatNumber1(v) {
  if (typeof v !== 'number') {
    return v;
  }

  const length = v.toString().split('.')[1].length;
  switch (length) {
    case 0:
      v = v.toFixed(0);
      break;
    case 1:
      v = v.toFixed(1);
      break;
    case 2:
      v = v.toFixed(2);
      break;
    case 3:
      v = v.toFixed(3);
      break;
    case 4:
      v = v.toFixed(4);
      break;
    case 5:
      v = v.toFixed(5);
      break;
    default:
      v = v.toFixed(6);
  }
  const res = v.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
    });
  });
  return res;
}

//###,###,###,##0.00####
export function formatNumber2(v) {
  if (typeof v !== 'number') {
    return v;
  }

  const length = v.toString().split('.')[1].length;
  switch (length) {
    case 0:
    case 1:
    case 2:
      v = v.toFixed(2);
      break;
    case 3:
      v = v.toFixed(3);
      break;
    case 4:
      v = v.toFixed(4);
      break;
    case 5:
      v = v.toFixed(5);
      break;
    default:
      v = v.toFixed(6);
  }

  const res = v.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
    });
  });
  return res;
}

// ###,###,###,##0.000000
export function formatNumber3(v) {
  if (typeof v !== 'number') {
    return v;
  }

  v = v.toFixed(6);
  const res = v.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
    });
  });
  return res;
}
// ###,###,###,##0.000
export function formatNumber4(v) {
  if (typeof v !== 'number') {
    return v;
  }

  v = v.toFixed(3);
  const res = v.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
    });
  });
  return res;
}

// ###,###,###,##0.00
export function formatNumber5(v) {
  if (typeof v !== 'number') {
    return v;
  }

  v = v.toFixed(2);
  const res = v.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
    });
  });
  return res;
}

// ###,###,###,##0
export function formatNumber6(v) {
  if (typeof v !== 'number') {
    return v;
  }

  v = v.toFixed(0);
  const res = v.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
    });
  });
  return res;
}

// ###,##0.00##%
export function formatNumber7(v) {
  if (typeof v !== 'number') {
    return v;
  }

  const length = v.toString().split('.')[1].length;
  v = v * 100;
  switch (length) {
    case 0:
    case 1:
    case 2:
      v = v.toFixed(2);
      break;
    case 3:
      v = v.toFixed(3);
      break;
    default:
      v = v.toFixed(4);
  }

  const res = v.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ',';
    });
  });
  return res + '%';
}

/**
 * 将Cascader转义为汉字
 * @param codeList string[]
 * @param emblem 拼接符号
 * @returns
 */
export const formateCascaderCode = (
  arr = [],
  codeList,
  fieldNames = { label: 'label', value: 'value', children: 'children' },
  emblem = '/'
) => {
  if (!codeList || codeList.length === 0) return;
  if (isArray(codeList[0])) {
    const res2 = codeList.map(item => getTreeName(arr, item, fieldNames).join(emblem));
    return res2.join(',');
  } else {
    const res = getTreeName(arr, codeList, fieldNames);
    return res.join(emblem);
  }
};

const getTreeName = (
  list = [],
  val = [],
  fieldNames = { label: 'label', value: 'value', children: 'children' }
) => {
  const nameList = [];
  list.forEach(item => {
    if (val.length === 0) return;
    if (item[fieldNames.value] === val[0]) {
      nameList.push(item[fieldNames.label]);
      if (isArray(item[fieldNames.children])) {
        const res = getTreeName(item[fieldNames.children], val.slice(1), fieldNames);
        nameList.push(...res);
      }
    }
  });
  return nameList;
};
/**
 * 将tree转义为汉字
 * @param codeList string[]
 * @param emblem 拼接符号
 * @returns
 */
export const formateTreeToName = (
  arr = [],
  codeList,
  fieldNames = { label: 'label', value: 'value', children: 'children' },
  emblem = ','
) => {
  if (!codeList || codeList.length === 0) return;
  const str = arr.reduce((t, v) => {
    const res = getListName(v, codeList, fieldNames);
    t = [...t, res];
    return t;
  }, []);
  return str.map(item => item[fieldNames.label]).join(emblem);
};

const getListName = (val, list, fieldNames) => {
  let res;
  list.forEach(it1 => {
    if (it1[fieldNames.value] === val) {
      res = it1;
      return;
    }
    const childrenList = it1[fieldNames.children] || [];
    if (childrenList.length) {
      res = getListName(val, childrenList, fieldNames);
    }
  });
  return res;
};
