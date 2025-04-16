import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/repository/api';

interface SendMessagePayload {
  subscriber_id: string;
  subscription_id: string;
  account_email: string;
  content: string;
  sender: 'me';
}

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendMessagePayload) => api.post('/chats/send', data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['messages', variables.subscriber_id],
      });
    },
  });
};