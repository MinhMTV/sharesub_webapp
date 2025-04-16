import { useQuery } from '@tanstack/react-query';
import { fetchAllSubscriptions } from '@/repository/subscriptions';
import type { Subscription } from '@/repository/subscriptions';

export function useSubscriptions(accountEmail?: string) {
  const { data = [], ...query } = useQuery<Subscription[]>({
    queryKey: ['subscriptions'],
    queryFn: fetchAllSubscriptions,
  });

  const filtered = accountEmail
    ? data.filter((s) => s.account_email === accountEmail)
    : data;

  return { data: filtered, ...query };
}