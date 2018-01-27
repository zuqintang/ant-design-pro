import { routerRedux } from 'dva/router';
import { fakeSubmitForm } from '../services/api';

export default {
  namespace: 'ele-val',

  state: {
    data: {
      val: [],
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
      yield put(routerRedux.push('/form/ele-val-step-form/result'));
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
