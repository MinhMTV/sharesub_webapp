import { useQuery } from '@tanstack/react-query';
import { fetchAccounts } from '@/repository/accounts';

export const useAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: fetchAccounts,
  });
};