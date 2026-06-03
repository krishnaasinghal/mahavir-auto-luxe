#!/usr/bin/env node
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { SourceMapConsumer } = require('source-map');

async function main() {
  const [,, mapPath, lineStr, colStr] = process.argv;
  if (!mapPath || !lineStr || !colStr) {
    console.error('Usage: node map-stack.cjs <path-to-map> <line> <column>');
    process.exit(2);
  }
  const abs = resolve(process.cwd(), mapPath);
  const map = JSON.parse(readFileSync(abs, 'utf8'));
  const line = parseInt(lineStr, 10);
  const column = parseInt(colStr, 10);
  const consumer = await new SourceMapConsumer(map);
  const pos = consumer.originalPositionFor({ line, column });
  console.log('Mapped position:', pos);
  consumer.destroy();
}

main().catch((e) => { console.error(e); process.exit(1); });
