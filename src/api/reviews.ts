import { useQuery } from '@tanstack/react-query';

import { apiGet } from '@/lib/api';

export type Review = {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  isActive?: boolean;
};

/** GET /reviews — client testimonials. Only active ones are shown. */
export function useReviews() {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: () => apiGet<Review[]>('/reviews'),
    select: (data) => (Array.isArray(data) ? data.filter((r) => r.isActive !== false) : []),
  });
}
