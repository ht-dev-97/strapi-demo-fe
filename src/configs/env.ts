export const env = {
  STRAPI_URL:
    process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || "",
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "",
};
