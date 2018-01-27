import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import Result from '../../../components/Result';
import styles from './style.less';

class Step3 extends React.PureComponent {
  render() {
    const { dispatch, data } = this.props;
    const onFinish = () => {
      dispatch(routerRedux.push('/form/ele-val-step-form'));
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col span={8} className={styles.label}>数据元：</Col>
          <Col span={16}>{data.payAccount}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>允许值：</Col>
          <Col span={16}>{data.receiverAccount}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>唯一标识：</Col>
          <Col span={16}>{data.receiverName}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>计算值：</Col>
          <Col span={16}><span className={styles.money}>{data.amount}</span></Col>
        </Row>
      </div>
    );
    const actions = (
      <div>
        <Button type="primary" onClick={onFinish}>
          重新开始
        </Button>
        <Button>
          查看数据元详情
        </Button>
      </div>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description=""
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default connect(({ form }) => ({
  data: form.step,
}))(Step3);
