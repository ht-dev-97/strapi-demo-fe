"use client";

import { env } from "@/configs";
import { clientFetch } from "@/utils/http";
import useSWRMutation from "swr/mutation";

export type RequestContactsBody = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export type RequestContactsResponse = {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  message: string;
};

const fetcher = async (
  url: string,
  { arg }: { arg: { data: RequestContactsBody } }
): Promise<RequestContactsResponse> => {
  const response = await clientFetch.post<{ data: RequestContactsResponse }>(
    `${url}`,
    {
      data: arg.data,
    }
  );
  return response.data;
};

export const CONTACT_KEY = `${env.STRAPI_URL}/api/contacts`;

export function useRequestContacts() {
  const { trigger, isMutating, error } = useSWRMutation(CONTACT_KEY, fetcher);

  return {
    requestContacts: trigger,
    isMutating,
    error,
  };
}
