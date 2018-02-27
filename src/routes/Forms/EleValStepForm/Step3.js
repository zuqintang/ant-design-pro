import React from 'react';
import { connect } from 'dva';
import { Alert, Button, Form, Table } from 'antd';
import { routerRedux } from 'dva/router';
import EditableItem from '../../../components/EditableItem';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 24,
  },
};

@Form.create()
class Step3 extends React.PureComponent {
  expandedRowRender = () => {
    const columns = [
      { title: '标识符', dataIndex: 'FIELDCODE_TABLECODE', key: 'FIELDCODE_TABLECODE' },
      { title: '值含义',
        dataIndex: 'FIELDCODE_VALUE',
        key: 'FIELDCODE_VALUE',
        render: value => (
          <EditableItem value={value} />
        ) },
      { title: '中文解释', dataIndex: 'FIELDCODE_VALUE_CN_NAME', key: 'FIELDCODE_VALUE_CN_NAME' },
      { title: '计算值',
        dataIndex: 'FIELD_COMPUTE',
        key: 'FIELD_COMPUTE',
        render: (value, record, index) => (
          <EditableItem
            value={value}
            record={record}
            index={index}
            onChange={handleComputeChange}
          />
        ) },
      { title: '定义描述', dataIndex: 'FIELDCODE_VALUE_DESCRIBE', key: 'FIELDCODE_VALUE_DESCRIBE' },
      // {
      //   title: 'Action',
      //   dataIndex: 'operation',
      //   key: 'operation',
      //   render: () => (
      //     <span className="table-operation">
      //       <a href="#">编辑</a>
      //       <a href="#">调整</a>
      //       {/* <Dropdown overlay={menu}>
      //         <a href="#">
      //           More <Icon type="down" />
      //         </a>
      //       </Dropdown> */}
      //     </span>
      //   ),
      // },
    ];
    const { dispatch, data } = this.props;
    const handleComputeChange = (value, record, index) => {
      const row = record || {};
      row.FIELD_COMPUTE = value;
      data.values[index] = record;
      dispatch({
        type: 'ele2val/saveStepFormData',
        payload: data,
      });
    };
    return (
      <Table
        columns={columns}
        dataSource={data.values}
        pagination
      />
    );
  };
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/element/ele2val-step-form'));
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
    const handleElementNameChange = (value, record, index) => {
      const row = record;
      row.METADATA_NAME = value;
      data.element[index] = row;
      dispatch({ type: 'ele2val/saveStepFormData', payload: data });
    };
    const columns = [
      { title: '数据元名称',
        dataIndex: 'METADATA_NAME',
        key: 'METADATA_NAME',
        render: (value, record, index) => (
          <EditableItem
            value={value}
            record={record}
            index={index}
            onChange={handleElementNameChange}
          />
        ) },
      { title: '数据元编号',
        dataIndex: 'METADATA_IDENTIFY',
        key: 'METADATA_IDENTIFY',
      },
      { title: '数据元描述', dataIndex: 'METADATA_INTRO', key: 'METADATA_INTRO' },
      // { title: 'Action', key: 'operation', render: () => <a href="#">操作</a> },
    ];
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="关系一旦建立，请从数据元详情页进行调整。"
          style={{ marginBottom: 24 }}
        />
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandedRowRender={this.expandedRowRender}
          dataSource={data.element}
          pagination={false}
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
