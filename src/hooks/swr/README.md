# SWR Hooks - Optimized for Strapi API

This directory contains optimized SWR hooks for interacting with Strapi APIs. The hooks are designed to be reusable across different API endpoints.

## Features

- ✅ Generic hooks that work with any API endpoint
- ✅ TypeScript support with full type safety
- ✅ Built-in pagination, filtering, and sorting
- ✅ Support for fields selection and population
- ✅ Publication state handling (live/preview)
- ✅ Optimized query building
- ✅ Easy to extend for new APIs

## Quick Start

### Using Pre-built Hooks

```tsx
import { useArticles, useCategories, useUsers } from "@/hooks/swr";

function MyComponent() {
  // Get articles with pagination and filtering
  const {
    data: articles,
    isLoading,
    error,
  } = useArticles({
    page: 1,
    pageSize: 10,
    filters: { published: true },
    populate: "categories,author",
  });

  // Get single article by ID
  const { data: article } = useArticleById("article-id", {
    populate: "categories,author,comments",
  });

  // Get categories
  const { data: categories } = useCategories({
    sort: "name:asc",
  });

  // Get users
  const { data: users } = useUsers({
    filters: { confirmed: true },
    fields: ["id", "username", "email"],
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  );
}
```

### Using Generic Hooks

```tsx
import { useApi, useApiById } from "@/hooks/swr";

// Custom interface for your API
interface Product extends BaseEntity {
  name: string;
  price: number;
  description: string;
}

function ProductComponent() {
  // Use generic hook for any endpoint
  const { data: products, isLoading } = useApi<Product>("products", {
    page: 1,
    pageSize: 20,
    filters: { inStock: true },
    sort: ["price:asc", "name:asc"],
    populate: "category,images",
  });

  // Get single product
  const { data: product } = useApiById<Product>("products", "product-id", {
    populate: "category,images,reviews",
  });

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## API Reference

### useApi<T>(endpoint, options?, configs?)

Generic hook for fetching list of entities.

**Parameters:**

- `endpoint`: API endpoint (e.g., "articles", "categories")
- `options`: Query options (optional)
- `configs`: SWR configuration (optional)

**Options:**

```typescript
interface UseApiOptions {
  page?: number; // Default: 1
  pageSize?: number; // Default: 10
  sort?: string | string[]; // Default: "createdAt:desc"
  populate?: string; // Default: "*"
  filters?: Record<string, unknown>; // Default: {}
  enabled?: boolean; // Default: true
  fields?: string[]; // Default: []
  publicationState?: "live" | "preview"; // Default: undefined
}
```

### useApiById<T>(endpoint, id, options?, configs?)

Generic hook for fetching single entity by ID.

**Parameters:**

- `endpoint`: API endpoint
- `id`: Entity ID
- `options`: Query options (optional, excludes pagination options)
- `configs`: SWR configuration (optional)

### buildApiQuery(options)

Utility function to build query string from options.

## Creating New Hooks

To create a new hook for a specific API:

1. Create a new file in the appropriate directory
2. Define your interface extending `BaseEntity`
3. Use the generic hooks

```tsx
// src/hooks/swr/products/useProducts.ts
import { useApi, useApiById, BaseEntity } from "../generic/useApi";

export interface Product extends BaseEntity {
  name: string;
  price: number;
  description: string;
  category?: Category;
}

export const useProducts = (options = {}, configs = {}) => {
  return useApi<Product>("products", options, configs);
};

export const useProductById = (id: string, options = {}, configs = {}) => {
  return useApiById<Product>("products", id, options, configs);
};
```

## Advanced Usage

### Complex Filtering

```tsx
const { data } = useArticles({
  filters: {
    title: { $contains: "React" },
    publishedAt: { $gte: "2024-01-01" },
    category: { id: { $in: [1, 2, 3] } },
  },
});
```

### Multiple Sorting

```tsx
const { data } = useArticles({
  sort: ["publishedAt:desc", "title:asc"],
});
```

### Field Selection

```tsx
const { data } = useArticles({
  fields: ["id", "title", "slug"],
  populate: "author",
});
```

### Publication State

```tsx
// Get draft articles
const { data: drafts } = useArticles({
  publicationState: "preview",
});

// Get published articles
const { data: published } = useArticles({
  publicationState: "live",
});
```

## Best Practices

1. **Type Safety**: Always define proper TypeScript interfaces for your entities
2. **Error Handling**: Always handle loading and error states
3. **Optimization**: Use `enabled` option to conditionally fetch data
4. **Caching**: Leverage SWR's built-in caching and revalidation
5. **Pagination**: Use the meta information for pagination UI

## Migration from Old Hooks

If you're migrating from the old `useArticles` hook:

```tsx
// Old usage
const { articles, meta, error, isLoading } = useArticles(options);

// New usage
const { data: articles, meta, error, isLoading } = useArticles(options);
```

The main change is that the articles are now returned as `data` instead of `articles` for consistency across all hooks.
