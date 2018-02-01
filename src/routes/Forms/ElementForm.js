import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Button, Card, Radio, Select, Row, Col, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import * as cde from '../../utils/cde';


const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ element, loading }) => ({
  element,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class ElementConceptForm extends PureComponent {
  state={ row: {} }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }
  handleAddID = (value) => {
    this.setState({
      row: { ...this.state.row, ID: value },
    });
  }
  render() {
    const { element: { data }, submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    let row = { STANDARD: '' };
    if (data.key && data.list && data.key < data.list.length) { row = data.list[data.key]; }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        md: { span: 18 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 12 },
      },
    };

    return (
      <PageHeaderLayout title="数据元" content="用一组属性规定其定义、标识、表示和允许值的数据单元。">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            layout="horizontal"
          >
            <FormItem {...submitFormLayout} style={{ textAlign: 'right', marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>返回</Button>
            </FormItem>
            <Divider style={{ marginTop: 0, color: '#000' }} />
            <Row gutter={24}>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="标准"
                >
                  {getFieldDecorator('row.STANDARD', {
                rules: [{
                  required: true, message: '不能为空',
                }],
                initialValue: cde.getStandardName(row.STANDARD),
              })(
                <Select
                  placeholder="请选择"
                  setfieldsvalue={row.STANDARD}
                >
                  <Option value="0">国标</Option>
                  <Option value="1">企标</Option>
                </Select>
              )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="标识码"
                >
                  {getFieldDecorator('METADATA_IDENTIFY', {
                rules: [{
                  required: false, message: '不能为空',
                }],
                initialValue: row.METADATA_IDENTIFY,
              })(
                <Input placeholder="系统生成" onChange={this.handleAddID} setfieldsvalue={row.METADATA_IDENTIFY} />
              )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="名称"
                >
                  {getFieldDecorator('METADATA_NAME', {
                rules: [{
                  required: true, message: '不能为空',
                }],
                initialValue: row.METADATA_NAME,
              })(
                <Input placeholder="系统生成" setfieldsvalue={row.METADATA_NAME} />
              )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="对象类"
                >
                  {getFieldDecorator('OBJECT_NAME', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Select
                  placeholder="请选择"
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              )}
                </FormItem>
              </Col>
              <Col span={8}>

                <FormItem
                  {...formItemLayout}
                  label="特性"
                >
                  {getFieldDecorator('PROPERTY_NAME', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Select
                  placeholder="请选择"
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="表示"
                >
                  {getFieldDecorator('REPRESENT_NAME', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Select
                  placeholder="请选择"
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="类别"
                >
                  {getFieldDecorator('GROUP', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Select
                  placeholder="请选择"
                >
                  <Option value="1">国标</Option>
                  <Option value="2">企标</Option>
                </Select>
              )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="编号"
                >
                  {getFieldDecorator('DE_CODE', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Input placeholder="系统生成" />
              )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <FormItem
                  label="定义描述"
                >
                  {getFieldDecorator('DEC_DESCRIPTION', {
                rules: [{
                  required: true, message: '请输入',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={4} />
              )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="数据类型"
                >
                  {getFieldDecorator('DATA_TYPE', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Select
                  placeholder="请选择"
                >
                  <Option value="1">NE</Option>
                  <Option value="2">S</Option>
                </Select>
              )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="表示格式"
                >
                  {getFieldDecorator('DISPLAY_TYPE', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Select
                  placeholder="请选择"
                >
                  <Option value="1">AN..50</Option>
                  <Option value="2">AN2000</Option>
                </Select>
              )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="别名"
                >
                  {getFieldDecorator('OTHER_NAME', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Input placeholder="请输入" />
              )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="英文名"
                >
                  {getFieldDecorator('EN_NAME', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Input placeholder="请输入" />
              )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="来源"
                >
                  {getFieldDecorator('DEC_FROM', {
                rules: [{
                  required: false, message: '不能为空',
                }],
              })(
                <Input placeholder="系统生成" />
              )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem
                  label="英文定义描述"
                >
                  {getFieldDecorator('EN_DESCRIPTION', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={4} />
              )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="创建人"
                >
                  {getFieldDecorator('CREATEMAN', {
                rules: [{
                  required: false, message: '不能为空',
                }],
              })(
                <Input placeholder="系统生成" />
              )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="创建日期"
                >
                  {getFieldDecorator('CREATE_DATE', {
                rules: [{
                  required: false, message: '不能为空',
                }],
              })(
                <Input placeholder="系统生成" />
              )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label="是否启用"
                >
                  {getFieldDecorator('DEL_FLAG', {
                rules: [{
                  required: false, message: '不能为空',
                }],
              })(
                <Radio.Group>
                  <Radio value="0">不启用</Radio>
                  <Radio value="1">启用</Radio>
                </Radio.Group>
              )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
