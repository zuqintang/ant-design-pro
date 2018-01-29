import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Modal, message } from 'antd';
import { routerRedux } from 'dva/router';
import ValueStandardTable from '../../../components/ValueStandardTable';
// import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const CreateForm = Form.create()((props) => {
  const { modalVisible, addInputValue, parent, form } = props;
  const okHandle = () => {
    form.validateFields((err/* , fieldsValue */) => {
      if (err) return;
      parent.handleAdd();
    });
  };
  return (
    <Modal
      title="新建值含义"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => parent.handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="描述"
      >
        {form.getFieldDecorator('desc', {
          values: [{ required: true, message: 'Please input some description...' }],
        })(
          <Input placeholder="请输入" onChange={parent.handleAddInput} setfieldsvalue={addInputValue} />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ value, loading }) => ({
  value,
  loading: loading.models.value,
}))
@Form.create()
export default class ValueMeaningTableList extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'value/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'value/fetch',
      payload: params,
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'value/fetch',
      payload: {},
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'value/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'value/fetch',
        payload: values,
      });
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'value/add',
      payload: {
        description: this.state.addInputValue,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="标识符">
              {getFieldDecorator('FIELDCODE_TABLECODE')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="值含义">
              {getFieldDecorator('FIELDCODE_VALUE_CN_NAME')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="标志符">
              {getFieldDecorator('FIELDCODE_TABLECODE')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="值含义">
              {getFieldDecorator('FIELDCODE_VALUE_CN_NAME')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="数据元编号">
              {getFieldDecorator('METADATA_IDENTIFY')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('UPDATE_DATE')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="更新人">
              {getFieldDecorator('UPDATE_MAN')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">张三</Option>
                  <Option value="1">李四</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('DEL_FLAG')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">未启用</Option>
                  <Option value="1">启用</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { value: { data }, loading, dispatch } = this.props;
    const { selectedRows, modalVisible, addInputValue } = this.state;

    const onValidateForm = () => {
      const values = { values: selectedRows };
      // validateFields((err, values) => {
      //   if (!err) {
      dispatch({
        type: 'ele2val/saveStepFormData',
        payload: values,
      });
      dispatch(routerRedux.push('/form/set2ele-step-form/element'));
      //   }
      // });
    };

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleAddInput: this.handleAddInput,
    };

    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建值含义
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button onClick={onValidateForm}>下一步</Button>
                    {/* <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown> */}
                  </span>
                )
              }
            </div>
            <ValueStandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm
          parent={parentMethods}
          modalVisible={modalVisible}
          addInputValue={addInputValue}
        />
      </div>
    );
  }
}
