"use client";

import { useArticles } from "@/hooks/swr/articles";
import { getImageUrl } from "@/utils/common";
import Image from "next/image";
import React, { useMemo } from "react";

interface ArticleDetailContainerProps {
  slug: string;
}

const ArticleDetailContainer = ({ slug }: ArticleDetailContainerProps) => {
  const { data: articles = [], isLoading } = useArticles({
    filters: { slug },
  });

  const article = useMemo(() => articles?.[0], [articles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-1">
        <Image
          src={getImageUrl(article.cover.url)}
          alt={article.cover.name}
          width={article.cover.width}
          height={article.cover.height}
        />
      </div>
      <div className="col-span-1">
        <h2 className="text-2xl font-bold">{article.title}</h2>
        <p>{article.description}</p>
      </div>
    </div>
  );
};

export default ArticleDetailContainer;
