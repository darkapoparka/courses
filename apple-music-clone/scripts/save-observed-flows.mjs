import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const base=path.resolve('reference/originals');
const flows=JSON.parse(await fs.readFile(path.join(base,'browser-observed-flows.json'),'utf8'));
const jobs=[];
for(const flow of flows){
 const folder=`flows/${flow.id}`;
 await fs.mkdir(path.join(base,folder),{recursive:true});
 flow.images.forEach((image,i)=>jobs.push({flowId:flow.id,name:flow.name,step:i+1,url:image.src||image.current,file:`${folder}/${String(i+1).padStart(3,'0')}.webp`}));
 flow.videos.forEach((url,i)=>jobs.push({flowId:flow.id,name:flow.name,url,file:`${folder}/recording-${i+1}.mp4`}));
}
let next=0;
const results=[];
async function worker(){while(next<jobs.length){const job=jobs[next++];try{if(!job.url)throw new Error('No observed URL');const r=await fetch(job.url,{signal:AbortSignal.timeout(60000)});if(!r.ok)throw new Error(`HTTP ${r.status}`);const type=r.headers.get('content-type')||'';if(!/^(image|video)\//.test(type))throw new Error(`Unexpected content ${type}`);const bytes=Buffer.from(await r.arrayBuffer());await fs.writeFile(path.join(base,job.file),bytes);results.push({...job,bytes:bytes.length,contentType:type,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});}catch(error){results.push({...job,error:error.message});}if(results.length%50===0)console.log(`Saved ${results.length}/${jobs.length}`);}}
await Promise.all(Array.from({length:5},worker));
await fs.writeFile(path.join(base,'flow-download-manifest.json'),JSON.stringify({capturedAt:new Date().toISOString(),flowCount:flows.length,flows:flows.map(f=>({id:f.id,name:f.name,referenceUrl:`https://mobbin.com/flows/${f.id}`,screenCount:f.images.length,recordingCount:f.videos.length})),assets:results},null,2));
console.log(JSON.stringify({flows:flows.length,assets:results.length,failed:results.filter(r=>r.error).length,images:results.filter(r=>r.contentType?.startsWith('image/')).length,videos:results.filter(r=>r.contentType?.startsWith('video/')).length}));
