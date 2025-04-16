import { useQuery } from '@tanstack/react-query';
import { fetchMessagesBySubscriberId, Message } from '@/repository/messages';

export const useMessages = (subscriberId?: string) => {
  return useQuery<Message[]>({
    queryKey: ['messages', subscriberId],
    queryFn: () => fetchMessagesBySubscriberId(subscriberId!),
    enabled: !!subscriberId,
    refetchInterval: 10000,
    staleTime: 0,
  });
};