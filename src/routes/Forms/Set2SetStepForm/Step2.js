import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, InputNumber, DatePicker, Modal, message, Radio } from 'antd';
import { routerRedux } from 'dva/router';
import ElementStandardTable from '../../../components/ElementStandardTable';
// import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const CreateForm = Form.create()((props) => {
  const { modalVisible, addInputValue, parent, form } = props;
  const okHandle = () => {
    form.validateFields((err/* , fieldsValue */) => {
      if (err) return;
      parent.handleAdd();
    });
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };
  const { getFieldDecorator } = form;
  return (
    <Modal
      title="新建数据元"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => parent.handleModalVisible()}
    >
      <FormItem
        {...formItemLayout}
        label="标准"
      >
        {getFieldDecorator('STANDARD', {
          rules: [{
            required: true, message: '不能为空',
          }],
        })(
          <Select
            placeholder="请选择"
            style={{ width: '100%' }}
            onChange={parent.handleAddStandard}
            setfiledsvalue={addInputValue.STANDARD}
          >
            <Option value="1">国标</Option>
            <Option value="2">企标</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="对象类"
      >
        {getFieldDecorator('DATA_OBJECT_ID', {
          rules: [{
            required: true, message: '不能为空',
          }],
        })(
          <Select
            placeholder="请选择"
            style={{ width: '100%' }}
            onChange={parent.handleAddObject}
            setfiledsvalue={addInputValue.DATA_OBJECT_ID}
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="特性"
      >
        {getFieldDecorator('DATA_FEATURE_ID', {
          rules: [{
            required: true, message: '不能为空',
          }],
        })(
          <Select
            placeholder="请选择"
            style={{ width: '100%' }}
            onChange={parent.handleAddFeature}
            setfiledsvalue={addInputValue.DATA_FEATURE_ID}
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="表示"
      >
        {getFieldDecorator('DATA_DISPLAY_ID', {
          rules: [{
            required: true, message: '不能为空',
          }],
        })(
          <Select
            placeholder="请选择"
            style={{ width: '100%' }}
            onChange={parent.handleAddDisplay}
            setfiledsvalue={addInputValue.DATA_DISPLAY_ID}
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="类别"
      >
        {getFieldDecorator('GROUPID', {
          rules: [{
            required: true, message: '不能为空',
          }],
        })(
          <Select
            placeholder="请选择"
            style={{ width: '100%' }}
            onChange={parent.handleAddGroup}
            setfiledsvalue={addInputValue.GROUPID}
          >
            <Option value="1">国标</Option>
            <Option value="2">企标</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="定义描述"
      >
        {getFieldDecorator('METADATA_INTRO', {
          rules: [{
            required: true, message: '请输入',
          }],
        })(
          <TextArea
            style={{ minHeight: 32 }}
            placeholder="请输入"
            rows={4}
            onChange={parent.handleAddIntro}
            setfiledsvalue={addInputValue.METADATA_INTRO}
          />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="数据类型"
      >
        {getFieldDecorator('DATA_META_DATATYPE', {
          rules: [{
            required: true, message: '不能为空',
          }],
        })(
          <Select
            placeholder="请选择"
            style={{ width: '100%' }}
            onChange={parent.handleAdddDatatype}
            setfiledsvalue={addInputValue.DATA_META_DATATYPE}
          >
            <Option value="1">NE</Option>
            <Option value="2">S</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="表示格式"
      >
        {getFieldDecorator('DATA_META_DISPLAY', {
          rules: [{
            required: true, message: '不能为空',
          }],
        })(
          <Select
            placeholder="请选择"
            style={{ width: '100%' }}
            onChange={parent.handleAddDataDisplay}
            setfiledsvalue={addInputValue.DATA_META_DISPLAY}
          >
            <Option value="1">AN..50</Option>
            <Option value="2">AN2000</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="别名（可选）"
      >
        {getFieldDecorator('OTHER_NAME')(
          <Input
            placeholder="请输入"
            onChange={parent.handleAddInput}
            setfiledsvalue={addInputValue.OTHER_NAME}
          />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="英文名（可选）"
      >
        {getFieldDecorator('METADATA_EN_NAME')(
          <Input
            placeholder="请输入"
            onChange={parent.handleAddInput}
            setfiledsvalue={addInputValue.METADATA_EN_NAME}
          />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="英文定义描述（可选）"
      >
        {getFieldDecorator('METADATA_EN_INTRO')(
          <TextArea
            style={{ minHeight: 32 }}
            placeholder="请输入"
            rows={4}
            onChange={parent.handleAddEnIntro}
            setfiledsvalue={addInputValue.METADATA_EN_INTRO}
          />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="是否启用"
      >
        {getFieldDecorator('DEL_FLAG')(
          <Radio.Group
            onChange={parent.handleAddDelFlag}
            setfiledsvalue={addInputValue.DEL_FLAG}
          >
            <Radio value="0">不启用</Radio>
            <Radio value="1">启用</Radio>
          </Radio.Group>
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ element, loading }) => ({
  element,
  loading: loading.models.element,
}))
@Form.create()
export default class ElementTableList extends PureComponent {
  state = {
    addInputValue: {},
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'element/fetch',
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
      type: 'element/fetch',
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
      type: 'element/fetch',
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
          type: 'element/remove',
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
        type: 'element/fetch',
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
      addInputValue: { ...this.state.addInputValue, [e.target.id]: e.target.value },
    });
  }
  handleAddIntro = (e) => {
    this.setState({
      addInputValue: { ...this.state.addInputValue, METADATA_INTRO: e.target.value },
    });
  }
  handleAddEnIntro = (e) => {
    this.setState({
      addInputValue: { ...this.state.addInputValue, METADATA_EN_INTRO: e.target.value },
    });
  }
  handleAddStandard = (value) => {
    this.setState({
      addInputValue: { ...this.state.addInputValue, STANDARD: value },
    });
  }
  handleAddObject = (value) => {
    this.setState({
      addInputValue: { ...this.state.addInputValue, DATA_OBJECT_ID: value },
    });
  }
  handleAddFeature = (value) => {
    this.setState({
      addInputValue: { ...this.state.addInputValue, DATA_FEATURE_ID: value },
    });
  }
  handleAddDisplay = (value) => {
    this.setState({
      addInputValue: { ...this.state.addInputValue, DATA_DISPLAY_ID: value },
    });
  }
  handleAddGroup = (value) => {
    this.setState({
      addInputValue: { ...this.state.addInputValue, GROUPID: value },
    });
  }
  handleAdddDatatype = (value) => {
    this.setState({
      addInputValue: { ...this.state.addInputValue, DATA_META_DATATYPE: value },
    });
  }
  handleAddDataDisplay = (value) => {
    this.setState({
      addInputValue: { ...this.state.addInputValue, DATA_META_DISPLAY: value },
    });
  }
  handleAddDelFlag = (e) => {
    this.setState({
      addInputValue: { ...this.state.addInputValue, DEL_FLAG: e.target.value },
    });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'element/add',
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
            <FormItem label="规则编号">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
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
            <FormItem label="规则编号">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(
                <InputNumber style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
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
    const { element: { data }, dispatch, loading } = this.props;
    const { selectedRows, modalVisible, addInputValue } = this.state;

    const onPrev = () => {
      dispatch(routerRedux.push('/form/ele2val-step-form'));
    };

    const onValidateForm = () => {
      const element = { element: [selectedRows[0]] };
      // validateFields((err, values) => {
      //   if (!err) {
      dispatch({
        type: 'set2set/saveStepFormData',
        payload: element,
      });
      dispatch(routerRedux.push('/form/set2set-step-form/confirm'));
      //   }
      // });
    };

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleAddInput: this.handleAddInput,
      handleAddStandard: this.handleAddStandard,
      handleAddObject: this.handleAddObject,
      handleAddFeature: this.handleAddFeature,
      handleAddDisplay: this.handleAddDisplay,
      handleAddGroup: this.handleAddGroup,
      handleAdddDatatype: this.handleAdddDatatype,
      handleAddDataDisplay: this.handleAddDataDisplay,
      handleAddDelFlag: this.handleAddDelFlag,
      handleAddEnIntro: this.handleAddEnIntro,
      handleAddIntro: this.handleAddIntro,
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
                新建数据元
              </Button>
              <Button icon="return" type="primary" onClick={onPrev}>
                上一步
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button onClick={onValidateForm}>下一步</Button>
                  </span>
                )
              }
            </div>
            <ElementStandardTable
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
