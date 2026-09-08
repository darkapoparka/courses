import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve('reference/originals');
const screens = JSON.parse(await fs.readFile(path.join(root, 'browser-observed-screens.json'), 'utf8'));
const results = [];
let next = 0;
async function download(url, filename) {
  const response = await fetch(url, {signal: AbortSignal.timeout(45000)});
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const type = response.headers.get('content-type') || '';
  if (!/^(image|video)\//.test(type)) throw new Error(`Unexpected type: ${type}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(path.join(root, filename), bytes);
  return {file:filename, contentType:type, bytes:bytes.length, sha256:crypto.createHash('sha256').update(bytes).digest('hex'), sourceUrl:url};
}
async function worker() {
  while (next < screens.length) {
    const screen = screens[next++];
    const result = {screenId:screen.id, referenceUrl:screen.href, assets:[], errors:[]};
    const imageUrl = screen.images[0]?.src || screen.images[0]?.url;
    try { if (imageUrl) result.assets.push(await download(imageUrl, `${screen.id}.webp`)); else result.errors.push('No observed image URL'); }
    catch(error) { result.errors.push(`Image: ${error.message}`); }
    for (let i=0; i<screen.videos.length; i++) {
      try {result.assets.push(await download(screen.videos[i], `${screen.id}${i ? `-${i+1}` : ''}.mp4`));}
      catch(error) {result.errors.push(`Video: ${error.message}`);}
    }
    results.push(result);
    await fs.writeFile(path.join(root, 'download-manifest.json'), JSON.stringify({collectionUrl:'https://mobbin.com/apps/apple-music-web-a579a953-80de-4465-a2a6-99248e5c0e4f/b4378d66-a019-5876-aac6-85e67834d54f/screens',capturedAt:new Date().toISOString(),expectedScreens:screens.length,completed:results.length,screens:results},null,2));
    if(results.length % 20 === 0 || result.errors.length) console.log(JSON.stringify({completed:results.length,id:screen.id,errors:result.errors}));
  }
}
await Promise.all(Array.from({length:5},worker));
await fs.writeFile(path.join(root, 'download-manifest.json'), JSON.stringify({collectionUrl:'https://mobbin.com/apps/apple-music-web-a579a953-80de-4465-a2a6-99248e5c0e4f/b4378d66-a019-5876-aac6-85e67834d54f/screens',capturedAt:new Date().toISOString(),expectedScreens:screens.length,completed:results.length,screens:results},null,2));
console.log(JSON.stringify({screens:results.length,images:results.filter(r=>r.assets.some(a=>a.contentType.startsWith('image/'))).length,videos:results.flatMap(r=>r.assets).filter(a=>a.contentType.startsWith('video/')).length,failed:results.filter(r=>r.errors.length).length}));
