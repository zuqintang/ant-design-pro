import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Button, Card, Radio, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';


const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class ElementConceptForm extends PureComponent {
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
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

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

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="数据元" content="用一组属性规定其定义、标识、表示和允许值的数据单元。">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
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
                >
                  <Option value="1">国标</Option>
                  <Option value="2">企标</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="标识码"
            >
              {getFieldDecorator('ID', {
                rules: [{
                  required: false, message: '不能为空',
                }],
              })(
                <Input placeholder="系统生成" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="名称"
            >
              {getFieldDecorator('DE_NAME', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Input placeholder="系统生成" />
              )}
            </FormItem>
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
            <FormItem
              {...formItemLayout}
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
            <FormItem
              {...formItemLayout}
              label="别名（可选）"
            >
              {getFieldDecorator('OTHER_NAME', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="英文名（可选）"
            >
              {getFieldDecorator('EN_NAME', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="英文定义描述（可选）"
            >
              {getFieldDecorator('EN_DESCRIPTION', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={4} />
              )}
            </FormItem>
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
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
