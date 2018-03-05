import React, { Component } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Row, Col, Card, Badge, Table, Divider, Tag, Steps, Popover } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './AdvancedProfile.less';

const m = {
  CREATE_DATE: '2015-12-10 17:05:50',
  CREATE_MAN: '王亚芬',
  DATAMETA_FROM: 'EPM',
  DATA_DISPLAY: '代码',
  DATA_DISPLAY_ID: 22,
  DATA_FEATURE_ID: 8714,
  DATA_FEATURE_NAME: '病因',
  DATA_META_DATATYPE: 'S3',
  DATA_META_DISPLAY: 'AN',
  DATA_META_PREFIX: 'JH',
  DATA_OBJECT_ID: 3854,
  DATA_OBJECT_NAME: '脑出血',
  DEL_FLAG: 0,
  FIELDCODE_TABLECODE: 'JV000952',
  ID: 13039,
  INPUT_CODE: 'NCXBYDM',
  MAST_FLAG: 0,
  METADATAFIELD_NAME: '脑出血病因',
  METADATA_IDENTIFY: 'JH10.00.034.41',
  METADATA_INNER_IDENTIFY: 'JH10.00.034.41',
  METADATA_NAME: '脑出血 病因 代码',
  METAID: 23091,
  METAITEM: '脑出血 病因 代码',
  PID: 0,
  STANDARD: 1,
  STATUS: 0,
  VERSION: 1,
  VERSION_DATE: 1449738350000,
  WUBI_CODE: 'EBT UL WD',
};

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

const menu = (
  <Menu>
    <Menu.Item key="1">关联数据元概念</Menu.Item>
    <Menu.Item key="2">提升为数据元概念</Menu.Item>
    <Menu.Item key="3">留言</Menu.Item>
  </Menu>
);

const action = (
  <div>
    <ButtonGroup>
      <Button>修改</Button>
      <Button>添加值</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button><Icon type="ellipsis" /></Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">审批</Button>
  </div>
);

const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>已审批</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>标准</div>
      <div className={styles.heading}>企标</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2" style={{ position: 'relative', top: '-20px' }}>
    <div style={{ paddingBottom: '12px' }}>
      <Tag color="magenta" style={{ marginRight: '0px' }}>{m.STANDARD === 0 ? '国标' : '企标'}</Tag>
      <Tag color="red" style={{ marginRight: '0px' }}>{m.DATA_OBJECT_NAME}</Tag>
      <Tag color="volcano" style={{ marginRight: '0px' }}>{m.DATA_DISPLAY}</Tag>
      <Tag color="orange" style={{ marginRight: '0px' }}>{m.DATA_FEATURE_NAME}</Tag>
      <Tag color="gold" style={{ marginRight: '0px' }}>已审核</Tag>
      <Tag color="lime" style={{ marginRight: '0px' }}>有值域</Tag>
      <Tag color="green" style={{ marginRight: '0px' }}>已被使用</Tag>
    </div>
    <Description term="创建人">{m.CREATE_MAN}</Description>
    {/* <Description term="所属数据集">DS12.12.121</Description> */}
    <Description term="创建时间">{m.CREATE_DATE}</Description>
    {/* <Description term="科别">北医三院</Description>
    <Description term="备注">啊啊啊</Description> */}
  </DescriptionList>
);


const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <div>
      曲丽丽
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <div>
      周毛毛
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>耗时：2小时25分钟</div>
  </div>
);

const customDot = (dot, { status }) => (status === 'process' ? (
  <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
    {dot}
  </Popover>
) : dot);

const operationTabList = [{
  key: 'tab1',
  tab: '允许值列表',
}, {
  key: 'tab2',
  tab: '被使用表单',
}, {
  key: 'tab3',
  tab: '所属概念',
}];

const valueColumns = [{
  title: '标识码',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '值含义',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '计算值',
  dataIndex: 'status',
  key: 'status',
  render: text => (
    text === 'agree' ? <Badge status="success" text={text} /> : <Badge status="error" text={text} />
  ),
}, {
  title: '定义描述',
  dataIndex: 'updatedAt',
  key: 'updatedAt',
}, {
  title: '备注',
  dataIndex: 'memo',
  key: 'memo',
}];
const templateColumns = [{
  title: '模版编号',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '模版名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '元素编号',
  dataIndex: 'status',
  key: 'status',
  render: text => (
    text === 'agree' ? <Badge status="success" text={text} /> : <Badge status="error" text={text} />
  ),
}, {
  title: '元素名称',
  dataIndex: 'updatedAt',
  key: 'updatedAt',
}, {
  title: '备注',
  dataIndex: 'memo',
  key: 'memo',
}];
const conceptColumns = [{
  title: '数据元编号',
  dataIndex: 'type',
  key: 'type',
}, {
  title: '数据元名称',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '数据元值域项数',
  dataIndex: 'status',
  key: 'status',
  render: text => (
    text === 'agree' ? <Badge status="success" text={text} /> : <Badge status="error" text={text} />
  ),
}, {
  title: '操作时间',
  dataIndex: 'updatedAt',
  key: 'updatedAt',
}, {
  title: '备注',
  dataIndex: 'memo',
  key: 'memo',
}];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
export default class ElementAdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    pagetabkey: 'detail',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchAdvanced',
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationPageTabChange = (key) => {
    this.setState({ pagetabkey: key });
  }
  onOperationTabChange = (key) => {
    this.setState({ operationkey: key });
  }

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    const { profile, loading } = this.props;
    const { advancedOperation1, advancedOperation2, advancedOperation3 } = profile;
    const contentList = {
      tab1: <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation1}
        columns={valueColumns}
      />,
      tab2: <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation2}
        columns={templateColumns}
      />,
      tab3: <Table
        pagination={false}
        loading={loading}
        dataSource={advancedOperation3}
        columns={conceptColumns}
      />,
    };
    const contentPageList = {
      timeline:
  <Card style={{ marginBottom: 24 }} bordered={false}>
    <Steps direction="vertical" progressDot={customDot} current={10000}>
      <Step title="新增" description={desc1} />
      <Step title="修改值域" description={desc2} />
      <Step title="审核" />
      <Step title="应用于表单340" />
      <Step title="新增" description={desc1} />
      <Step title="修改值域" description={desc2} />
      <Step title="审核" />
      <Step title="应用于表单340" />
      <Step title="新增" description={desc1} />
      <Step title="修改值域" description={desc2} />
      <Step title="审核" />
      <Step title="应用于表单340" />
    </Steps>
  </Card>,
      detail:
  <Card bordered={false}>
    <DescriptionList style={{ marginBottom: 24 }} title="标识类属性">
      <Description term="名称">{m.METADATA_NAME}</Description>
      <Description term="标识符">{m.METADATA_IDENTIFY}</Description>
      <Description term="注册机构" />
      <Description term="相关环境" />
      <Description term="版本">1.0</Description>
      <Description term="同义名称">{m.METADATA_NAME}</Description>
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList style={{ marginBottom: 24 }} title="定义类属性">
      <Description term="定义">{m.METADATA_INTRO}</Description>
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList style={{ marginBottom: 24 }} title="关系类属性">
      <Description term="分类模式" />
      <Description term="关键字" />
      <Description term="相关数据参照" />
      <Description term="关系类型" />
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList style={{ marginBottom: 24 }} title="表示类属性">
      <Description term="表示类别">{m.DATA_DISPLAY}</Description>
      <Description term="表示形式">{m.DATA_META_DATATYPE}</Description>
      <Description term="数据元值的数据类型">{m.DATA_META_DATATYPE}</Description>
      <Description term="数据元值的最大长度" />
      <Description term="数据元值的最小长度" />
      <Description term="表示格式">{m.DATA_META_DISPLAY}</Description>
      <Description term="数据元允许值" />
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList style={{ marginBottom: 24 }} title="管理类属性">
      <Description term="主管机构" />
      <Description term="注册状态" />
      <Description term="提交机构" />
      <Description term="备注" />
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList style={{ marginBottom: 24 }} title="附加类属性">
      <Description term="附加属性1" />
      <Description term="附加属性2" />
      <Description term="附加属性3" />
      <Description term="附加属性4" />
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList style={{ marginBottom: 24 }}>
      <Description term="数据元名称">{m.METADATA_NAME}</Description>
      <Description term="数据元编码">{m.METADATA_IDENTIFY}</Description>
      <Description term="数据元别名">{m.METADATA_NAME}</Description>
      <Description term="数据元定义同义数据元数据"><a href="#">{`${m.METADATA_IDENTIFY}01`}</a><br /><a>{`${m.METADATA_IDENTIFY}02`}</a></Description>
      <Description term="类型">{m.DATA_META_DATATYPE}</Description>
      <Description term="表示格式">{m.DATA_META_DISPLAY}</Description>
      <Description term="允许值">...</Description>
      <Description term="值域">{m.FIELDCODE_TABLECODE}</Description>
      <Description term="所属数据组">{`DS${m.DATA_OBJECT_ID}`}</Description>
      <Description term="所属数据集">{`DS${m.DATA_FEATURE_ID}`}</Description>
      <Description term="创建时间">{m.CREATE_DATE}</Description>
      <Description term="创建人">{m.CREATE_MAN}</Description>
      <Description term="来源">EPM导入</Description>
      <Description term="标准">企标</Description>
      <Description term="相关数据元"><a href="#">{`${m.METADATA_IDENTIFY}01`}</a><br /><a>{`${m.METADATA_IDENTIFY}02`}</a></Description>
      <Description term="对象类">{m.DATA_OBJECT_NAME}</Description>
      <Description term="特性">{m.DATA_FEATURE_NAME}</Description>
      <Description term="特性单位" />
      <Description term="表示">{m.DATA_DISPLAY}</Description>
      <Description term="数据元定义">{m.METADATA_INTRO}</Description>
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList size="small" title="运用范围" col="1">
      <Description term="表单名称">
        <a>{`Template${m.VERSION_DATE}`}</a><br />
      </Description>
    </DescriptionList>
  </Card>,
      remark:
  <Card style={{ marginBottom: 24 }} bordered={false}>
    <div className={styles.noData}>
      <Icon type="frown-o" />暂无数据
    </div>
  </Card>,
      refer:
  <Card
    className={styles.tabsCard}
    bordered={false}
    tabList={operationTabList}
    onTabChange={this.onOperationTabChange}
  >
    {contentList[this.state.operationkey]}
  </Card>,
    };
    const tabList = [{
      key: 'detail',
      tab: '摘要',
    }, {
      key: 'timeline',
      tab: '时间轴',
    }, {
      key: 'remark',
      tab: '备忘',
    }, {
      key: 'refer',
      tab: '具体运用',
    }];

    return (
      <PageHeaderLayout
        title={`数据元编号：${m.METADATA_IDENTIFY}`}
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        action={action}
        content={description}
        extraContent={extra}
        tabList={tabList}
        onTabChange={this.onOperationPageTabChange}
      >
        {contentPageList[this.state.pagetabkey]}
      </PageHeaderLayout>
    );
  }
}
