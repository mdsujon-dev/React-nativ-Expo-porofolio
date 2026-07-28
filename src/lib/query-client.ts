import { QueryClient } from '@tanstack/react-query';

/** Shared React Query client for the whole app. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});
