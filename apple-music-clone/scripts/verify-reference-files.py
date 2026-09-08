from pathlib import Path
from PIL import Image
import json, re, html

root = Path('reference/originals')
dimensions, bad = [], []
for file in root.rglob('*.webp'):
    try:
        with Image.open(file) as image:
            dimensions.append(dict(file=file.relative_to(root).as_posix(), width=image.width, height=image.height))
            image.verify()
    except Exception as error:
        bad.append(dict(file=str(file), error=str(error)))
flows = json.loads((root/'browser-observed-flows.json').read_text())
screens = json.loads((root/'browser-observed-screens.json').read_text())
mismatches = []
for flow in flows:
    count = re.search(r'(\d+) screens', flow['text'])
    if count and int(count.group(1)) != len(flow['images']):
        mismatches.append(dict(name=flow['name'], expected=int(count.group(1)), found=len(flow['images'])))
expected_ids = set(re.findall(r'[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}',Path('lib/reference.ts').read_text().split('export const screenIds = [',1)[1].split('] as const',1)[0]))
local_ids = {file.stem for file in root.glob('*.webp')}
video_files = list(root.rglob('*.mp4'))
bad_videos = [str(file) for file in video_files if b'ftyp' not in file.read_bytes()[:32]]
summary = dict(validImages=len(dimensions),badImages=bad,screenFiles=len(local_ids),missingScreenIds=sorted(expected_ids-local_ids),flowCount=len(flows),flowCountMismatches=mismatches,recordings=len(video_files),invalidVideoHeaders=bad_videos,megabytes=round(sum(file.stat().st_size for file in root.rglob('*') if file.is_file())/1048576,1))
(root/'all-image-dimensions.json').write_text(json.dumps(dimensions,indent=2))
(root/'verification.json').write_text(json.dumps(summary,indent=2))
page = ['<!doctype html><meta charset="utf-8"><title>Apple Music Mobbin references</title><style>body{font:16px system-ui;background:#eee;color:#111;margin:32px}nav{display:flex;gap:20px}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px}figure{margin:0;background:white;padding:12px}img{width:100%;height:auto}figcaption{font-size:12px;overflow-wrap:anywhere}summary{cursor:pointer;padding:16px;background:white;margin-top:12px}.steps{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:12px}video{max-width:100%}</style><h1>Apple Music reference files</h1><p>159 screens · 58 flows. Downloaded from browser-observed Mobbin assets. Source watermarks are preserved. This is the reference library, not the implemented clone.</p><nav><a href="#screens">Screens</a><a href="#flows">Flows</a></nav><h2 id="screens">Screens</h2><main>']
for number,screen in enumerate(screens,1):
    sid=screen['id']
    page.append(f'<figure><a href="{sid}.webp"><img loading="lazy" src="{sid}.webp"></a><figcaption>{number}. <a href="{html.escape(screen["href"])}">{sid}</a></figcaption></figure>')
page.append('</main><h2 id="flows">Flows</h2>')
for flow in flows:
    folder=f'flows/{flow["id"]}'
    page.append(f'<details><summary>{html.escape(flow["name"])} — {len(flow["images"])} screens</summary><a href="https://mobbin.com/flows/{flow["id"]}">Mobbin flow</a>')
    for i,_ in enumerate(flow['videos'],1):
        page.append(f'<video controls preload="none" src="{folder}/recording-{i}.mp4"></video>')
    page.append('<div class="steps">')
    for i,_ in enumerate(flow['images'],1):
        page.append(f'<figure><a href="{folder}/{i:03}.webp"><img loading="lazy" src="{folder}/{i:03}.webp"></a><figcaption>Step {i}</figcaption></figure>')
    page.append('</div></details>')
(root/'index.html').write_text('\n'.join(page),encoding='utf-8')
print(json.dumps(summary))
