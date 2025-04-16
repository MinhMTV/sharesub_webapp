import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/repository/api';

interface AccountCreate {
  email: string;
  password: string;
  login_type: string;
}

export const useAddAccount = (options?: {
  onSuccess?: () => void; onError?: (err: any) => void
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AccountCreate) => api.post('/accounts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      options?.onSuccess?.();
    },
    onError: options?.onError,
  });
};