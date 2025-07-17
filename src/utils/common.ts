import { env } from "@/configs/env";

export function getImageUrl(imageUrl: string): string {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const cleanUrl = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;

  return `${env.STRAPI_URL}/${cleanUrl}`;
}
