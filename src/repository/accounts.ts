// src/repository/accounts.ts
import { api } from './api';


export interface Account {
    email: string;
    password: string;
    login_type: string;
}

export async function fetchAccounts(): Promise<Account[]> {
  const res = await api.get('/accounts/');
  return res.data;
}