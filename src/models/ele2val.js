import { routerRedux } from 'dva/router';
import { fakeSubmitForm } from '../services/api';

export default {
  namespace: 'ele2val',

  state: {
    data: {
      values: [],
      element: [],
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/ele2val-step-form/result'));
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        data: {
          ...state.data,
          ...payload,
        },
      };
    },
  },
};
