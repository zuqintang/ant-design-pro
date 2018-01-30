import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    ID: i.toString(),
    NAME: '普外科 - 乳腺癌手术数据集',
    CODE: 'JS0501.01',
    GROUPID: Math.floor(Math.random() * 10) % 4,
    STANDARD: Math.floor(Math.random() * 10) % 2,
    CREATE_MAN: '张三',
    CREATE_DATE: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

export function getGroup(req, res, u) {
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

  if (params.ID) {
    dataSource = dataSource.filter(data => data.ID.indexOf(params.ID) > -1);
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

export function postGroup(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, ID } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource
        .filter(item => ID.indexOf(item.ID) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        ID: i,
        NAME: '普外科 - 乳腺癌手术数据集',
        CODE: 'JS0501.01',
        GROUPID: Math.floor(Math.random() * 10) % 4,
        STANDARD: Math.floor(Math.random() * 10) % 2,
        CREATE_MAN: '张三',
        CREATE_DATE: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
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
  getGroup,
  postGroup,
};
