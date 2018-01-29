import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { Card, Steps } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';
import styles from '../style.less';

const { Step } = Steps;

export default class Set2SetStepForm extends PureComponent {
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
      <PageHeaderLayout title="数据集分组" content="实际使用中，数据集由多个数据组组成，每一个数据组内数据元会应用于一套表单模版">
        <Card bordered={false}>
          <div>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="选择待分组数据集" />
              <Step title="新增数据组" />
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
              <Redirect exact from="/form/set2set-step-form" to="/form/set2set-step-form/value" />
              <Route render={NotFound} />
            </Switch>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
