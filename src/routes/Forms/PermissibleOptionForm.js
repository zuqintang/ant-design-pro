import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Button, Card, Radio,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class PermissibleOptionForm extends PureComponent {
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
      <PageHeaderLayout title="允许值" content="在一个特定值域中允许的一个值含义的表达。">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="标识"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: false, message: '',
                }],
              })(
                <Input placeholder="系统生成" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="允许值"
            >
              {getFieldDecorator('VALUE', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="中文含义"
            >
              {getFieldDecorator('CN_NAME', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="英文含义（可选）"
            >
              {getFieldDecorator('EN_NAME', {
                rules: [{
                  required: false, message: '',
                }],
              })(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="定义描述"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: false, message: '',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="计算值"
            >
              {getFieldDecorator('COMPUTE', {
                rules: [{
                  required: true, message: '',
                }],
              })(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="排序码"
            >
              {getFieldDecorator('ORDER', {
                rules: [{
                  required: true, message: '',
                }],
              })(
                <Input placeholder="请输入" />
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
