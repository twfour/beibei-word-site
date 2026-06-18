from __future__ import annotations

import json
import mimetypes
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent


class Handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        self.respond(send_body=True)

    def do_HEAD(self) -> None:
        self.respond(send_body=False)

    def respond(self, send_body: bool) -> None:
        path = unquote(urlsplit(self.path).path)
        if path == "/api/health":
            self.send_bytes(
                json.dumps({"ok": True, "service": "beibei-word-site"}).encode("utf-8"),
                "application/json; charset=utf-8",
                send_body,
            )
            return

        if path in {"/", "/index.html"}:
            self.send_file(ROOT / "index.html", "text/html; charset=utf-8", send_body)
            return

        candidate = (ROOT / path.lstrip("/")).resolve()
        if ROOT in candidate.parents and candidate.is_file():
            content_type, _ = mimetypes.guess_type(candidate.name)
            if content_type is None:
                content_type = "application/octet-stream"
            elif content_type.startswith("text/") or content_type in {
                "application/javascript",
                "application/json",
            }:
                content_type += "; charset=utf-8"
            self.send_file(candidate, content_type, send_body)
            return

        self.send_response(404)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        if send_body:
            self.wfile.write(b"Not found")

    def send_file(self, path: Path, content_type: str, send_body: bool) -> None:
        self.send_bytes(path.read_bytes(), content_type, send_body)

    def send_bytes(self, body: bytes, content_type: str, send_body: bool) -> None:
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if send_body:
            self.wfile.write(body)


def main() -> None:
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "10000"))
    server = ThreadingHTTPServer((host, port), Handler)
    print(f"Serving beibei-word-site on http://{host}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
