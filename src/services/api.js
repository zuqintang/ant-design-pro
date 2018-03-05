import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function querySet(params) {
  return request(`/api/set?${stringify(params)}`);
}

export async function removeSet(params) {
  return request('/api/set', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addSet(params) {
  return request('/api/set/add', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
export async function queryGroup(params) {
  return request(`/api/group?${stringify(params)}`);
}

export async function removeGroup(params) {
  return request('/api/group', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addGroup(params) {
  return request('/api/group', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryElement(params) {
  return request(`/api/element?${stringify(params)}`);
}

export async function removeElement(params) {
  return request('/api/element', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addElement(params) {
  return request('/api/element', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryValue(params) {
  return request(`/api/value?${stringify(params)}`);
}

export async function removeValue(params) {
  return request('/api/value', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addValue(params) {
  return request('/api/value', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
