# Digital Artisan - Deployment Guide

This project is configured to run on **GitHub Pages** with the custom domain **mfaouzia.top**.

## Deployment Steps

1. **Push to GitHub:** Use the "Push to GitHub" button in Figma Make. This will handle the conversion of Figma assets and prepare the production build.
2. **GitHub Repository Settings:**
   - Go to your repository on GitHub.
   - Click on **Settings** > **Pages**.
   - Under **Build and deployment**, ensure the source is set to "Deploy from a branch".
   - Under **Custom domain**, enter `mfaouzia.top` and save (The `CNAME` file in the `public` folder already handles this, but it's good to verify).
   - Enable **Enforce HTTPS**.
3. **DNS Configuration:**
   Ensure your domain provider (where you bought `mfaouzia.top`) has the following records pointing to GitHub:

   **A Records:**
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

   **CNAME Record:**
   - Name: `www`
   - Value: `your-username.github.io`

## Technical Details

- **CNAME:** Located at `/CNAME` and `/public/CNAME`.
- **Jekyll Configuration:** Includes a `_config.yml` and `.nojekyll` to optimize GitHub Pages hosting and metadata.
- **SPA Routing:** Includes a custom `404.html` with a redirect script to handle React routing on static hosting.
- **SEO Metadata:** Managed dynamically in `App.tsx` via `useEffect`.
- **Assets:** Figma assets are automatically managed by the Figma Make pipeline.