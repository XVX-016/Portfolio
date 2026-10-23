<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Tanmmay Kanhaiya</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "JetBrains Mono", monospace, sans-serif;
            background-color: #0c0c0c;
            color: #d1d5db;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 960px;
            margin: 0 auto;
          }
          h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.03em;
            margin-bottom: 8px;
          }
          p.desc {
            font-size: 14px;
            color: #888888;
            margin-bottom: 30px;
          }
          .count {
            color: #10b981;
            font-weight: 600;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #141414;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #262626;
          }
          th {
            background-color: #1c1c1c;
            color: #9ca3af;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 12px 16px;
            text-align: left;
            border-bottom: 1px solid #262626;
          }
          td {
            padding: 12px 16px;
            font-size: 13px;
            border-bottom: 1px solid #1f1f1f;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:hover td {
            background-color: #1a1a1a;
          }
          a {
            color: #ffffff;
            text-decoration: none;
            word-break: break-all;
          }
          a:hover {
            color: #10b981;
            text-decoration: underline;
          }
          .tag {
            font-family: monospace;
            font-size: 12px;
            color: #a3a3a3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>XML Sitemap</h1>
          <p class="desc">
            This is an XML sitemap generated for search engines (Google, Bing). It contains <span class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span> URLs.
          </p>
          <table>
            <thead>
              <tr>
                <th style="width: 55%;">URL</th>
                <th style="width: 15%;">Priority</th>
                <th style="width: 15%;">Change Frequency</th>
                <th style="width: 15%;">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td class="tag"><xsl:value-of select="sitemap:priority"/></td>
                  <td class="tag"><xsl:value-of select="sitemap:changefreq"/></td>
                  <td class="tag"><xsl:value-of select="sitemap:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
