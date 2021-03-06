import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 41; i += 1) {
  tableListDataSource.push({
    key: i,
    ID: i + 1,
    FIELDCODE_VALUE_CN_NAME: `值${i}`,
    FIELDCODE_VALUE_DESCRIBE: `定义描述${i}`,
    STATUS: Math.floor(Math.random() * 10) % 2,
    FIELD_COMPUTE: Math.floor(Math.random() * 10) % 10,
    UPDATE_MAN: '张三',
    UPDATE_DATE: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

export function getValue(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.GROUPID) {
    const GROUPID = params.GROUPID.split(',');
    let filterDataSource = [];
    GROUPID.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.GROUPID, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }
  if (params.STATUS) {
    const STATUS = params.STATUS.split(',');
    let filterDataSource = [];
    STATUS.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.STATUS, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }
  if (params.STANDARD) {
    const STANDARD = params.STANDARD.split(',');
    let filterDataSource = [];
    STANDARD.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.STANDARD, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postValue(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, DATA_DISPLAY_ID,
    DATA_FEATURE_ID,
    DATA_META_DATATYPE,
    DATA_META_DISPLAY,
    DATA_OBJECT_ID,
    DEL_FLAG,
    GROUPID,
    METADATA_EN_INTRO,
    METADATA_EN_NAME,
    METADATA_INTRO,
    OTHER_NAME,
    STANDARD } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource
        .filter(item => GROUPID.indexOf(item.GROUPID) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        DATA_DISPLAY_ID,
        DATA_FEATURE_ID,
        DATA_META_DATATYPE,
        DATA_META_DISPLAY,
        DATA_OBJECT_ID,
        DEL_FLAG,
        GROUPID,
        METADATA_EN_INTRO,
        METADATA_EN_NAME,
        METADATA_INTRO,
        OTHER_NAME,
        STANDARD,
        METADATA_IDENTIFY: `JH19.12.112.${i}`,
        STATUS: 1,
        UPDATE_MAN: '张三',
        UPDATE_DATE: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getValue,
  postValue,
};
