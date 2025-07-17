export const siteConfig = {
  baseUrl:
    typeof window !== "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL || ""
      : process.env.BASE_URL || "",
  tokenConfig: {
    accessTokenKey: "accessToken",
    refreshTokenKey: "refreshToken",
    accessTokenExpiry: 30 * 60, // 30 minutes
    refreshTokenExpiry: 7 * 24 * 60 * 60, // 7 days
  },
}
