// src/hooks/useCosts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/repository/api';

export interface Cost {
  subscription_name: string;
  monthly_cost: number;
}

export const useCosts = () => {
  return useQuery<Cost[]>({
    queryKey: ['costs'],
    queryFn: async () => {
      const res = await api.get('/costs/');
      console.log('DEBUG /costs data:', res.data);
      return res.data;
    },
  });
};

export const useMissingCosts = () => {
  return useQuery<Cost[]>({
    queryKey: ['costs', 'missing'],
    queryFn: async () => {
      const res = await api.get('/costs/missing');
      console.log('DEBUG /missing costs data:', res.data);
      return res.data;
    },
  });
};

export const useAddCost = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { subscription_name: string; monthly_cost: number }) => {
      return await api.post('/costs/', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['costs'] });
      queryClient.invalidateQueries({ queryKey: ['costs', 'missing'] });
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
};