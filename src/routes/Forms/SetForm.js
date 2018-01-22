import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Select, Button, Card, Cascader,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
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
  value: '案例模版',
  label: '案例模版',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
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
}, {
  value: '其他（回收站）',
  label: '其他（回收站）',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
},
];
@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
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
      <PageHeaderLayout title="数据集详情" content="基本信息">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="标准依据"
            >
              {getFieldDecorator('standard', {
                rules: [{
                  required: true, message: '请选择标准',
                }],
              })(
                <Select placeholder="请选择" >
                  <Option value="1">国标</Option>
                  <Option value="2">企标</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="数据集编码"
            >
              {getFieldDecorator('code', {
                rules: [{
                  required: false, message: '',
                }],
              })(
                <Input placeholder="系统生成" disabled />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所属科别"
            >
              {getFieldDecorator('group', {
                rules: [{
                  required: true, message: '请选择科别',
                }],
              })(
                <Cascader options={options} placeholder="请选择" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="数据集全称"
            >
              {getFieldDecorator('fullname', {
                rules: [{
                  required: true, message: '不能为空',
                }],
              })(
                <Input placeholder="全称" />
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
