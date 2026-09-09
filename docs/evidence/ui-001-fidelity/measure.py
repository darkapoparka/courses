"""Compare disclosed common UI regions, not differing course/music artwork.
Run on the connected computer: python docs/evidence/ui-001-fidelity/measure.py
Requires the local review environment's Pillow and NumPy; no app dependency.
"""
from pathlib import Path
from PIL import Image
import hashlib
import json
import numpy as np
folder = Path(__file__).resolve().parent
root = folder.parents[2]
source = root / 'apple-music-clone/reference/originals/high-resolution/a917d88f-d15a-4f53-92d3-1daecf59d05f.webp'
reference = np.asarray(Image.open(source).convert('RGB').resize((1440, 960), Image.Resampling.LANCZOS), dtype=float)[:903]
regions = {'home_heading': [282, 25, 402, 75], 'shared_shelf_heading': [282, 103, 438, 132], 'shared_navigation': [20, 80, 110, 148], 'rail_surface_and_shadow': [0, 670, 275, 780], 'canvas': [850, 20, 1180, 96]}
report = {'source': str(source.relative_to(root)), 'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'normalization': '3024 x 2016 to 1440 x 960, Lanczos; app comparison is top 903 pixels', 'limitations': 'Only listed common UI regions are scored. Not a whole-page fidelity percentage; artwork, branding, content, navigation availability, player, and mobile differ.', 'regions': {}}
for name, (left, top, right, bottom) in regions.items():
    result = {'rectangle': [left, top, right, bottom], 'pixels': (right-left)*(bottom-top)}
    for state, file in [('before', 'before-desktop.png'), ('after', 'desktop-reference-size.png')]:
        actual = np.asarray(Image.open(folder / file).convert('RGB'), dtype=float)
        difference = np.abs(reference[top:bottom, left:right] - actual[top:bottom, left:right])
        result[state] = {'mean_absolute_rgb_error_0_to_255': round(float(difference.mean()), 4), 'pixels_over_12_channel_levels_percent': round(float((difference.max(axis=2) > 12).mean()) * 100, 3)}
    report['regions'][name] = result
(folder / 'pixel-measurements.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report, indent=2))
