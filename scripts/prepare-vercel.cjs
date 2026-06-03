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

  // We intentionally DO NOT write a static index.html here.
  // Let the Nitro/Vercel server function handle SSR for the root path so
  // hydration bootstrap data (`window.$_TSR`) is injected correctly.
  console.log('Prepared .vercel/output/static with client assets (no index.html, SSR function will handle /)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
