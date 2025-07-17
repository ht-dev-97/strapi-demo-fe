"use client";

import { useCallback } from "react";
import { env } from "@/configs/env";
import { Article } from "./useArticles";

interface UpdateArticleData {
  title?: string;
  description?: string;
  slug?: string;
  cover?: {
    url: string;
    width: number;
    height: number;
    name: string;
  };
}

interface UseUpdateArticleOptions {
  onSuccess?: (data: Article) => void;
  onError?: (error: Error) => void;
}

export const useUpdateArticle = (options: UseUpdateArticleOptions = {}) => {
  const { onSuccess, onError } = options;

  const updateArticle = useCallback(
    async (
      id: string,
      updateData: UpdateArticleData
    ): Promise<Article | null> => {
      try {
        const response = await fetch(`${env.STRAPI_URL}/api/articles/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: updateData }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error?.message ||
              `Failed to update article: ${response.status}`
          );
        }

        const result = await response.json();
        const updatedArticle = result.data;

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(updatedArticle);
        }

        return updatedArticle;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Error updating article:", errorMessage);

        // Call error callback if provided
        if (onError) {
          onError(error instanceof Error ? error : new Error(errorMessage));
        }

        throw error;
      }
    },
    [onSuccess, onError]
  );

  return {
    updateArticle,
  };
};
