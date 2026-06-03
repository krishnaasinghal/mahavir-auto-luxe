const CANDIDATES = [
  './dist-server.js',
  './server.js',
  './dist/server/server.js',
  './dist/server.js',
  './index.js'
];

async function tryImportCandidates() {
  let lastErr;
  for (const p of CANDIDATES) {
    try {
      const mod = await import(p);
      return mod?.default ?? mod;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr ?? new Error('No server entry found');
}

export default {
  async fetch(req, context) {
    try {
      const handler = await tryImportCandidates();
      if (!handler || typeof handler.fetch !== 'function') {
        return new Response(JSON.stringify({ error: true, message: 'Server handler not found' }), { status: 500, headers: { 'content-type': 'application/json; charset=utf-8' } });
      }
      return await handler.fetch(req, undefined, context);
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: true, message: String(err) }), { status: 500, headers: { 'content-type': 'application/json; charset=utf-8' } });
    }
  }
};