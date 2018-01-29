import { routerRedux } from 'dva/router';
import { fakeSubmitForm } from '../services/api';

export default {
  namespace: 'set2set',

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
      yield put(routerRedux.push('/form/set2set-step-form/result'));
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
