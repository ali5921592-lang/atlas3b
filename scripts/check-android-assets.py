"""Verify web payloads survive Android packaging unchanged (Python 3)."""
import hashlib
import json
from pathlib import Path
import sys
import zipfile
import gzip

root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / 'dist/volume/manifest.json').read_text(encoding='utf-8'))
volume = root / 'dist' / manifest['file']
raw = gzip.decompress(volume.read_bytes())
assert len(raw) == manifest['uncompressedBytes'], 'Volume size mismatch'
assert hashlib.sha256(raw).hexdigest() == manifest['sha256'], 'Volume checksum mismatch'
packages = sys.argv[1:] or [
    'android/app/build/outputs/apk/debug/app-debug.apk',
    'android/app/build/outputs/bundle/release/app-release.aab',
]
for package in packages:
    path = root / package
    prefix = 'base/assets/public/' if path.suffix == '.aab' else 'assets/public/'
    with zipfile.ZipFile(path) as archive:
        for source in (root / 'dist').rglob('*'):
            if not source.is_file():
                continue
            name = prefix + source.relative_to(root / 'dist').as_posix()
            actual = archive.read(name)
            assert hashlib.sha256(actual).digest() == hashlib.sha256(source.read_bytes()).digest(), name
    print(f'PASS {path.name}: all web assets byte-identical; volume gzip and SHA-256 verified')
