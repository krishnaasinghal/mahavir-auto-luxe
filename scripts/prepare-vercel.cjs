const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

async function main() {
  const root = path.resolve(__dirname, '..');
  const distClient = path.join(root, 'dist', 'client');
  const outStatic = path.join(root, '.vercel', 'output', 'static');

  await fsp.mkdir(outStatic, { recursive: true });

  // Ensure no static index.html remains from previous builds —
  // a present index.html in .vercel/output/static will cause Vercel
  // to serve static content for `/` and bypass the server function.
  try {
    const indexPath = path.join(outStatic, 'index.html');
    if (fs.existsSync(indexPath)) {
      await fsp.unlink(indexPath);
      console.log('Removed leftover .vercel/output/static/index.html');
    }
  } catch (err) {
    // non-fatal
    console.warn('Could not remove existing index.html', err);
  }

  // Copy assets
  const assetsSrc = path.join(distClient, 'assets');
  const assetsDest = path.join(outStatic, 'assets');
  if (fs.existsSync(assetsSrc)) {
    await fsp.rm(assetsDest, { recursive: true, force: true });
    await fsp.mkdir(assetsDest, { recursive: true });
    const files = await fsp.readdir(assetsSrc);
    for (const file of files) {
      await fsp.copyFile(path.join(assetsSrc, file), path.join(assetsDest, file));
    }
  }

  // Patch the client entry to ensure a runtime fallback for window.$_TSR
  // so hydration doesn't throw when served as static HTML.
  try {
    const assetFiles = await fsp.readdir(assetsDest);
    const entryFile = assetFiles.find((f) => /^index-.*\.js$/.test(f));
    if (entryFile) {
      const entryPath = path.join(assetsDest, entryFile);
      const content = await fsp.readFile(entryPath, 'utf8');
      const prepend = `(function(){try{if(typeof window!=='undefined'&&!window.$_TSR){window.$_TSR={router:{matches:[],lastMatchId:null,manifest:{}},t:new Map(),buffer:[],initialized:true};window.$_TSR.h = window.$_TSR.h || function(){};window.$_TSR.buffer.forEach = window.$_TSR.buffer.forEach || function(fn){for(var i=0;i<this.length;i++)fn(this[i])};} }catch(e){};})();\n`;
      await fsp.writeFile(entryPath, prepend + content, 'utf8');
      // Also replace copied file in outStatic assets
      await fsp.writeFile(path.join(outStatic, 'assets', entryFile), prepend + content, 'utf8');
    }
  } catch (err) {
    // non-fatal; best-effort patch
    console.warn('Could not patch client entry for TSR fallback', err);
  }

  // Copy robots.txt if present
  const robotsSrc = path.join(distClient, 'robots.txt');
  if (fs.existsSync(robotsSrc)) {
    await fsp.copyFile(robotsSrc, path.join(outStatic, 'robots.txt'));
  }

  // We intentionally DO NOT write a static index.html here.
  // Let the Nitro/Vercel server function handle SSR for the root path so
  // hydration bootstrap data (`window.$_TSR`) is injected correctly.
  // However, some deployment paths (or local static previews) may still
  // serve a static `index.html`. To avoid the client throwing during
  // hydration when SSR bootstrap data is absent, write a minimal
  // `index.html` that provides a safe `window.$_TSR` fallback before
  // loading the client script.
  let entryJs = '/assets/index-DyRL4z79.js';
  let stylesCss = '/assets/styles-FKDaclx_.css';
  if (fs.existsSync(assetsSrc)) {
    const files = await fsp.readdir(assetsSrc);
    for (const f of files) {
      if (!entryJs && /^index-.*\.js$/.test(f)) entryJs = `/assets/${f}`;
      if (!stylesCss && /^styles-.*\.css$/.test(f)) stylesCss = `/assets/${f}`;
    }
  }

  // We do NOT write a static `index.html` fallback here anymore.
  // Serving a static `index.html` causes Vercel to return static content
  // for `/` and bypass the server function (which injects SSR bootstrap).
  // Keep only static assets in `.vercel/output/static` so the server
  // function handles root requests and provides correct SSR bootstrap.
  console.log('Prepared .vercel/output/static with client assets (no index.html)');

  // NOTE: Do NOT overwrite the Nitro-generated index.mjs in the function directory.
  // Nitro's vercel preset already generates a correct entry point that imports
  // the proper server bundle (e.g. ./assets/server-*.js). Overwriting it with
  // a custom wrapper causes ERR_MODULE_NOT_FOUND errors on Vercel.
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
