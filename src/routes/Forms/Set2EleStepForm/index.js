import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { Card, Steps } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';
import styles from '../style.less';

const { Step } = Steps;

export default class Set2EleStepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'value': return 0;
      case 'element': return 1;
      case 'confirm': return 2;
      case 'result': return 3;
      default: return 0;
    }
  }
  render() {
    const { match, routerData } = this.props;
    return (
      <PageHeaderLayout title="集/组添加数据元" content="数据元可直接与数据组或数据集进行关联，如列表中查询不到，可点击新增">
        <Card bordered={false}>
          <div>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="选择数据集/组" />
              <Step title="选择数据元" />
              <Step title="确认添加信息" />
              <Step title="完成" />
            </Steps>
            <Switch>
              {
                getRoutes(match.path, routerData).map(item => (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                ))
              }
              <Redirect exact from="/set/set2ele-step-form" to="/set/set2ele-step-form/value" />
              <Route render={NotFound} />
            </Switch>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
