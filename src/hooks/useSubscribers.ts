import { useQuery } from '@tanstack/react-query';
import {fetchAllSubscribers, Subscriber} from '@/repository/subscribers';

export function useSubscribers(subscriptionId?: string) {
  const { data = [], ...query } = useQuery<Subscriber[]>({
    queryKey: ['subscribers'],
    queryFn: fetchAllSubscribers,
  });

  const filtered = subscriptionId
    ? data.filter((s) => s.subscription_id === subscriptionId)
    : data;

  return { data: filtered, ...query };
}