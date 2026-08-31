import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /go/ = redirections affiliées : jamais indexées (secção 11)
      disallow: ["/go/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
