import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/repository/api';

export interface SubscriberInfoInput {
  subscription_id: string;
  user_name: string;
  user_email?: string;
  user_account?: string;
  subscription_email?: string;
  subscription_password?: string;
  address?: string;
  link?: string;
}

export const useAddSubscriberInfo = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SubscriberInfoInput) => api.post('/digishare/subscriber-info', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriber_infos'] });
      options?.onSuccess?.();
    }
  });
};