import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';

const statusMap = ['default', 'processing', 'success', 'error'];
class ElementStandardTable extends PureComponent {
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

    const status = ['未审核', '已审核'];
    const standards = ['国标', '企标'];
    const groups = ['安贞医院', '北大三院'];

    const columns = [
      {
        title: '编码',
        dataIndex: 'METADATA_IDENTIFY',
      },
      {
        title: '名称',
        dataIndex: 'METADATA_NAME',
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
        title: '科别',
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
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={groups[val]} />;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'UPDATE_DATE',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '更新人',
        dataIndex: 'UPDATE_MAN',
      },
      {
        title: '状态',
        dataIndex: 'STATUS',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
        ],
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
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

export default ElementStandardTable;
