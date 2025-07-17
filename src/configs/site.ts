import { env } from "./env";

export const siteConfig = {
  baseUrl: env.BASE_URL || "",
  tokenConfig: {
    accessTokenKey: "accessToken",
    refreshTokenKey: "refreshToken",
    accessTokenExpiry: 30 * 60, // 30 minutes
    refreshTokenExpiry: 7 * 24 * 60 * 60, // 7 days
  },
};
