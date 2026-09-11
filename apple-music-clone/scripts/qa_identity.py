"""Read-only candidate identity for reproducible local and CI evidence."""
from datetime import datetime, timezone
from hashlib import sha256
from pathlib import Path
import platform
import subprocess

APP = Path(__file__).resolve().parents[1]

def git(*args):
    return subprocess.check_output(['git', *args], cwd=APP).decode('utf-8').strip()

def candidate_identity():
    # Include new implementation files, but never scratch output or secrets.
    names = git('ls-files', '--cached', '--others', '--exclude-standard').splitlines()
    prefixes = ('app/', 'components/', 'lib/', 'public/')
    configs = {'package.json', 'pnpm-lock.yaml', 'next.config.ts', 'tsconfig.json', 'postcss.config.mjs'}
    digest = sha256()
    for name in sorted(set(names)):
        if not (name.startswith(prefixes) or name in configs):
            continue
        path = APP / name
        digest.update(name.encode() + b'\0')
        digest.update(path.read_bytes() if path.is_file() else b'<deleted>')
    tooling = sha256()
    for name in sorted(set(names)):
        if name.startswith('scripts/') and Path(name).suffix in ('.py', '.mjs', '.txt', '.json'):
            path = APP / name
            tooling.update(name.encode() + b'\0')
            tooling.update(path.read_bytes() if path.is_file() else b'<deleted>')
    return {'toolingSha256': tooling.hexdigest(), 'commit': git('rev-parse', 'HEAD'), 'branch': git('branch', '--show-current'),
            'implementationSha256': digest.hexdigest(), 'workingTree': git('status', '--porcelain'),
            'capturedAt': datetime.now(timezone.utc).isoformat(),
            'platform': platform.platform(), 'python': platform.python_version()}


def reference_viewport(screen_id):
    from PIL import Image
    with Image.open(APP / 'reference/originals' / f'{screen_id}.webp') as image:
        if image.width != 1440 or image.height not in (1023, 1024):
            raise ValueError(f'Unreviewed reference dimensions: {screen_id} {image.size}')
        # The preserved acquisition footer is 120px; never mask application UI.
        return {'width': image.width, 'height': image.height - 120}
