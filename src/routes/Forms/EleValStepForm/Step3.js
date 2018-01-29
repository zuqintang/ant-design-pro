import React from 'react';
import { connect } from 'dva';
import { List, Alert, Button, Form } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
class Step3 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/form/ele2val-step-form'));
    };
    const onValidateForm = (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'ele2val/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="关系一旦建立，请从数据元详情页进行调整。"
          style={{ marginBottom: 24 }}
        />
        <List
          size="small"
          header={data.element.METADATA_NAME}
          footer={data.values.length}
          dataSource={data.values}
          renderItem={item =>
            (
              <List.Item.Meta
                title={item.FIELDCODE_VALUE_CN_NAME}
                description={item.FIELDCODE_VALUE_DESCRIBE}
              />)}
        />
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ ele2val, loading }) => ({
  submitting: loading.effects['ele2val/submitStepForm'],
  data: ele2val.data,
}))(Step3);
