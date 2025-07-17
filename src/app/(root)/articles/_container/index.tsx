"use client";

import { useArticles } from "@/hooks/swr/articles";
import { getImageUrl } from "@/utils/common";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArticlesContainer = () => {
  const { data: articles, isLoading } = useArticles();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div key={article.id} className="bg-gray-500 rounded-lg shadow-md">
            <div className="relative w-full h-[300px] overflow-hidden">
              <Image
                src={getImageUrl(article.cover.url)}
                alt={article.cover.name}
                width={article.cover.width}
                height={article.cover.height}
                className="size-full object-cover"
              />
            </div>
            <div className="p-4">
              <Link
                href={`/articles/${article.slug}`}
                className="text-blue-700 hover:text-blue-700/80"
              >
                <h2 className="text-2xl font-bold">{article.title}</h2>
              </Link>
              <p>{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesContainer;
