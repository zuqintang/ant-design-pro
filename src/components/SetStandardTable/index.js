import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';

const statusMap = ['default', 'processing', 'success', 'error'];
class SetStandardTable extends PureComponent {
  state = {
    selectedRowKeys: [],
  };

  componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      this.setState({
        selectedRowKeys: [],
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  render() {
    const { selectedRowKeys } = this.state;
    const { data: { list, pagination }, loading } = this.props;

    const groups = ['通用型', '专用型', '北医三院', '安贞医院'];
    const standards = ['国标', '企标'];
    const columns = [
      {
        title: '数据集ID',
        dataIndex: 'ID',
      },
      {
        title: '数据集名称',
        dataIndex: 'NAME',
      },
      {
        title: '数据集编码',
        dataIndex: 'CODE',
      },
      {
        title: '数据集所属类别',
        dataIndex: 'GROUPID',
        filters: [
          {
            text: groups[0],
            value: 0,
          },
          {
            text: groups[1],
            value: 1,
          },
          {
            text: groups[2],
            value: 2,
          },
          {
            text: groups[3],
            value: 3,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={groups[val]} />;
        },
      },
      {
        title: '标准',
        dataIndex: 'STANDARD',
        filters: [
          {
            text: standards[0],
            value: 0,
          },
          {
            text: standards[1],
            value: 1,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={standards[val]} />;
        },
      },
      {
        title: '创建人',
        dataIndex: 'CREATE_MAN',
      },
      {
        title: '创建日期',
        dataIndex: 'CREATE_DATE',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="">修改</a>
            <Divider type="vertical" />
            <a href="">详情</a>
          </Fragment>
        ),
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>清空</a>
              </div>
            )}
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={record => record.key}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default SetStandardTable;
