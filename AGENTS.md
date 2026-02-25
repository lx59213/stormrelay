# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

StormRelay (飓风接力) is an AI-powered content collaboration tool for video production teams. It is a vanilla HTML/CSS/JS static site with Vercel Serverless Functions (`/api/*`) that proxy to the Volcengine (火山引擎) Doubao LLM API.

- **No build step** — all files are served as-is (no transpilation, bundling, or compilation).
- **No lint/test tooling** — no ESLint, Prettier, or automated test suites. Testing is manual per `MANUAL_TEST_CHECKLIST.md`.
- **Data storage** — browser `localStorage` only; no database.
- **Single npm dependency** — `form-data` (used by `api/upload.js`).

### Running locally

```bash
# Install dependencies
npm install

# Serve static files (sufficient for demo data browsing)
npx serve . -l 3000

# OR for full serverless function support (requires Vercel authentication):
# vercel dev --listen 0.0.0.0:3000
```

**Caveat**: The `serve` static server strips `.html` extensions (e.g. `project.html?id=X` redirects to `/project`). The in-app links from `index.html` use `project.html?id=X`, so clicking project cards may lose the query parameter. Navigate directly to `/project?id=<id>` as a workaround, or use `vercel dev` which handles this correctly.

**Caveat**: `vercel dev` requires authentication (`vercel login` or `--token`). Without a `VERCEL_TOKEN` secret, use `npx serve` for static file serving (API routes at `/api/*` will not work, but demo data loads from localStorage).

### AI features

The AI analysis and video upload APIs require a Volcengine API key. The key is configured via the Settings page (stored in localStorage) or via environment variable for deployment. Without a valid API key, the app still functions for browsing pre-loaded demo data.
