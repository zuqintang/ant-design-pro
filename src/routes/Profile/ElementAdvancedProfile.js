import React, { Component } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Icon, Row, Col, Card, Badge, Table, Divider, Tag, Steps, Popover } from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './AdvancedProfile.less';

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
      <div className={styles.heading}>待审批</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>标准</div>
      <div className={styles.heading}>国标</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2" style={{ position: 'relative', top: '-20px' }}>
    <div style={{ paddingBottom: '12px' }}>
      <Tag color="magenta" style={{ marginRight: '0px' }}>国标</Tag>
      <Tag color="red" style={{ marginRight: '0px' }}>北医三院</Tag>
      <Tag color="volcano" style={{ marginRight: '0px' }}>心血管</Tag>
      <Tag color="orange" style={{ marginRight: '0px' }}>民族</Tag>
      <Tag color="gold" style={{ marginRight: '0px' }}>未审核</Tag>
      <Tag color="lime" style={{ marginRight: '0px' }}>有值域</Tag>
      <Tag color="green" style={{ marginRight: '0px' }}>已被使用</Tag>
    </div>
    <Description term="创建人">张三</Description>
    <Description term="所属数据集">DS12.12.121</Description>
    <Description term="创建时间">2017-07-07</Description>
    <Description term="科别">北医三院</Description>
    <Description term="备注">啊啊啊</Description>
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
      <Description term="名称">患者 药品治疗时间4 时长</Description>
      <Description term="标识符">JH12.1231.12.12</Description>
      <Description term="注册机构">******</Description>
      <Description term="相关环境">******</Description>
      <Description term="版本">1.0</Description>
      <Description term="同义名称">患者药品治疗时长</Description>
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList style={{ marginBottom: 24 }} title="定义类属性">
      <Description term="定义">这是很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的内容</Description>
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList style={{ marginBottom: 24 }} title="关系类属性">
      <Description term="分类模式">*******</Description>
      <Description term="关键字">*******</Description>
      <Description term="相关数据参照">*******</Description>
      <Description term="关系类型">*******</Description>
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList style={{ marginBottom: 24 }} title="表示类属性">
      <Description term="表示类别">*******</Description>
      <Description term="表示形式">*******</Description>
      <Description term="数据元值的数据类型">*******</Description>
      <Description term="数据元值的最大长度">*******</Description>
      <Description term="数据元值的最小长度">*******</Description>
      <Description term="表示格式">*******</Description>
      <Description term="数据元允许值">*******</Description>
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList style={{ marginBottom: 24 }} title="管理类属性">
      <Description term="主管机构">*******</Description>
      <Description term="注册状态">*******</Description>
      <Description term="提交机构">*******</Description>
      <Description term="备注">*******</Description>
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList style={{ marginBottom: 24 }} title="附加类属性">
      <Description term="附加属性1">*******</Description>
      <Description term="附加属性2">*******</Description>
      <Description term="附加属性3">*******</Description>
      <Description term="附加属性4">*******</Description>
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList style={{ marginBottom: 24 }}>
      <Description term="数据元名称">患者 药品治疗时间4 时长</Description>
      <Description term="数据元编码">JH12.1231.12.12</Description>
      <Description term="数据元别名">患者药品治疗时间</Description>
      <Description term="数据元定义同义数据元数据"><a href="#">JH12.1231.12.12</a><br /><a>JH12.1231.12.12</a></Description>
      <Description term="类型">123afal</Description>
      <Description term="表示格式">725</Description>
      <Description term="允许值">1,2,3,4,5</Description>
      <Description term="值域">JV112134</Description>
      <Description term="所属数据组">DS191.12</Description>
      <Description term="所属数据集">DS191.12.121</Description>
      <Description term="创建时间">2017-01-12 12:50:00</Description>
      <Description term="创建人">2017-01-12 12:50:00</Description>
      <Description term="来源">EPM导入</Description>
      <Description term="标准">国标</Description>
      <Description term="相关数据元"><a href="#">JH12.1231.12.12</a><br /><a>JH12.1231.12.12</a></Description>
      <Description term="对象类">*****</Description>
      <Description term="特性">******</Description>
      <Description term="特性单位">******</Description>
      <Description term="表示">*******</Description>
      <Description term="数据元定义">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</Description>
    </DescriptionList>
    <Divider style={{ margin: '16px 0' }} />
    <DescriptionList size="small" title="运用范围" col="1">
      <Description term="表单名称">
        <a>忧郁症学记录（QIDS-SR16）</a><br />
        <a>急性期合并用药/治疗</a>
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
        title="数据元编号：DE01.00.003.00.02"
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
