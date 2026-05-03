# Decision 001 — Public copy must not reference Web3 / blockchain / tokens

## The rule

Public-facing pages on roscas.io **must not mention** any of the following:

- Blockchain
- Tokens (in the crypto sense — including "community-earned tokens", "ROC", any in-app currency)
- Crypto / cryptocurrency
- Web3
- Sui (the blockchain platform)
- DeFi
- Any other crypto-adjacent branding, partner logos, or technology references

This includes feature descriptions, FAQ answers, partner logo bars, image alt text, blog posts, page titles, meta descriptions, and the TinaCMS-edited blog content.

## Why

Roscas is positioned as a free, simple, community-savings tool. Crypto/Web3 framing alienates the target audience (NHS workers, community organisers, diaspora savings groups) and creates friction that costs us conversions. The product may use modern infrastructure under the hood, but visitors should never have to engage with crypto vocabulary to understand or use Roscas.

## Idiomatic edge case

The word "token" used in idiomatic English (e.g. "a token of appreciation") is technically allowed but **avoid it anyway** to remove all ambiguity. Use "gift", "small thank-you", or "gesture" instead.

## How to talk about the things crypto would otherwise describe

| Don't say | Do say |
|---|---|
| "Built on blockchain" | "Tamper-resistant records", "reliable audit trail", "trustworthy history" |
| "Community-earned tokens" | (remove the feature from public copy entirely until it has a non-crypto framing) |
| "Powered by Sui / Privy / [Web3 brand]" | (omit; show only neutral infrastructure partners like Firebase) |
| "Web3 login" | "Secure modern login", "passwordless sign-in" |

## Where this has been enforced (May 2026)

- Removed Sui logo from homepage partner bar.
- Removed Privy logo from homepage partner bar.
- Rewrote `features-4.tsx` "Secure & Reliable Records" card to drop "blockchain technology subtly in the background".
- Replaced `features-4.tsx` "Optional 'Tip' Flexibility" card (which referenced "community-earned tokens") with a new "Manage Multiple Circles" card.
- Rewrote FAQ item 4 (`faqs-3.tsx`) to remove "Privy.io" and "blockchain technology".
- Replaced FAQ item 5 (about the 'Tip' / tokens feature) with "Can my group set its own rules?".
- Replaced "token of our appreciation" wording on `/contact` with "gift of our appreciation".

## How to audit before deploy

```bash
# search the public-facing source tree for any of the banned terms
rg -i "blockchain|crypto|web3|\bsui\b|defi|\broc\b" src/ content/posts/
rg -i "\btoken[s]?\b" src/ content/posts/   # then human-review each hit
```

Public-facing files are everything under `src/app/`, `src/components/`, and `content/posts/`. Internal config files (e.g. `tina/config.ts`) are not public and may legitimately contain technical terms.

## Decision history

This decision was set by the Roscas MD ahead of the May 2026 acquisition-engine launch and is intended to be enforced indefinitely until explicitly revoked in writing.
