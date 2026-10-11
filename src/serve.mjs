// Tiny local preview server (no dependencies). Run: npm run serve
// Then open http://localhost:8080 in your browser.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../_site/", import.meta.url));
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2",
  ".ico": "image/x-icon", ".xml": "application/xml", ".txt": "text/plain", ".webmanifest": "application/manifest+json" };
const PORT = Number(process.env.PORT) || 8080;

createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(ROOT, path);
  try {
    if ((await stat(file)).isDirectory()) {
      if (!path.endsWith("/")) { res.writeHead(301, { Location: path + "/" }); return res.end(); }
      file = join(file, "index.html");
    }
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { "Content-Type": TYPES[".html"] });
    res.end(await readFile(join(ROOT, "404.html")));
  }
}).listen(PORT, () => console.log(`Preview: http://localhost:${PORT}  (Ctrl+C to stop)`));
