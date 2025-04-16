import { api } from './api';

export interface Subscriber {
  subscription_id: string;
  subscriber_id: string;
  name: string;
  joined_date: string;
  is_old : boolean;
  account_email : string;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  content: string;
  timestamp: string;
  subscriber_id: string;
}

export async function fetchAllSubscribers(): Promise<Subscriber[]> {
  const res = await api.get('/subscribers');
  return res.data;
}

export async function fetchSubscriberById(id: string): Promise<Subscriber> {
  const res = await api.get(`/subscribers/id/${id}`);
  return res.data;
}

export async function fetchChatsForSubscriber(id: string): Promise<ChatMessage[]> {
  const res = await api.get(`/subscribers/id/${id}/chats`);
  return res.data.messages;
}