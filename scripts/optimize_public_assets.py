#!/usr/bin/env python3
import os
import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
OUTPUT_DIR = ROOT / "public_2"

TEXT_EXTS = {
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".md",
    ".mdx",
    ".html",
    ".css",
    ".scss",
    ".sass",
    ".json",
    ".mjs",
    ".cjs",
    ".yml",
    ".yaml",
}

ASSET_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"}

SKIP_DIRS = {
    "node_modules",
    ".git",
    ".next",
    "out",
    "public_2",
}


def iter_text_files(root: Path):
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in filenames:
            if Path(name).suffix.lower() in TEXT_EXTS:
                yield Path(dirpath) / name


def read_all_text(root: Path) -> str:
    chunks = []
    for path in iter_text_files(root):
        try:
            chunks.append(path.read_text(encoding="utf-8", errors="ignore"))
        except Exception:
            continue
    return "\n".join(chunks)


def iter_assets(public_dir: Path):
    for dirpath, _, filenames in os.walk(public_dir):
        for name in filenames:
            if Path(name).suffix.lower() in ASSET_EXTS:
                yield Path(dirpath) / name


def convert_pngs(public_dir: Path, output_dir: Path):
    converted = []
    for path in iter_assets(public_dir):
        if path.suffix.lower() != ".png":
            continue
        rel = path.relative_to(public_dir)
        out_path = output_dir / rel.with_suffix(".webp")
        out_path.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(path) as img:
            img.save(out_path, "WEBP", quality=85, method=6)
        converted.append(out_path)
    return converted


def find_unused_assets(public_dir: Path, all_text: str):
    unused = []
    for path in iter_assets(public_dir):
        rel = path.relative_to(public_dir).as_posix()
        filename = path.name
        patterns = [
            f"/{rel}",
            rel,
            filename,
        ]
        if not any(p in all_text for p in patterns):
            unused.append(rel)
    return sorted(unused)


def main() -> int:
    if not PUBLIC_DIR.exists():
        print(f"public folder not found at {PUBLIC_DIR}")
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    all_text = read_all_text(ROOT)
    unused = find_unused_assets(PUBLIC_DIR, all_text)
    converted = convert_pngs(PUBLIC_DIR, OUTPUT_DIR)

    print(f"Converted {len(converted)} PNG files to WEBP in {OUTPUT_DIR}")
    print("")
    print("Possibly unused graphics (heuristic; filename/path search):")
    if unused:
        for rel in unused:
            print(f"- {rel}")
    else:
        print("- None")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
