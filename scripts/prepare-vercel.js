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

  // Copy robots.txt if present
  const robotsSrc = path.join(distClient, 'robots.txt');
  if (fs.existsSync(robotsSrc)) {
    await fsp.copyFile(robotsSrc, path.join(outStatic, 'robots.txt'));
  }

  // Find client entry filenames
  let entryJs = null;
  let stylesCss = null;
  if (fs.existsSync(assetsSrc)) {
    const files = await fsp.readdir(assetsSrc);
    for (const f of files) {
      if (!entryJs && /^index-.*\.js$/.test(f)) entryJs = `/assets/${f}`;
      if (!stylesCss && /^styles-.*\.css$/.test(f)) stylesCss = `/assets/${f}`;
    }
  }

  // Fallback names if not found
  entryJs = entryJs || '/assets/index.js';
  stylesCss = stylesCss || '/assets/styles.css';

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
    <script type="module" src="${entryJs}"></script>
  </body>
</html>`;

  await fsp.writeFile(path.join(outStatic, 'index.html'), indexHtml, 'utf8');
  console.log('Prepared .vercel/output/static with client assets and index.html');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
