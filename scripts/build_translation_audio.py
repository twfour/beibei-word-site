#!/usr/bin/env python3
"""Generate stable neural-voice MP3 files for translation exercises.

Run with an environment that provides edge-tts, for example:
    uvx --from edge-tts python scripts/build_translation_audio.py
"""

from __future__ import annotations

import argparse
import asyncio
import json
import re
from pathlib import Path

import edge_tts


ROOT = Path(__file__).resolve().parents[1]
APP_PATH = ROOT / "translation" / "app.js"
OUTPUT_DIR = ROOT / "translation" / "audio"


def exercises_by_date(source: str) -> dict[str, list[dict[str, object]]]:
    blocks: dict[str, list[dict[str, object]]] = {}
    for name, body in re.findall(
        r"const (november\d+Exercises) = \[(.*?)\n\];",
        source,
        re.S,
    ):
        exercises: list[dict[str, object]] = []
        for exercise_body in re.findall(r"^  \{\n(.*?)^  \}(?:,)?$", body, re.M | re.S):
            answer_match = re.search(
                r'^\s+answer:\s+("(?:\\.|[^"\\])*")',
                exercise_body,
                re.M,
            )
            vocabulary_match = re.search(
                r"^\s+vocabulary:\s*\[(.*?)^\s+\],",
                exercise_body,
                re.M | re.S,
            )
            if not answer_match or not vocabulary_match:
                continue
            words = [
                json.loads(value)
                for value in re.findall(
                    r'word:\s*("(?:\\.|[^"\\])*")',
                    vocabulary_match.group(1),
                )
            ]
            exercises.append({
                "answer": json.loads(answer_match.group(1)),
                "words": words,
            })
        blocks[name] = exercises

    result: dict[str, list[dict[str, object]]] = {}
    for date, name in re.findall(
        r'date:\s*"(\d{8})".*?exercises:\s*(november\d+Exercises)',
        source,
        re.S,
    ):
        if name in blocks:
            result[date] = blocks[name]
    return result


async def generate_one(
    semaphore: asyncio.Semaphore,
    text: str,
    output: Path,
    voice: str,
    rate: str,
    force: bool,
) -> str:
    if output.exists() and output.stat().st_size >= 1_024 and not force:
        return "reused"
    async with semaphore:
        temporary = output.with_suffix(".mp3.part")
        for attempt in range(1, 5):
            try:
                communicate = edge_tts.Communicate(text, voice=voice, rate=rate)
                await communicate.save(str(temporary))
                if temporary.stat().st_size < 1_024:
                    raise RuntimeError(f"Audio response is too small: {temporary}")
                temporary.replace(output)
                break
            except Exception:
                if attempt == 4:
                    raise
                await asyncio.sleep(attempt * 2)
    return "generated"


async def main_async(args: argparse.Namespace) -> None:
    source = APP_PATH.read_text(encoding="utf-8")
    issues = exercises_by_date(source)
    if args.date:
        missing = [date for date in args.date if date not in issues]
        if missing:
            raise SystemExit(f"No translation exercises found for: {', '.join(missing)}")
        issues = {date: issues[date] for date in args.date}

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    semaphore = asyncio.Semaphore(args.jobs)
    jobs: list[asyncio.Task[str]] = []
    sentence_jobs = 0
    word_jobs = 0
    for date, exercises in issues.items():
        for index, exercise in enumerate(exercises, start=1):
            output = OUTPUT_DIR / f"{date}-{index:02d}.mp3"
            jobs.append(asyncio.create_task(generate_one(
                semaphore,
                str(exercise["answer"]),
                output,
                args.voice,
                args.rate,
                args.force,
            )))
            sentence_jobs += 1
            for word_index, word in enumerate(exercise["words"], start=1):
                word_output = OUTPUT_DIR / f"{date}-{index:02d}-word-{word_index:02d}.mp3"
                jobs.append(asyncio.create_task(generate_one(
                    semaphore,
                    str(word),
                    word_output,
                    args.voice,
                    args.word_rate,
                    args.force,
                )))
                word_jobs += 1

    results = await asyncio.gather(*jobs)
    print(json.dumps({
        "voice": args.voice,
        "sentence_rate": args.rate,
        "word_rate": args.word_rate,
        "issues": len(issues),
        "audio_files": len(results),
        "sentence_files": sentence_jobs,
        "word_files": word_jobs,
        "generated": results.count("generated"),
        "reused": results.count("reused"),
    }, ensure_ascii=False, indent=2))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", action="append", help="Generate one YYYYMMDD issue; repeatable")
    parser.add_argument("--voice", default="en-US-JennyNeural")
    parser.add_argument("--rate", default="-5%")
    parser.add_argument("--word-rate", default="-8%")
    parser.add_argument("--jobs", type=int, default=2)
    parser.add_argument("--force", action="store_true")
    asyncio.run(main_async(parser.parse_args()))


if __name__ == "__main__":
    main()
