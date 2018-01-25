const basicGoods = [
  {
    id: '1234561',
    name: '矿泉水 550ml',
    barcode: '12421432143214321',
    price: '2.00',
    num: '1',
    amount: '2.00',
  },
  {
    id: '1234562',
    name: '凉茶 300ml',
    barcode: '12421432143214322',
    price: '3.00',
    num: '2',
    amount: '6.00',
  },
  {
    id: '1234563',
    name: '好吃的薯片',
    barcode: '12421432143214323',
    price: '7.00',
    num: '4',
    amount: '28.00',
  },
  {
    id: '1234564',
    name: '特别好吃的蛋卷',
    barcode: '12421432143214324',
    price: '8.50',
    num: '3',
    amount: '25.50',
  },
];

const basicProgress = [
  {
    key: '1',
    time: '2017-10-01 14:10',
    rate: '联系客户',
    status: 'processing',
    operator: '取货员 ID1234',
    cost: '5mins',
  },
  {
    key: '2',
    time: '2017-10-01 14:05',
    rate: '取货员出发',
    status: 'success',
    operator: '取货员 ID1234',
    cost: '1h',
  },
  {
    key: '3',
    time: '2017-10-01 13:05',
    rate: '取货员接单',
    status: 'success',
    operator: '取货员 ID1234',
    cost: '5mins',
  },
  {
    key: '4',
    time: '2017-10-01 13:00',
    rate: '申请审批通过',
    status: 'success',
    operator: '系统',
    cost: '1h',
  },
  {
    key: '5',
    time: '2017-10-01 12:00',
    rate: '发起退货申请',
    status: 'success',
    operator: '用户',
    cost: '5mins',
  },
];

const advancedOperation1 = [
  {
    key: 'op1',
    type: '1',
    name: '值0',
    status: '7',
    updatedAt: '定义描述0',
    memo: '-',
  },
  {
    key: 'op2',
    type: '1',
    name: '值0',
    status: '7',
    updatedAt: '定义描述0',
    memo: '-',
  },
  {
    key: 'op3',
    type: '1',
    name: '值0',
    status: '7',
    updatedAt: '定义描述0',
    memo: '-',
  },
  {
    key: 'op4',
    type: '1',
    name: '值0',
    status: '7',
    updatedAt: '定义描述0',
    memo: '-',
  },
  {
    key: 'op5',
    type: '1',
    name: '值0',
    status: '7',
    updatedAt: '定义描述0',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: '39',
    type: '心血管基线信息表',
    name: '39',
    status: 'DE01.00.003.00.02_39_01',
    updatedAt: '名称1',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: '',
    name: '',
    status: '',
    updatedAt: '',
    memo: '-',
  },
];

export const getProfileBasicData = {
  basicGoods,
  basicProgress,
};

export const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2,
  advancedOperation3,
};

export default {
  getProfileBasicData,
  getProfileAdvancedData,
};
