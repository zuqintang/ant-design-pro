import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
      // hideInBreadcrumb: true,
      // name: '工作台',
      // authority: 'admin',
    },
    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
    },
    '/element/ele2val-step-form': {
      component: dynamicWrapper(app, ['ele2val'], () => import('../routes/Forms/EleValStepForm')),
    },
    '/set/set2set-step-form': {
      component: dynamicWrapper(app, ['set2set'], () => import('../routes/Forms/Set2SetStepForm')),
    },
    '/set/set2ele-step-form': {
      component: dynamicWrapper(app, ['set2ele'], () => import('../routes/Forms/Set2EleStepForm')),
    },
    '/basic-form/set-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/SetForm')),
    },
    '/basic-form/group-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/GroupForm')),
    },
    '/basic-form/element-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/ElementForm')),
    },
    '/basic-form/value-domain-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/ValueDomainForm')),
    },
    '/basic-form/permissible-option-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/PermissibleOptionForm')),
    },
    '/basic-form/value-meaning-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/ValueMeaningForm')),
    },
    '/basic-form/concept-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/ConceptForm')),
    },
    '/basic-form/element-concept-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/ElementConceptForm')),
    },
    '/basic-form/object-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/ObjectForm')),
    },
    '/basic-form/property-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/PropertyForm')),
    },
    '/basic-form/represent-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/RepresentForm')),
    },
    '/basic-form/unit-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/UnitForm')),
    },
    '/form/step-form/info': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    },
    '/element/ele2val-step-form/value': {
      component: dynamicWrapper(app, ['ele2val'], () => import('../routes/Forms/EleValStepForm/Step1')),
    },
    '/element/ele2val-step-form/element': {
      component: dynamicWrapper(app, ['ele2val'], () => import('../routes/Forms/EleValStepForm/Step2')),
    },
    '/element/ele2val-step-form/confirm': {
      component: dynamicWrapper(app, ['ele2val'], () => import('../routes/Forms/EleValStepForm/Step3')),
    },
    '/element/ele2val-step-form/result': {
      component: dynamicWrapper(app, ['ele2val'], () => import('../routes/Forms/EleValStepForm/Step4')),
    },
    '/set/set2set-step-form/set': {
      component: dynamicWrapper(app, ['ele2val'], () => import('../routes/Forms/Set2SetStepForm/Step1')),
    },
    '/set/set2set-step-form/group': {
      component: dynamicWrapper(app, ['ele2val'], () => import('../routes/Forms/Set2SetStepForm/Step2')),
    },
    '/set/set2set-step-form/confirm': {
      component: dynamicWrapper(app, ['ele2val'], () => import('../routes/Forms/Set2SetStepForm/Step3')),
    },
    '/set/set2set-step-form/result': {
      component: dynamicWrapper(app, ['ele2val'], () => import('../routes/Forms/Set2SetStepForm/Step4')),
    },
    '/set/set2ele-step-form/value': {
      component: dynamicWrapper(app, ['set2ele'], () => import('../routes/Forms/Set2EleStepForm/Step1')),
    },
    '/set/set2ele-step-form/element': {
      component: dynamicWrapper(app, ['set2ele'], () => import('../routes/Forms/Set2EleStepForm/Step2')),
    },
    '/set/set2ele-step-form/confirm': {
      component: dynamicWrapper(app, ['set2ele'], () => import('../routes/Forms/Set2EleStepForm/Step3')),
    },
    '/set/set2ele-step-form/result': {
      component: dynamicWrapper(app, ['set2ele'], () => import('../routes/Forms/Set2EleStepForm/Step4')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
    },
    '/set/set-table-list': {
      component: dynamicWrapper(app, ['set'], () => import('../routes/List/SetTableList')),
    },
    '/group/group-table-list': {
      component: dynamicWrapper(app, ['group'], () => import('../routes/List/GroupTableList')),
    },
    '/element/element-table-list': {
      component: dynamicWrapper(app, ['element'], () => import('../routes/List/ElementTableList')),
    },
    '/list/value-domain-table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/ValueDomainTableList')),
    },
    '/list/permissible-option-table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/PermissibleOptionTableList')),
    },
    '/list/concept-table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/ConceptTableList')),
    },
    '/element/value-meaning-table-list': {
      component: dynamicWrapper(app, ['value'], () => import('../routes/List/ValueMeaningTableList')),
    },
    '/list/element-concept-table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/ElementConceptTableList')),
    },
    '/basic/object-table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/ObjectTableList')),
    },
    '/basic/property-table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/PropertyTableList')),
    },
    '/basic/represent-table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/RepresentTableList')),
    },
    '/basic/unit-table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/UnitTableList')),
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/AdvancedProfile')),
    },
    '/profile/element-advanced': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/ElementAdvancedProfile')),
    },
    '/profile/set-advanced': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/SetAdvancedProfile')),
    },
    '/profile/group-advanced': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/GroupAdvancedProfile')),
    },
    '/profile/value-advanced': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/ValueAdvancedProfile')),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });
  return routerData;
};
