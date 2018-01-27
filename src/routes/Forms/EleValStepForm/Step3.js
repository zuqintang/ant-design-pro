import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { List,
  // Card, Row, Col, Radio, Input,
  Alert,
  Progress,
  Button, Form,
  Icon,
  Dropdown,
  Menu,
  Avatar } from 'antd';
import { routerRedux } from 'dva/router';
// import { digitUppercase } from '../../../utils/utils';
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
class Step2 extends React.PureComponent {
  render() {
    const { form, data, dispatch, submitting, loading } = this.props;
    const { validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/form/ele-val-step-form'));
    };
    const onValidateForm = (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };

    // const Info = ({ title, value, bordered }) => (
    //   <div className={styles.headerInfo}>
    //     <span>{title}</span>
    //     <p>{value}</p>
    //     {bordered && <em />}
    //   </div>
    // );

    // const extraContent = (
    //   <div className={styles.extraContent}>
    //     <RadioGroup defaultValue="all">
    //       <RadioButton value="all">全部</RadioButton>
    //       <RadioButton value="progress">进行中</RadioButton>
    //       <RadioButton value="waiting">等待中</RadioButton>
    //     </RadioGroup>
    //     <Search
    //       className={styles.extraContentSearch}
    //       placeholder="请输入"
    //       onSearch={() => ({})}
    //     />
    //   </div>
    // );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>开始时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD hh:mm')}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    );

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="关系一旦建立，请从数据元详情页进行调整。"
          style={{ marginBottom: 24 }}
        />
        <List
          size="large"
          rowKey="id"
          loading={loading}
          pagination={paginationProps}
          dataSource={data}
          renderItem={item => (
            <List.Item
              actions={[<a>编辑</a>, <MoreBtn />]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.logo} shape="square" size="large" />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.subDescription}
              />
              <ListContent data={item} />
            </List.Item>
          )}
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

export default connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))(Step2);
