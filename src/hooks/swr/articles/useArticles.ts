"use client";

import { env } from "@/configs";
import { useApi, useApiById, BaseEntity } from "../generic";

// Article specific interface extending BaseEntity
export interface Article extends BaseEntity {
  documentId: string;
  title: string;
  description: string;
  slug: string;
  cover: {
    url: string;
    width: number;
    height: number;
    name: string;
  };
}

export const ARTICLES_KEY = `${env.STRAPI_URL}/api/articles`;

export const useArticles = (options = {}, configs = {}) => {
  return useApi<Article>("articles", options, configs);
};

export const useArticleById = (id: string, options = {}, configs = {}) => {
  return useApiById<Article>("articles", id, options, configs);
};
