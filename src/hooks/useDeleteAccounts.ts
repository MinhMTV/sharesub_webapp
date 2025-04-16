import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/repository/api';

export const useDeleteAccounts = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (emails: string[]) => {
      await Promise.all(emails.map(email => api.delete(`/accounts/${email}`)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      options?.onSuccess?.();
    },
  });
};