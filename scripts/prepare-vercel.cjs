const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

async function main() {
  const root = path.resolve(__dirname, '..');
  const distClient = path.join(root, 'dist', 'client');
  const outStatic = path.join(root, '.vercel', 'output', 'static');

  await fsp.mkdir(outStatic, { recursive: true });

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

  const safeBootstrap = `
  <script>
    // Provide a minimal window.$_TSR so client hydration won't throw
    // if the server did not render SSR bootstrap data. This makes the
    // client fall back to SPA-mode hydration safely.
    window.$_TSR = window.$_TSR || { router: { matches: [], lastMatchId: null, manifest: {} }, t: {}, buffer: [], initialized: true };
  </script>`;

  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mahavir Seat Industries</title>
    <link rel="stylesheet" href="${stylesCss}" />
  </head>
  <body>
    <div id="root"></div>
    ${safeBootstrap}
    <script type="module" src="${entryJs}"></script>
  </body>
</html>`;

  await fsp.writeFile(path.join(outStatic, 'index.html'), indexHtml, 'utf8');
  console.log('Prepared .vercel/output/static with client assets and safe index.html fallback');

  // Also copy server entry so the Vercel function can delegate to the Vite SSR handler.
  try {
    const distServer = path.join(root, 'dist', 'server', 'server.js');
    const funcDir = path.join(root, '.vercel', 'output', 'functions', '__server.func');
    if (fs.existsSync(distServer) && fs.existsSync(funcDir)) {
      await fsp.copyFile(distServer, path.join(funcDir, 'dist-server.js'));

      // Write a small wrapper that dynamically imports the copied server and delegates fetch
      const wrapper = `export default {
  async fetch(req, context) {
    try {
      const entry = await import('./dist-server.js');
      const handler = entry?.default ?? entry;
      if (!handler || typeof handler.fetch !== 'function') {
        return new Response(JSON.stringify({ error: true, message: 'Server handler not found' }), { status: 500, headers: { 'content-type': 'application/json; charset=utf-8' } });
      }
      return await handler.fetch(req, undefined, context);
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: true, message: String(err) }), { status: 500, headers: { 'content-type': 'application/json; charset=utf-8' } });
    }
  }
};`;
      await fsp.writeFile(path.join(funcDir, 'index.mjs'), wrapper, 'utf8');
      console.log('Patched Vercel function to delegate to dist/server/server.js');
    }
  } catch (err) {
    console.warn('Could not patch server function automatically', err);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
