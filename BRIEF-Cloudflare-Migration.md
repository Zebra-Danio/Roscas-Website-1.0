# Brief — Moving roscas.io DNS to Cloudflare

> **Status:** Decided — **deferred**. The JS-beacon-only path described in §7 ("What to do instead, right now") was implemented in May 2026 (commit `242bb76`). Cloudflare Web Analytics is live, no DNS migration was performed. Full migration to remain parked until one of the triggers in §7 fires.
> **Author:** drafted May 2026.
> **Audience:** Roscas MD + Maya (marketing). Skim time ~5 minutes.
> **Implementation status:** see [Postscript](#postscript--may-2026-what-actually-happened) at the bottom.

---

## TL;DR

You don't need to migrate to Cloudflare to get cookieless analytics. **Cloudflare Web Analytics has a JS-beacon mode that works on any host, no DNS change required.** If Web Analytics is the only motivator, paste a script into `src/app/layout.tsx` and you're done — 10-minute job, zero risk.

The full Cloudflare stack (CDN, DDoS protection, edge rules, automatic Web Analytics) **does** require a DNS migration. At current traffic (~6 signups in 6 weeks, no traffic spikes, no attacks observed), the marginal benefit is small. **Recommendation: wait.** Revisit when traffic is 10× current or you experience a real incident.

---

## 1. Current DNS setup (verified May 2026)

Based on live DNS lookups against Google's resolver (`8.8.8.8`):

| Record | Value | Meaning |
|---|---|---|
| **NS** | `ns15.domaincontrol.com`, `ns16.domaincontrol.com` | DNS hosted at **GoDaddy** |
| **A (apex)** | `199.36.158.100` | Firebase Hosting edge IP |
| **MX** | `mx.zoho.eu` (10), `mx2.zoho.eu` (20), `mx3.zoho.eu` (50) | Email on **Zoho Mail EU** — this is how `team@roscas.io` receives Web3Forms submissions |
| **TXT** | `hosting-site=roscas-website-1` | Firebase Hosting custom-domain verification |
| **TXT** | `v=spf1 include:dc-8e814c8572._spfm.roscas.io ~all` | SPF flattening (Zoho-managed) |
| **TXT** | `google-site-verification=QZtytApJ7706Xiknc0AVylnT-4FRjmhJW4R5nu1d8oQ` | Existing GSC verification — see note below |
| **CNAME www** | (none — `www.roscas.io` does not resolve) | Only the apex is served |

**Inferred but not confirmed:** the domain registrar is most likely also GoDaddy (NS records typically default to the registrar's nameservers). Worth verifying via the GoDaddy account before migration.

**Domain registrar vs. DNS host:** these can be split. Migrating *DNS* to Cloudflare does **not** require transferring the *registration* — the registrar stays at GoDaddy; only the nameservers change to Cloudflare's.

---

## 2. Migration steps (in order)

Assumes you keep the domain registered at GoDaddy and only move DNS hosting to Cloudflare.

1. **Sign up for Cloudflare** (free plan is sufficient) at `cloudflare.com`.
2. **Add `roscas.io` as a site.** Cloudflare auto-scans existing DNS records and imports them.
3. **Audit the imported records.** Cloudflare's import is good but not perfect. Verify every record from the table above is present in the Cloudflare dashboard. Pay particular attention to:
   - Zoho MX records (mail will silently break if these are wrong)
   - The Firebase TXT and SPF TXT records
   - The apex A record pointing to `199.36.158.100` (and add `199.36.158.101` if it isn't there — Firebase publishes both as the recommended pair)
4. **Decide proxy mode per record** ("orange cloud" = proxied through Cloudflare; "grey cloud" = DNS-only):
   - **A record (apex)** — recommended `orange` to unlock CDN, DDoS, automatic Web Analytics, TLS at the edge
   - **MX records** — **must be `grey`** (Cloudflare cannot proxy SMTP; orange-clouding mail records breaks email)
   - **TXT records** — `grey` (proxy doesn't apply)
5. **Set SSL/TLS mode in Cloudflare to "Full (strict)".** Firebase Hosting auto-provisions a valid certificate at the origin, so Cloudflare can validate the upstream TLS handshake. Do **not** use "Flexible" — it disables end-to-end encryption.
6. **Copy Cloudflare's two assigned nameservers** (something like `xxx.ns.cloudflare.com`).
7. **Log into GoDaddy** → Domain Settings for `roscas.io` → Nameservers → switch from "default" to "custom" and paste the two Cloudflare nameservers.
8. **Wait for propagation.** Typically 5 minutes to 2 hours; up to 48 hours in worst case (covered below).
9. **Cloudflare auto-detects activation** and emails you. Site continues to serve throughout, assuming records were imported correctly.
10. **Post-migration verification:**
    - Open `https://roscas.io` in a fresh browser — site loads, TLS green padlock.
    - Submit a test form on `/contact` — email arrives at `team@roscas.io` (proves Zoho MX still works).
    - `nslookup roscas.io` from a clean shell — confirms new NS and unchanged A record values.
    - Firebase Console → Hosting → custom domain still shows "Connected".
    - Re-check Search Console — no verification loss (the existing `google-site-verification` TXT must still be present in Cloudflare).
11. **Enable Cloudflare Web Analytics** under Analytics → Web Analytics. With the apex proxied (orange cloud), no script tag is needed — it's automatic.

---

## 3. Downtime / risk

**Expected downtime: zero, if records are imported correctly before nameservers are switched.**

The DNS migration is a *replacement* of authoritative nameservers, not a content cutover. Resolvers worldwide will gradually pick up the new NS records over the TTL window. As long as Cloudflare answers with the same A/MX/TXT records as GoDaddy did at the moment of cutover, end users never notice.

### Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| MX records mis-imported → email outage | Medium | High (form leads are lost silently — `team@roscas.io` stops receiving) | Verify MX records manually before nameserver switch. Send a test email from outside the org *immediately* after cutover. |
| A record imported with wrong IP / orange-cloud TLS mismatch → site 5xx | Low | High (live site down) | Set SSL mode to "Full (strict)" before traffic flows. Have GoDaddy nameservers ready to re-paste as rollback. |
| Firebase TXT verification lost → custom domain detaches → cert may re-issue or fail | Low | Medium | Confirm `hosting-site=roscas-website-1` TXT is present in Cloudflare. |
| Existing Google Search Console TXT lost | Low | Low | Same as above — verify the TXT is imported. |
| Propagation slow for some users (up to 48h) | Low | Low | Old and new nameservers return the same answers, so split-brain isn't user-visible during this window. |
| Cloudflare proxy interferes with Web3Forms requests | Very low | Medium | Web3Forms is `api.web3forms.com` (outbound from the browser); not proxied through `roscas.io`'s CDN. No interaction expected. |

### Rollback path

GoDaddy nameservers don't disappear when you switch away — switching back is a single field change in the GoDaddy dashboard, paste the original `ns15/16.domaincontrol.com` values, save. Propagation reverses over the same TTL window. **Total rollback time: 5 minutes to issue + up to 2 hours of mixed-resolver state during DNS propagation. Live site continues serving the whole time** because the records on GoDaddy still match production.

Practical safeguard: take a screenshot of the GoDaddy DNS Zone editor *before* changing nameservers. That's your source-of-truth backup.

---

## 4. What we gain

| Benefit | Free tier? | Useful for Roscas? |
|---|---|---|
| **Cloudflare Web Analytics (automatic mode)** | Yes | Yes — cookieless, GDPR-compliant, no banner needed. Replaces the need for GA4 or Plausible. |
| **Global CDN** | Yes | Marginal at current traffic but free upside. UK users likely already hit a fast edge; international visitors benefit more. |
| **DDoS protection** | Yes (unmetered L3/L4/L7) | Insurance, not a current need. No attacks observed to date. |
| **Universal SSL (TLS auto-renewal)** | Yes | Duplicates Firebase's auto-renewal — neutral, not additive |
| **Bot Fight Mode** | Yes (basic) | Reduces noise from scrapers/bots in analytics; marginal value |
| **Page Rules / Cache Rules** | Yes (limited count on free) | Could be used to set caching headers more flexibly than `firebase.json` currently does |
| **Always Online™** | Yes | Cloudflare serves a cached copy if Firebase Hosting goes down. Firebase's SLA is already very high; marginal insurance. |
| **Workers / R2 / KV** | Free tier with caps | Not relevant now; useful if we ever need dynamic edge logic without leaving the static-export architecture |
| **Email Routing** | Yes | Could replace Zoho for simple forwarding — out of scope, mentioned for completeness |
| **Analytics on referrers / country / browser** | Yes | Cloudflare Web Analytics already includes these |

---

## 5. What we lose / what changes

### Doesn't change

- **Firebase Hosting** continues to serve the site. Cloudflare sits in front; Firebase is the origin.
- **The static-export build pipeline** (`npm run deploy`) is untouched.
- **Web3Forms submissions** still POST from the browser to `api.web3forms.com` — not routed through Cloudflare in any way.
- **Zoho email** continues to deliver `team@roscas.io` provided MX records are imported correctly.
- **TinaCMS local dev** is unaffected (it never touches DNS).

### Genuinely changes

- **Firebase will no longer see real visitor IPs.** With orange-cloud proxying, Firebase sees Cloudflare IPs. For a static site with no server-side logging this is irrelevant, but worth knowing if you ever add Firebase Cloud Functions or analytics on the origin.
- **Cache invalidation has two layers.** A deploy invalidates Firebase's cache; Cloudflare's edge cache will revalidate on its own TTLs. New deploys may take a few minutes longer to be globally visible. Solvable via a one-line `firebase deploy` hook that hits the Cloudflare cache-purge API, or by configuring short cache TTLs for HTML.
- **One more vendor in the critical path.** A Cloudflare outage would take roscas.io offline even if Firebase is healthy. Cloudflare's reliability is industry-leading but they do have incidents (notably June 2022, July 2024). Currently Roscas's only critical-path vendor for the public site is Firebase + Web3Forms; adding Cloudflare makes it three.
- **Free-tier ToS gotcha to be aware of:** Cloudflare's free plan §2.8 restricts use of the CDN to "primarily HTML pages" — serving large amounts of non-HTML (video, downloads) through the free plan is technically a ToS violation. Roscas is HTML + small images, so this isn't relevant today, but if you ever host the Android APK or video assets on `roscas.io` directly, that becomes a consideration.

### Doesn't matter for Roscas specifically

- Cloudflare's WAF (Web Application Firewall) is mostly free-tier with managed rules — Roscas is a static site, so SQL injection / etc. attacks don't apply. WAF is nice-to-have, not need-to-have.

---

## 6. Implementation time (honest estimate)

| Phase | Time |
|---|---|
| Cloudflare account signup + add domain | 10 min |
| DNS record audit (compare imported records against the table in §1) | 20 min |
| Set SSL mode, proxy flags per record | 10 min |
| Nameserver swap at GoDaddy | 5 min |
| Wait for activation email from Cloudflare | 30 min – 2 hours (mostly idle wait) |
| Post-migration verification (site, email, forms, GSC) | 30 min |
| Enable + configure Cloudflare Web Analytics | 10 min |
| **Total active work** | **~1.5 hours** |
| **Total elapsed (incl. propagation wait)** | **~2–4 hours** |
| **Buffer for the "something weird happened" scenario** | **+2 hours** |
| **Realistic budget** | **half a working day, end-to-end** |

The actual work is small; most of the budget is the wait window where you stop and check that nothing broke before walking away.

---

## 7. Recommendation

**Wait. Don't do this yet.**

Reasoning, in order of importance:

1. **The primary justification (Web Analytics) doesn't require migration.** Cloudflare's JS-beacon mode gives you exactly the same cookieless analytics by pasting a script into `src/app/layout.tsx`. If you want that data now, take the 10-minute path, not the 4-hour path.
2. **Traffic doesn't justify a CDN yet.** At ~6 signups in 6 weeks the bottleneck on growth is not page load latency; it's reach. Firebase Hosting already serves quickly from its global edge.
3. **No DDoS threat observed.** Buying insurance against an event with no current signal is fine when the cost is zero — but the cost here is a half-day plus marginal new vendor risk.
4. **Adds a vendor to the critical path.** Three vendors (Firebase + Web3Forms + Cloudflare) all need to be up for visitors to convert. Today it's two. Each one added is small but real.
5. **Email is the highest-value, most-fragile piece** of this stack — every lead in the last 6 weeks arrived via Zoho. The migration's biggest risk concentrates exactly there. Low probability, but the expected loss if it goes wrong is "every form lead silently dropped for a few hours." Not worth taking on for marginal gain.

### Revisit when any of these become true

- Sustained traffic crosses ~10,000 sessions/month (then CDN starts to matter measurably).
- A real spike or scrape/abuse event hits the site.
- You decide to host downloads (e.g. APK, video assets) on `roscas.io` directly.
- Firebase Hosting pricing or feature changes make it less attractive.
- You're already in the registrar/DNS dashboard for an unrelated reason (e.g. adding a subdomain for the app) — migrate as a piggyback while costs are incurred anyway.

### What to do instead, right now

1. ✅ **Just-add-the-script path** — paste Cloudflare Web Analytics JS beacon into `src/app/layout.tsx`. Gets you the analytics signal without touching DNS.
2. ✅ **Google Search Console** — already actioned in parallel; covers the "what are people searching for" gap.
3. ⏸ **Hold the Cloudflare migration** as a documented option (this file). When a trigger fires, re-open this brief and execute §2 against it.

---

## Appendix — what I'd want to verify before any future migration

- Who controls the GoDaddy account (login, 2FA recovery)?
- Is the domain registration auto-renew on?
- Does `team@roscas.io` have a backup recovery address that *isn't* `@roscas.io`? (If Zoho breaks mid-migration, locking yourself out is the worst case.)
- Is there a subdomain plan (e.g. `app.roscas.io`, `api.roscas.io`) on the roadmap? If yes, factor that into the DNS design at migration time, not afterward.

---

## Postscript — May 2026 (what actually happened)

The brief recommended deferring full DNS migration and taking the JS-beacon-only path instead. That path was implemented and shipped to production on **2026-05-21** as commit `242bb76` ("Merge branch 'feature/analytics-foundation'").

**What was done:**

- Cloudflare Web Analytics JS beacon added to `src/app/layout.tsx` via `next/script` (`afterInteractive`).
- Google Search Console verification added to the same file via `metadata.verification.google` (a parallel-but-independent change; not Cloudflare-related but shipped in the same deploy).

**What was not done:**

- DNS nameservers at GoDaddy were not changed. The `roscas.io` A record still points directly to Firebase Hosting (`199.36.158.100`).
- No Cloudflare features other than Web Analytics are active (no CDN, no DDoS protection at the edge, no Cloudflare TLS).
- Zoho email (`team@roscas.io`) routing is untouched.

**When to re-open this brief and execute §2:**

The trigger conditions listed in §7 remain authoritative:

- Sustained traffic crosses ~10,000 sessions/month.
- A real traffic spike, scrape, or abuse incident hits the site.
- You decide to host downloads (APK, video assets) on `roscas.io` directly.
- Firebase Hosting pricing or feature changes shift the calculus.
- You're already in the GoDaddy/DNS dashboard for an unrelated reason (piggyback opportunity).

Day-to-day analytics ops, token rotation, and the rationale for the current stack are now documented in [DEVELOPER-GUIDE.md § Analytics](./DEVELOPER-GUIDE.md#analytics) — that's the right read for "how do I do X today?"; this brief remains the right read for "should we revisit the full migration?"
