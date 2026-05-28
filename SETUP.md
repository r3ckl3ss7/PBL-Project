# DriveGuard AI — Run in VS Code

Real-time, in-browser driver safety monitoring (MediaPipe FaceLandmarker +
TanStack Start + React + Tailwind v4).

## 1. Install prerequisites

| Tool | Why | Install |
|------|-----|---------|
| **Node.js 20+** | JS runtime | https://nodejs.org |
| **Bun** | Package manager + dev server | macOS/Linux: `curl -fsSL https://bun.sh/install \| bash` · Windows: `powershell -c "irm bun.sh/install.ps1 \| iex"` |
| **VS Code** | Editor | https://code.visualstudio.com |

Recommended VS Code extensions:
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)

> Bun is preferred (matches `bun.lock`). If you can't install Bun, `npm install` and `npm run dev` work too — Node will use `package.json` instead.

## 2. Open the project

```bash
# extract the zip first, then:
cd driveguard-ai
code .
```

## 3. Install dependencies

```bash
bun install
```
(or `npm install` / `pnpm install` / `yarn install`)

## 4. Run the dev server

```bash
bun run dev
```

Open the URL it prints (typically `http://localhost:3000` or `http://localhost:8080`) in **Chrome, Edge, or any Chromium browser**. Firefox/Safari may work but are less reliable for MediaPipe + WebGL.

Click **Start Monitoring** → allow camera access → the AI begins analyzing your face in real time.

## 5. Production build (optional)

```bash
bun run build      # outputs to .output/
bun run start      # serves the production build
```

## Important notes

- **Camera + MediaPipe require `http://localhost` or HTTPS.** Opening the built `index.html` from the filesystem (`file://`) will NOT work — browsers block `getUserMedia` and dynamic ES module CDN imports there.
- **First run downloads the MediaPipe model** (~3 MB) from Google's CDN. You need an internet connection on first launch.
- **Performance:** runs best on a machine with a GPU. The hook requests the GPU delegate; it falls back to CPU automatically.
- **Privacy:** all video processing happens locally in your browser. No frames are uploaded.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `bun: command not found` | Re-open your terminal after install, or use `npm install` / `npm run dev` |
| Black camera box | Check OS camera permissions for your browser |
| `Failed to fetch dynamically imported module` | Check internet connection — MediaPipe loads from jsDelivr CDN |
| Port already in use | Edit `vite.config.ts` or kill the other process |
| Type errors after editing routes | Restart the dev server — `src/routeTree.gen.ts` is auto-regenerated |

## Project layout (quick reference)

```
src/
├── routes/                     pages (file-based routing)
│   ├── __root.tsx              HTML shell + metadata
│   └── index.tsx               main dashboard
├── hooks/
│   └── use-driver-monitor.ts   MediaPipe + webcam + EAR/MAR/head-pose
├── lib/driveguard/
│   ├── types.ts                FrameMetrics, SafetyEvent, RiskLevel
│   └── alerts.ts               voice (SpeechSynthesis) + alarm (WebAudio)
├── components/ui/              shadcn primitives
└── styles.css                  Tailwind v4 + design tokens
```
