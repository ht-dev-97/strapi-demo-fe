"use client";

import { useApi, useApiById, BaseEntity } from "../generic";

// Article specific interface extending BaseEntity
export interface Article extends BaseEntity {
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

export const useArticles = (options = {}, configs = {}) => {
  return useApi<Article>("articles", options, configs);
};

export const useArticleById = (id: string, options = {}, configs = {}) => {
  return useApiById<Article>("articles", id, options, configs);
};
