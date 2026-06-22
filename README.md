<p align="right"><a href="./README.zh-CN.md">简体中文</a> | <a href="./README.md">English</a></p>

# OpenCut-ZHS

OpenCut-ZHS is a Chinese-focused maintenance fork of OpenCut Classic with Simplified Chinese as the default UI, ongoing localization for the website and editor, and baseline Web regression coverage.

## Preview

![OpenCut-ZHS preview](./apps/web/public/landing-page-dark.png)

## Positioning

- Simplified Chinese is the default language, with priority on Chinese-first usability
- The existing OpenCut Classic Web editing flow and project structure stay intact
- Visible copy, interaction hints, and key pages continue to be localized
- Playwright e2e coverage is added for core pages and editor flows

## Original Repository

This repository continues from the original [OpenCut-app/OpenCut-classic](https://github.com/OpenCut-app/OpenCut-classic) codebase, which is now archived.

The upstream rewrite is happening at [opencut-app/opencut](https://github.com/opencut-app/opencut).

Contributors shown by GitHub may include authors from the original archived repository history.

## Current Status

- Suitable for local preview, demos, and continued iteration with a Chinese UI
- Current work focuses on Web localization quality, baseline stability, and regression testing
- Desktop work and the lower-level Rust migration continue along the upstream direction

## Sponsors

Thanks to [Vercel](https://vercel.com?utm_source=github-opencut&utm_campaign=oss) and [fal.ai](https://fal.ai?utm_source=github-opencut&utm_campaign=oss) for supporting open-source software.

<a href="https://vercel.com/oss">
  <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge.svg" />
</a>

<a href="https://fal.ai">
  <img alt="Powered by fal.ai" src="https://img.shields.io/badge/Powered%20by-fal.ai-000000?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCAxMEwxMy4wOSAxNS43NEwxMiAyMkwxMC45MSAxNS43NEw0IDEwTDEwLjkxIDguMjZMMTIgMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" />
</a>

## Why?

- **Privacy**: Your videos stay on your device. Your media stays local during editing.
- **Free core features**: Most basic CapCut features are now paywalled, while a lightweight editor still covers common editing needs.
- **Simple workflow**: People want editors that are easy to use, and a familiar workflow lowers the learning curve.

## Project Structure

- `apps/web/`: Next.js web application for the browser-based editor and website
- `apps/desktop/`: Native desktop app built with GPUI, currently still in progress
- `rust/`: Platform-agnostic core including the GPU compositor, effects, masks, and WASM bindings. Business logic is gradually moving here from TypeScript
- `docs/`: Architecture and subsystem documentation

## Getting Started

This section keeps the setup commands in their original form so they can be copied directly.

### Prerequisites

- [Bun](https://bun.sh/docs/installation)
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

> **Note:** Docker is optional but recommended for running the local database and Redis. If you only want to work on frontend features, you can skip it.

### Setup

1. Fork and clone the repository.
2. Copy the environment file.

```bash
# Unix/Linux/Mac
cp apps/web/.env.example apps/web/.env.local

# Windows PowerShell
Copy-Item apps/web/.env.example apps/web/.env.local
```

3. Start the database and Redis.

```bash
docker compose up -d db redis serverless-redis-http
```

4. Install dependencies and start the dev server.

```bash
bun install
bun dev:web
```

The application will be available at [http://localhost:3000](http://localhost:3000).

The `.env.example` defaults match the Docker Compose config and should work out of the box.

### Desktop Setup

Desktop support is optional. Web-only contributors can skip this section.

If you want to prepare `apps/desktop`, see [`apps/desktop/README.md`](apps/desktop/README.md). The setup has two stages: Rust toolchain first, then native desktop dependencies.

### Local WASM Development

This section is only needed when editing `rust/wasm` and forcing the web app to use your local build instead of the published package.

**Prerequisites**: install these once before anything else.

```bash
# Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Build the WASM package
cargo install wasm-pack

# Rebuild on file changes, used by bun dev:wasm
cargo install cargo-watch
```

1. Build the package once from the repo root.

```bash
bun run build:wasm
```

2. Register the generated package for linking.

```bash
cd rust/wasm/pkg
bun link
```

3. Link `apps/web` to the local package.

```bash
cd apps/web
bun link opencut-wasm
```

4. Rebuild on changes while you work.

```bash
bun dev:wasm
```

To switch `apps/web` back to the published package, run:

```bash
cd apps/web
bun add opencut-wasm
```

### Self-Hosting with Docker

To run everything, including a production build of the app, in Docker:

```bash
docker compose up -d
```

The app will be available at [http://localhost:3100](http://localhost:3100).

## Contributing

We welcome contributions. The project is still evolving, and several areas are a good fit for focused improvements.

**Recommended focus areas**

- Timeline functionality and editing interactions
- Project management flows
- Performance improvements
- Bug fixes
- UI improvements outside the preview panel

**Current caution areas**

- Preview panel enhancements such as fonts, stickers, and effects
- Export-related functionality

These parts are being reworked around a newer binary rendering approach, so changes there benefit from extra coordination.

See the [Contributing Guide](.github/CONTRIBUTING.md) for detailed setup instructions, development guidelines, and a fuller description of the current focus areas.

**Quick start for contributors**

- Fork the repo and clone locally
- Follow the setup instructions in `CONTRIBUTING.md`
- If you work on `apps/desktop`, read [`apps/desktop/README.md`](apps/desktop/README.md)
- Create a feature branch and submit a PR

## License

This project is released under the [MIT License](LICENSE).

---

## Star History

![Star History Chart](https://api.star-history.com/svg?repos=opencut-app/opencut&type=Date)
