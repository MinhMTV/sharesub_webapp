import { api } from './api';

export interface Subscription {
  unique_id: string;
  name: string;
  account_email: string;
  link: string;
  address: string;
  num_users: number;
  money_received: number;
  free_spots: number;
  created_date: string;
  email: string;
  password: string;
  unreadMessages?: number; // optional, falls später ergänzt
}

export async function fetchAllSubscriptions(): Promise<Subscription[]> {
  const response = await api.get('/subscriptions/');
  return response.data;
}

export async function fetchSubscriptionsByEmail(email: string): Promise<Subscription[]> {
  const res = await api.get(`/subscriptions/${email}`);
  return res.data.map((s: Subscription) => ({
    ...s,
    id: s.unique_id, // für Kompatibilität mit UI-Komponenten
  }));
}