# SALAR — design-loop progress

| Piece | Round | Brief critic | System critic | Craft critic | Biggest named gap |
|---|---|---|---|---|---|
| A · Shell (hero/nav/footer) | 2 | PASS | PASS | **PASS** (r1 FAIL: mobile display:body 3.6× < 6×; fixed → measured ~6.5×) | resolved |
| B · TRABAJO (work index) | 1 | PASS | PASS | PASS | – |
| C · OFICIO/ESTUDIO/CONTACTO | 2 | **PASS** (r1 FAIL: parade read as broken hairline; rebuilt as labeled channel meter) | PASS | PASS | resolved |
| D · Cordillera case study | 1 | PASS | PASS | PASS | – |

**Exit reached: all three critics pass all four pieces (round 2).**
Blind hero comparison vs the reference (Vivid+Co): ours preferred.

## Log
- Scaffold: serve.mjs, screenshot.mjs, design-system.md, bar.md written; npm install done.
- Imagery: 3 stills via Kling 3 Omni (10 cr each) + 1 retry (mareas broke art direction with a
  photoreal face); all 40 credits spent, all images on-direction.
- Build round 1 fixes: scroll-margin for anchors, mobile nav collision, parade legibility.
- Round 1 critics: brief critic failed piece C on the parade divider → rebuilt as a labeled
  R/G/B channel readout with numeric levels; verified in screenshot-19.
- Round 2: craft critic's piece-A gap fixed (mobile display floor 6rem, body 1rem ≤640px);
  fresh critics re-judged A and C → both PASS. Loop exit.
- Production gates (user checklist): canonicals, OG/Twitter meta, JSON-LD
  (Organization/WebSite/LocalBusiness/CreativeWork/ItemList), scripted sitemap.xml,
  robots.txt, llms.txt, favicon set (svg/ico/apple-touch), designed 1200×630 OG images,
  custom 404, internal links, no href="#", console check clean on all 3 pages.
- Lighthouse (localhost, mobile sim): home 97/100/100/100 · case 98/100/100/100.
- DEPLOYED on GitHub Pages, repo joaqAI918/salar. First published at
  joaqai918.github.io/salar/ (the account turned out to be joaqAI918, not the guessed
  joadlpbec — base URL rewritten before first push).
- **LIVE at https://salar.joaquinweb.cl** — custom domain (CNAME committed by GitHub;
  the old github.io path now 301s here). All absolute URLs — canonical, og:url, og:image,
  twitter:image, JSON-LD, sitemap, robots, llms.txt — moved to this origin, and the
  `/salar/` path segment dropped since the domain serves from root. Site root is written
  without a trailing slash; `BASE_URL` in build-sitemap.mjs became `ORIGIN` so path
  joining stays correct.
- Live perf regression found (TBT 610ms: font-swap relayout landing after FCP on real
  network) and fixed: content-visibility below fold, lean grain layer, compositor-promoted
  hero layers, fonts instanced (Fraunces wght pinned 380) + hard-subset 107 KB → 53 KB.
- **Lighthouse LIVE (final): home 100/100/100/100 · case 99/100/100/100.** LCP 1.3 s /
  1.6 s, CLS 0, TBT 50 ms / 30 ms.
- Final sizes (gzip): JS 888 B · CSS ~4.5 KB · fonts 53 KB · largest image variant 95 KB.
