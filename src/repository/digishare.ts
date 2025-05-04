// repository/digishare.ts

import { api } from './api';

export async function fetchMissingSubscriberInfos() {
  const res = await api.get('/digishare/subscriber-info/missing');
  return res.data;
}

export async function fetchAllSubscriberInfos() {
  const res = await api.get('/digishare/subscriber-info');
  return res.data;
}
