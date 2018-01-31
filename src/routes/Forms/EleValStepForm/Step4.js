import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import Result from '../../../components/Result';
import styles from './style.less';

class Step4 extends React.PureComponent {
  render() {
    const { dispatch, data } = this.props;
    const onFinish = () => {
      dispatch(routerRedux.push('/form/ele2val-step-form'));
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col span={8} className={styles.label}>数据元</Col>
          <Col span={16}>{data.element[0].METADATA_NAME}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>允许值个数</Col>
          <Col span={16}>{data.values.length}</Col>
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

export default connect(({ ele2val }) => ({
  data: ele2val.data,
}))(Step4);
