"""Strict full-corpus pixel diagnostics and a local review gallery; never sign-off."""
from __future__ import annotations
import argparse
from hashlib import sha256
from html import escape
import json
from pathlib import Path
import numpy as np
from PIL import Image
from qa_identity import APP, reference_viewport


def pixel_metrics(reference, candidate):
    if reference.size != candidate.size:
        raise ValueError(f'Dimension mismatch: {reference.size} != {candidate.size}')
    difference = np.abs(np.asarray(reference.convert('RGB'), dtype=np.int16) - np.asarray(candidate.convert('RGB'), dtype=np.int16))
    return {'mae': float(difference.mean()), 'over20Percent': float((difference.max(axis=2) > 20).mean() * 100)}, difference


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', type=Path, default=APP / '.parity-evidence/browser')
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--baseline', type=Path, help='Previous metrics.json; report changes without manufacturing acceptance.')
    args = parser.parse_args()
    args.input, args.output = args.input.resolve(), args.output.resolve()
    if not args.output.is_relative_to((APP / '.parity-evidence').resolve()):
        raise ValueError('Comparison output must stay inside .parity-evidence.')
    if args.output.exists() and any(args.output.iterdir()):
        raise ValueError(f'Refusing to overwrite existing evidence: {args.output}')
    results = json.loads((args.input / 'results.json').read_text(encoding='utf-8'))
    archive = json.loads((APP / 'reference/originals/flow-screen-map.json').read_text(encoding='utf-8'))
    ids = sorted({step['screenId'] for flow in archive['flows'] for step in flow['steps']})
    if len(ids) != 159:
        raise ValueError('The frozen corpus must contain 159 identities.')
    if any(results['candidate'][key] != results['candidateAfter'][key] for key in ('implementationSha256', 'toolingSha256') if key in results['candidate']):
        raise ValueError('Candidate source changed during capture; do not compare mixed evidence.')
    desktop = {row['screen']: row for row in results['screens'] if row['width'] == 1440}
    if len(desktop) != len(ids) or set(desktop) != set(ids):
        raise ValueError('Comparison requires exactly all 159 canonical desktop captures.')
    if any(row['status'] != 'pass' for row in desktop.values()):
        raise ValueError('Fix failed desktop captures before comparing.')
    previous = {}
    if args.baseline:
        baseline = json.loads(args.baseline.read_text(encoding='utf-8'))
        if baseline['browser'] != results['browser'] or baseline['candidate']['platform'] != results['candidate']['platform']:
            raise ValueError('Baseline browser or operating system differs; recapture under the same conditions.')
        previous = {row['screen']: row for row in baseline['screens']}
        if set(previous) != set(ids):
            raise ValueError('Baseline does not cover the same corpus.')
    args.output.mkdir(parents=True)
    rows, cards = [], []
    for sid in ids:
        original_path = APP / 'reference/originals' / f'{sid}.webp'
        render_path = args.input / f'{sid}-1440.png'
        expected = reference_viewport(sid)
        width, height = expected['width'], expected['height']
        row = desktop[sid]
        if (row['width'], row['height']) != (width, height):
            raise ValueError(f'{sid}: capture used the wrong source viewport.')
        render_hash = sha256(render_path.read_bytes()).hexdigest()
        if row.get('renderSha256') != render_hash:
            raise ValueError(f'{sid}: screenshot hash does not match capture evidence.')
        with Image.open(original_path) as original, Image.open(render_path) as render:
            reference = original.convert('RGB').crop((0, 0, width, height))
            metrics, difference = pixel_metrics(reference, render)
            reference.save(args.output / f'{sid}-source.png')
            render.save(args.output / f'{sid}-render.png')
            Image.fromarray(np.minimum(difference * 4, 255).astype(np.uint8)).save(args.output / f'{sid}-difference.png')
        entry = {'screen': sid, 'viewport': expected, 'sourceSha256': sha256(original_path.read_bytes()).hexdigest(), 'renderSha256': render_hash,
                 'crop': [0, 0, width, height], 'excluded': '120px acquisition footer only', **metrics}
        if previous:
            old = previous[sid]
            if old['sourceSha256'] != entry['sourceSha256'] or old['viewport'] != expected:
                raise ValueError(f'{sid}: baseline source or viewport changed.')
            entry['deltaMae'] = metrics['mae'] - old['mae']
            entry['deltaOver20Percent'] = metrics['over20Percent'] - old['over20Percent']
        rows.append(entry)
    rows.sort(key=lambda row: row['over20Percent'], reverse=True)
    report = {'candidate': results.get('candidate'), 'browser': results['browser'], 'baseUrl': results.get('baseUrl'),
              'note': 'Pixel diagnostics, not visual acceptance. Inspect geometry, copy, artwork and live behavior. No product masks or resizing.',
              'functionalFailures': [row for row in results['tests'] if row['status'] != 'pass'], 'screens': rows}
    (args.output / 'metrics.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    for row in rows:
        sid = row['screen']
        label = f"{sid[:8]} | >20: {row['over20Percent']:.2f}% | MAE: {row['mae']:.2f}"
        cards.append(f'<section id="{sid}"><h2>{escape(label)}</h2><div class="pair"><figure><figcaption>Saved source (footer excluded)</figcaption><a href="{sid}-source.png"><img loading="lazy" src="{sid}-source.png"></a></figure><figure><figcaption>Actual browser render</figcaption><a href="{sid}-render.png"><img loading="lazy" src="{sid}-render.png"></a></figure></div><details><summary>Difference, amplified 4×</summary><img loading="lazy" src="{sid}-difference.png"></details></section>')
    html = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="robots" content="noindex"><title>Reference diagnostics</title><style>body{font:16px system-ui;margin:24px}section{border-top:1px solid;padding:16px 0}.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}figure{margin:0}img{width:100%;height:auto}h2{font-size:18px}figcaption{padding:8px 0}</style><h1>All 159 reference comparisons</h1><p>Local review evidence only. Ranked by residual; numerical similarity is not sign-off. Click images for full resolution.</p>' + ''.join(cards) + '</html>'
    (args.output / 'index.html').write_text(html, encoding='utf-8')
    for row in rows[:15]:
        print(f"{row['screen'][:8]} >20={row['over20Percent']:.2f}% MAE={row['mae']:.2f}")
    print(f"Compared {len(rows)} exact-size states. Gallery: {args.output / 'index.html'}")


if __name__ == '__main__':
    main()
