import { QueryCache, QueryClient } from '@tanstack/react-query';

/** Shared React Query client for the whole app. */
export const queryClient = new QueryClient({
  // Surface fetch failures in the Metro/dev console so a silent static
  // fallback doesn't hide a real network/API problem.
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (__DEV__) {
        console.warn(
          `[query error] ${JSON.stringify(query.queryKey)} →`,
          error instanceof Error ? error.message : error,
        );
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});
