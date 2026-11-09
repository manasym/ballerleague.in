# the baller league — Player Album

Static site for Baller League Season 2: teams, squad carousels, player profiles, competition table, shop, blog and media.

No build step, no framework. Plain HTML, CSS and vanilla JS, ready for GitHub Pages.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, standings, team carousel |
| `competition.html` | Standings, fixtures, results |
| `players.html` | 15 team squads with swipeable carousels |
| `profile.html` | Single player profile — `profile.html?player=<id>` |
| `shop.html` | Shop / merchandise |
| `blog.html` | News index |
| `news-matchday-1-recap.html` | Matchday 1 recap — results, scorers, standings |
| `news-wlwg-comeback.html` | WLWG FC 4-2 Walkalone match report |
| `news-bangalore-grafters-10-2.html` | Bangalore Grafters 10-2 Walkalone match report |
| `article.html` | Article template |
| `media.html` | Videos and photos |
| `404.html` | Custom not-found page |

## Structure

```
.
├── index.html, competition.html, players.html, profile.html,
│   shop.html, blog.html, news-matchday-1-recap.html,
│   news-wlwg-comeback.html, news-bangalore-grafters-10-2.html,
│   article.html, media.html, 404.html
├── css/                        # one stylesheet per page + shared style.css
├── assets/
│   ├── images/
│   │   ├── logos/              # site logo + 15 team crests
│   │   ├── players/            # player portraits, grouped by team
│   │   ├── graphics/           # hero images, partner logos, hover art, placeholders
│   │   └── ...
│   ├── data/                   # source player list and matchday scorer data
│   └── reference/              # design reference (not linked)
├── robots.txt
├── sitemap.xml
├── rss.xml
├── llms.txt
├── CNAME
└── .github/workflows/deploy.yml
```

## Local preview

Any static server works:

```bash
npx serve .
```

Then open the printed URL. Opening `index.html` directly also works, but a server is closer to production.

## Deploy to GitHub Pages

1. Create a repository and push this folder.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` stages the site and deploys it.

The site is configured for `https://www.theballerleague.in`. The `CNAME` file sets the custom domain for GitHub Pages. In **Settings → Pages**, confirm the custom domain is `www.theballerleague.in`.

## Adding player photos

1. Drop the portrait into `assets/images/players/<Team Name>/<Player Name>.webp` (WebP, portrait crop).
2. In `players.html`, point the card `<img src>` at the new file (percent-encode spaces as `%20`).
3. In `profile.html`, update that player's `portrait` value in `playerData`.

Until real photos are uploaded, cards use the placeholders in `assets/images/graphics/Player/`.

## Notes

- GitHub Pages is case-sensitive: file names must match exactly, including case, spaces and apostrophes. Spaces are written as `%20` in URLs.
- Team crests live in `assets/images/logos/`, not in a per-team folder.
- `profile.html` reads the `?player=` query string. Unknown or missing IDs fall back to a default profile.

## SEO / AEO / GEO

The site is optimised for Google Search, AI Overviews, ChatGPT, Perplexity, Copilot, Bing and Gemini.

**Canonical domain:** `https://www.theballerleague.in` — used in `robots.txt`, `sitemap.xml`, `rss.xml`, every page's `<link rel="canonical">` / `og:url`, and JSON-LD `@id` / `url` values.

**Files added:**
- `llms.txt` — experimental content directory for AI discovery platforms
- `rss.xml` — RSS feed for the blog/news channel
- `css/style.css` — breadcrumb navigation styles

**Implemented on every page:**
- Canonical URL, Open Graph (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name`) and Twitter card meta tags
- JSON-LD structured data: `Organization` (Knuckleball Global Pvt Ltd), `SportsOrganization` (The Baller League), `WebPage`, `WebSite`, `BreadcrumbList`
- `media.html` additionally includes `VideoObject` for the featured match
- Breadcrumb navigation (Home > section)

**Brand architecture (consistent everywhere):**
- Parent: Knuckleball / Knuckleball Global Pvt Ltd
- Flagship competition: The Baller League
- Community initiative: Baller Club

**Not yet implemented (roadmap):**
- IndexNow submission (requires an endpoint)
- Match-level `SportsEvent` pages, team pages, player profile content, city landing pages (only publish when real operational content exists)
- Google Search Console, Bing Webmaster Tools, GA4 and Core Web Vitals tracking
- Conversion tracking for registration and partnership enquiries
