import { isUrl } from '../utils/utils';

const menuData = [{
  name: '首页',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: '分析页',
    path: 'analysis',
    hideInMenu: true,
  }, {
    name: '监控页',
    path: 'monitor',
    hideInMenu: true,
  }, {
    name: '工作台',
    path: 'workplace',
    hideInMenu: true,
  }],
}, {
  name: '数据集',
  icon: 'form',
  path: 'set',
  children: [{
    name: '集列表',
    path: 'set-table-list',
  }, {
    name: '集分组',
    path: 'set2set-step-form',
  }, {
    name: '集生元',
    path: 'set2ele-step-form',
  }],
}, {
  name: '数据组',
  icon: 'form',
  path: 'group',
  children: [{
    name: '组列表',
    path: 'group-table-list',
  }],
}, {
  name: '数据元',
  icon: 'form',
  path: 'element',
  children: [{
    name: '元列表',
    path: 'element-table-list',
  }, {
    name: '值列表',
    path: 'value-meaning-table-list',
  }, {
    name: '查值赋元',
    path: 'ele2val-step-form',
  }],
}, {
  name: '概念归纳',
  icon: 'form',
  path: 'concept',
  children: [{
    name: '值域与允许值',
    path: 'value-domain-table-list',
  }, {
    name: '概念域与值定义',
    path: 'concept-table-list',
  }, {
    name: '数据元概念',
    path: 'element-concept-table-list',
  }],
}, {
  name: '基础信息',
  icon: 'form',
  path: 'basic',
  children: [{
    name: '对象类表格',
    path: 'object-table-list',
    authority: 'admin',
  }, {
    name: '特性表格',
    path: 'property-table-list',
    authority: 'admin',
  }, {
    name: '表示类表格',
    path: 'represent-table-list',
    authority: 'admin',
  }, {
    name: '计量单位表格',
    path: 'unit-table-list',
    authority: 'admin',
  }],
}, {
  name: '分步表单',
  path: 'step-form',
  hideInMenu: true,
  children: [{
    name: '查值赋元',
    path: 'ele2val-step-form',
  }, {
    name: '集分组',
    path: 'set2set-step-form',
  }, {
    name: '集/组生元',
    path: 'set2ele-step-form',
  }],
}, {
  name: '表单页',
  icon: 'form',
  path: 'form',
  hideInMenu: true,
  children: [{


  }, {
    name: '高级表单',
    path: 'advanced-form',
    hideInMenu: true,
  }],
}, {
  name: '列表页',
  hideInMenu: true,
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
    // authority: 'admin',
  }, {
    name: '数据元表格',
    path: 'element-table-list',
  }, {
    name: '值域表格',
    path: 'value-domain-table-list',
    authority: 'admin',
    hideInMenu: true,
  }, {
    name: '值域允许值表格',
    path: 'permissible-option-table-list',
    authority: 'admin',
    hideInMenu: true,
  }, {
    name: '概念域表格',
    path: 'concept-table-list',
    authority: 'admin',
    hideInMenu: true,
  }, {
    name: '值含义表格',
    path: 'value-meaning-table-list',
  }, {
    name: '数据元概念表格',
    path: 'element-concept-table-list',
    authority: 'admin',
    hideInMenu: true,
  }, {
    name: '对象类表格',
    path: 'object-table-list',
    authority: 'admin',
  }, {
    name: '特性表格',
    path: 'property-table-list',
    authority: 'admin',
  }, {
    name: '表示类表格',
    path: 'represent-table-list',
    authority: 'admin',
  }, {
    name: '计量单位表格',
    path: 'unit-table-list',
    authority: 'admin',
  }],
}, {
  name: '详情页',
  hideInMenu: true,
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
  }, {
    name: '数据集详情页',
    path: 'set-advanced',
  }, {
    name: '数据组详情页',
    path: 'group-advanced',
  }, {
    name: '值含义详情页',
    path: 'value-advanced',
    hideInMenu: true,
  }],
}, {
  name: '结果页',
  icon: 'check-circle-o',
  path: 'result',
  hideInMenu: true,
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
  hideInMenu: true,
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
  hideInMenu: true,
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
