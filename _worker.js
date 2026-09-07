export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const BASE_URL = "https://craftsuite-central.craftsuite-hub.workers.dev";

    // 1. Robots.txt Response
    if (url.pathname === "/robots.txt") {
      const robotsContent = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml`;

      return new Response(robotsContent, {
        headers: { 
          "content-type": "text/plain;charset=UTF-8",
          "cache-control": "public, max-age=86400"
        }
      });
    }

    // 2. Sitemap.xml Response
    if (url.pathname === "/sitemap.xml") {
      const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>2026-09-07</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

      return new Response(sitemapContent, {
        headers: { 
          "content-type": "application/xml;charset=UTF-8",
          "cache-control": "public, max-age=86400"
        }
      });
    }

    // 3. Baqi tamam files (index.html wagera) GitHub se serve honge
    return env.ASSETS.fetch(request);
  }
};
