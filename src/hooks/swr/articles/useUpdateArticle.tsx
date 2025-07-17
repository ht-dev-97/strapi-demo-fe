"use client";

import { clientFetch } from "@/utils/http";
import useSWRMutation from "swr/mutation";
import { Article, ARTICLES_KEY } from "./useArticles";

export type UpdateArticleBody = {
  title?: string;
  description?: string;
  slug?: string;
  cover?: {
    url: string;
    width: number;
    height: number;
    name: string;
  };
};

export type UpdateArticleResponse = Article;

const fetcher = async (
  url: string,
  { arg }: { arg: { id: Article["documentId"]; data: UpdateArticleBody } }
): Promise<UpdateArticleResponse> => {
  const response = await clientFetch.put<{ data: UpdateArticleResponse }>(
    `${url}/${arg.id}`,
    {
      data: arg.data,
    }
  );
  return response.data;
};

export function useUpdateArticle() {
  const { trigger, isMutating, error } = useSWRMutation(ARTICLES_KEY, fetcher);

  return {
    updateArticle: trigger,
    isMutating,
    error,
  };
}
