import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distClientDir = resolve(rootDir, "dist", "client");
const distServerDir = resolve(rootDir, "dist", "server");
const vercelOutDir = resolve(rootDir, ".vercel", "output");
const vercelStaticDir = resolve(vercelOutDir, "static");
const vercelFuncDir = resolve(vercelOutDir, "functions", "__server.func");

await rm(vercelStaticDir, { recursive: true, force: true });
await rm(vercelFuncDir, { recursive: true, force: true });
await mkdir(vercelStaticDir, { recursive: true });
await mkdir(vercelFuncDir, { recursive: true });

await cp(distClientDir, vercelStaticDir, { recursive: true });
await cp(distServerDir, vercelFuncDir, { recursive: true });

const configPath = resolve(vercelOutDir, "config.json");
const config = {
  version: 3,
  routes: [
    {
      src: "/assets/(.*)",
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },
    { handle: "filesystem" },
    { src: "/(.*)", dest: "/__server" },
  ],
};

await mkdir(vercelOutDir, { recursive: true });
await writeFile(configPath, JSON.stringify(config, null, 2));
