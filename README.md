# GasPlus Website

The GasPlus website is built with React, TypeScript, Vite, and Tailwind CSS.

## Prerequisites

- Node.js 22.13+ (22.x), or Node.js 24+.
- npm (included with Node.js).

## Run locally

```bash
cd gasplus-website
npm ci
```

If your terminal is already in `gasplus-website`, skip the `cd` command. Run all remaining commands from this directory.

Start the development server:

```bash
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173). Vite reloads the page as you edit source files. Press `Ctrl+C` to stop the server.

## Contact form configuration

The website can run without service credentials, but contact submissions and image uploads need Formspree and Cloudinary configuration. Create a `.env.local` file in `gasplus-website` with your service values:

```dotenv
VITE_FORMSPREE_ID=your_formspree_form_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

Use the form ID from your Formspree endpoint and an unsigned Cloudinary upload preset. Restart the development server after changing environment variables. Vite exposes `VITE_` values to the browser, so do not put API secrets in these variables.

## Build and preview

Create a production build:

```bash
npm run build
```

The build runs TypeScript checks and writes the website to `dist/`. Preview the built website locally:

```bash
npm run preview
```

Open the URL printed in the terminal (usually http://localhost:4173). Rebuild after source changes to update the preview.

## Lint

```bash
npm run lint
```
