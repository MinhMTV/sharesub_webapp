import { api } from './api';

export interface Message {
  id: string;
  subscriber_id: string;
  subscription_id: string;
  account_email: string;
  content: string;
  sender: 'me' | 'other';
  time: string;
}

export async function fetchAllMessages(): Promise<Message[]> {
  const res = await api.get('/chats');
  return res.data;
}

export async function fetchMessagesByEmail(email: string): Promise<Message[]> {
  const res = await api.get(`/chats/${email}`);
  return res.data;
}

export async function fetchMessagesBySubscriberId(subscriberId: string): Promise<Message[]> {
  const res = await api.get(`/chats/id/${subscriberId}`);
  console.log('res.data:', res.data);
  return res.data ?? []; // keine .messages, da res.data direkt ein Array ist
}