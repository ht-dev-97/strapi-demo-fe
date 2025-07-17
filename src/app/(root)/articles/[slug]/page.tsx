import ArticleDetailContainer from "./_container";

const ArticleDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <ArticleDetailContainer slug={slug} />;
};

export default ArticleDetailPage;
