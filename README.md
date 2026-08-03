# G Boyz Wire Wheels

Astro site + Sanity CMS, deployed on Vercel.

## Project Structure

```text
/
├── src/
│   ├── lib/sanity.ts      # Sanity client + image URL builder
│   ├── pages/
│   │   ├── index.astro    # English (default locale, no /en/ prefix)
│   │   └── es/index.astro # Spanish (/es/)
│   └── env.d.ts           # Typed import.meta.env
├── studio/                # Sanity Studio (separate app, own package.json)
│   ├── schemaTypes/
│   │   ├── wheel.ts
│   │   ├── galleryPost.ts
│   │   └── businessInfo.ts  # singleton
│   └── sanity.config.ts
├── astro.config.mjs        # i18n + Vercel adapter config
└── .env.example
```

Both `index.astro` files are placeholders that only prove routing works — real components/content are yours to build.

## i18n routing

Configured in `astro.config.mjs` via Astro's built-in i18n router: English is the default locale served at `/` (no prefix), Spanish lives under `/es/`. Add more pages under `src/pages/` (English) and `src/pages/es/` (Spanish) following the same pattern.

## Sanity schemas

- **wheel** — style, `name`/`description` as `{ en, es }` objects, available finishes (tag list), spoke count, price range (hidden when quote-only), images, quote-only flag.
- **galleryPost** — photo(s), vehicle year/make/model, a reference to `wheel`, finish, submitted-by (shop/customer + name/contact), status (pending/approved).
- **businessInfo** — singleton (pinned at the top of the Studio's document list) with hours per day, contact info, and a list of social handles.

## Local setup

1. **Create a Sanity project** (if you don't have one yet): go to [sanity.io/manage](https://www.sanity.io/manage) and create a project, or run `npx sanity@latest init` from inside `studio/` and follow the prompts — this requires logging into your own Sanity account, so run it yourself rather than having an agent do it.
2. Copy `.env.example` to `.env` at the project root, and `studio/.env.example` to `studio/.env`, filling in your Sanity project ID and dataset in both.
3. Install dependencies in both apps (they have separate `package.json` files):
   ```sh
   npm install
   cd studio && npm install
   ```
4. Run the site: `npm run dev` (root) → `localhost:4321`
5. Run the Studio: `npm run dev` (inside `studio/`) → `localhost:3333`

## Deploying

- **Site (Vercel):** connect this repo in the Vercel dashboard (or `vercel link` from the CLI, run yourself) with the root directory set to the project root. The `@astrojs/vercel` adapter is already configured — no `vercel.json` needed. Add `SANITY_PROJECT_ID` and `SANITY_DATASET` as environment variables in the Vercel project settings.
- **Studio:** either deploy it to Sanity's own hosting with `npm run deploy` from inside `studio/` (requires your Sanity login), or as a second Vercel project pointed at the `studio/` directory — your call.

## Known issue

`npm audit` flags a transitive `path-to-regexp` advisory coming from `@vercel/routing-utils` (a dependency of `@astrojs/vercel`), and the Sanity Studio dependency tree has its own set of moderate/high advisories from third-party sub-dependencies. Both are upstream issues in those packages, not this app's code — nothing to fix here, just worth knowing about if a security scanner flags them later.
