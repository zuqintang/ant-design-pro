import { isUrl } from '../utils/utils';

const menuData = [{
  name: 'dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: '分析页',
    path: 'analysis',
  }, {
    name: '监控页',
    path: 'monitor',
  }, {
    name: '工作台',
    path: 'workplace',
    // hideInMenu: true,
  }],
}, {
  name: '表单页',
  icon: 'form',
  path: 'form',
  children: [{
    name: '基础表单',
    path: 'basic-form',
    hideInMenu: true,
  }, {
    name: '分步表单',
    path: 'step-form',
  }, {
    name: '查值赋元',
    path: 'ele-val-step-form',
  }, {
    name: '高级表单',
    authority: 'admin',
    path: 'advanced-form',
    hideInMenu: true,
  }, {
    name: '数据集表单',
    authority: 'admin',
    path: 'set-form',
  }, {
    name: '数据组表单',
    authority: 'admin',
    path: 'group-form',
  }, {
    name: '数据元表单',
    authority: 'admin',
    path: 'element-form',
  }, {
    name: '值域表单',
    authority: 'admin',
    path: 'value-domain-form',
  }, {
    name: '值域允许值表单',
    authority: 'admin',
    path: 'permissible-option-form',
  }, {
    name: '概念域表单',
    authority: 'admin',
    path: 'concept-form',
  }, {
    name: '值含义表单',
    authority: 'admin',
    path: 'value-meaning-form',
  }, {
    name: '数据元概念表单',
    authority: 'admin',
    path: 'element-concept-form',
  }, {
    name: '对象类表单',
    authority: 'admin',
    path: 'object-form',
  }, {
    name: '特性表单',
    authority: 'admin',
    path: 'property-form',
  }, {
    name: '表示类表单',
    authority: 'admin',
    path: 'represent-form',
  }, {
    name: '计量单位表单',
    authority: 'admin',
    path: 'unit-form',
  }],
}, {
  name: '列表页',
  icon: 'table',
  path: 'list',
  children: [{
    name: '查询表格',
    path: 'table-list',
    hideInMenu: true,
  }, {
    name: '标准列表',
    path: 'basic-list',
    hideInMenu: true,
  }, {
    name: '卡片列表',
    path: 'card-list',
    hideInMenu: true,
  }, {
    name: '搜索列表',
    path: 'search',
    children: [{
      name: '搜索列表（文章）',
      path: 'articles',
    }, {
      name: '搜索列表（项目）',
      path: 'projects',
    }, {
      name: '搜索列表（应用）',
      path: 'applications',
    }],
    hideInMenu: true,
  }, {
    name: '数据集表格',
    path: 'set-table-list',
  }, {
    name: '数据组表格',
    path: 'group-table-list',
  }, {
    name: '数据元表格',
    path: 'element-table-list',
  }, {
    name: '值域表格',
    path: 'value-domain-table-list',
  }, {
    name: '值域允许值表格',
    path: 'permissible-option-table-list',
  }, {
    name: '概念域表格',
    path: 'concept-table-list',
  }, {
    name: '值含义表格',
    path: 'value-meaning-table-list',
  }, {
    name: '数据元概念表格',
    path: 'element-concept-table-list',
  }, {
    name: '对象类表格',
    path: 'object-table-list',
  }, {
    name: '特性表格',
    path: 'property-table-list',
  }, {
    name: '表示类表格',
    path: 'represent-table-list',
  }, {
    name: '计量单位表格',
    path: 'unit-table-list',
  }],
}, {
  name: '详情页',
  icon: 'profile',
  path: 'profile',
  children: [{
    name: '基础详情页',
    path: 'basic',
    hideInMenu: true,
  }, {
    name: '高级详情页',
    path: 'advanced',
    authority: 'admin',
    hideInMenu: true,
  }, {
    name: '数据元详情页',
    path: 'element-advanced',
    authority: 'admin',
  }, {
    name: '值含义详情页',
    path: 'value-advanced',
    authority: 'admin',
  }],
}, {
  name: '结果页',
  icon: 'check-circle-o',
  path: 'result',
  children: [{
    name: '成功',
    path: 'success',
  }, {
    name: '失败',
    path: 'fail',
  }],
}, {
  name: '异常页',
  icon: 'warning',
  path: 'exception',
  children: [{
    name: '403',
    path: '403',
  }, {
    name: '404',
    path: '404',
  }, {
    name: '500',
    path: '500',
  }, {
    name: '触发异常',
    path: 'trigger',
    hideInMenu: true,
  }],
}, {
  name: '账户',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}, {
  name: '使用文档',
  icon: 'book',
  path: 'http://pro.ant.design/docs/getting-started',
  target: '_blank',
}];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
