import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Cascader, DatePicker, Modal, message } from 'antd';
import SetStandardTable from '../../../components/SetStandardTable';
// import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const options = [{
  value: '30',
  label: '全部医院',
  children: [{
    value: '74',
    label: '中日友好医院',
    children: [{
      value: '75',
      label: '肺栓塞入院记录',
    }],
  }, {
    value: '47',
    label: '北京妇产医院',
    children: [{
      value: '48',
      label: '宫颈癌',
    }, { value: '86', label: '309' }],
  }],
}, {
  value: '通用型',
  label: '通用型',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}, {
  value: '专用型',
  label: '专用型',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];
const CreateForm = Form.create()((props) => {
  const { modalVisible, addInputValue, parent, form } = props;
  const okHandle = () => {
    form.validateFields((err/* , fieldsValue */) => {
      if (err) return;
      parent.handleAdd();
    });
  };
  function displayRender(label) {
    return label[label.length - 1];
  }
  return (
    <Modal
      title="新建数据集"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => parent.handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="标准依据"
      >
        {form.getFieldDecorator('STANDARD', {
          sets: [{
            required: true, message: '请选择标准',
          }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }} onChange={parent.handleAddStandard} setfieldsvalue={addInputValue.STANDARD}>
            <Option value="1">国标</Option>
            <Option value="2">企标</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="数据集编码"
      >
        {form.getFieldDecorator('CODE', {
          set: [{
            required: false, message: '',
          }],
        })(
          <Input placeholder="系统生成" onChange={parent.handleAddInput} setfieldsvalue={addInputValue.CODE} />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="所属科别"
      >
        {form.getFieldDecorator('GROUPID', {
          sets: [{
            required: true, message: '请选择科别',
          }],
        })(
          <Cascader options={options} placeholder="请选择" style={{ width: '100%' }} onChange={parent.handleAddGroup} setfieldsvalue={addInputValue.GROUPID} expandTrigger="hover" displayRender={displayRender} />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="数据集名称"
      >
        {form.getFieldDecorator('NAME', {
          sets: [{
            required: true, message: '不能为空',
          }],
        })(
          <Input placeholder="请输入" onChange={parent.handleAddInput} setfieldsvalue={addInputValue.NAME} />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ set, loading }) => ({
  set,
  loading: loading.models.set,
}))
@Form.create()
export default class GroupTableList extends PureComponent {
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
      type: 'set/fetch',
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
      type: 'set/fetch',
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
      type: 'set/fetch',
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
          type: 'set/remove',
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
        type: 'set/fetch',
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
      addInputValue: { ...this.state.addInputValue, [e.target.name]: e.target.value },
    });
  }

  handleAddGroup = (value) => {
    this.setState({
      addInputValue: { ...this.state.addInputValue, GROUPID: value[value.length - 1] },
    });
  }

  handleAddStandard = (value) => {
    this.setState({
      addInputValue: { ...this.state.addInputValue, STANDARD: value },
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'set/add',
      payload: this.state.addInputValue,
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
            <FormItem label="数据集名称">
              {getFieldDecorator('NAME')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="数据集编码">
              {getFieldDecorator('CODE')(
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
            <FormItem label="数据集名称">
              {getFieldDecorator('NAME')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="数据集编码">
              {getFieldDecorator('CODE')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="科别">
              {getFieldDecorator('GROUPID')(
                <Cascader options={options} placeholder="请选择" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="创建日期">
              {getFieldDecorator('CREATE_DATE')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="创建人">
              {getFieldDecorator('CREATE_MAN')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('DEL_FLAG')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">启用</Option>
                  <Option value="2">停用</Option>
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
    const { set: { data }, loading } = this.props;
    const { selectedRows, modalVisible, addInputValue } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleAddInput: this.handleAddInput,
      handleAddGroup: this.handleAddGroup,
      handleAddStandard: this.handleAddStandard,
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
                新建
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>
            <SetStandardTable
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
