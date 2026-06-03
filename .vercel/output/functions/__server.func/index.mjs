export default {
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
};