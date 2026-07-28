import { useMutation } from '@tanstack/react-query';

import { apiPost, CONTACT_PATH } from '@/lib/api';

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

/** POST the contact form to the backend (path from EXPO_PUBLIC_CONTACT_PATH). */
export function useSendMessage() {
  return useMutation({
    mutationFn: (input: ContactInput) => apiPost<unknown>(CONTACT_PATH, input),
  });
}
