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
      <PageHeaderLayout title="数据元概念" content="能以一个数据元的形式表示的概念，其表述与任何特定表示法无关。">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
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
              {getFieldDecorator('DEC_NAME', {
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
              label="描述"
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
