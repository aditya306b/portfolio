// Set NEXT_PUBLIC_SITE_URL once the real domain exists; sitemap, feed and share cards use it.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
