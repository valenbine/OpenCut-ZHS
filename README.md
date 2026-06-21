# OpenCut-ZHS

OpenCut-ZHS 是一个面向中文用户的 OpenCut Classic 维护分支，提供默认简体中文界面、持续补齐的站点与编辑器汉化，以及基础可回归的 Web 端测试。

OpenCut-ZHS is a Chinese-focused maintenance fork of OpenCut Classic with Simplified Chinese as the default UI, ongoing localization for the website and editor, and baseline Web regression coverage.

## 项目定位 | Positioning

- 默认语言为简体中文，优先优化中文用户的上手体验
- 保留 OpenCut Classic 的 Web 编辑能力与现有工程结构
- 持续补齐可见文案、交互提示和关键页面的中文化
- 为主要页面与编辑器链路补充 Playwright e2e 回归
- Simplified Chinese is the default language, with priority on Chinese-first usability
- The existing OpenCut Classic Web editing flow and project structure stay intact
- Visible copy, interaction hints, and key pages continue to be localized
- Playwright e2e coverage is added for core pages and editor flows

## 原仓库 | Original Repository

本仓库基于原始 `OpenCut-classic` 代码库继续维护。原仓库地址为 [OpenCut-app/OpenCut-classic](https://github.com/OpenCut-app/OpenCut-classic)，当前已经归档。

This repository continues from the original [OpenCut-app/OpenCut-classic](https://github.com/OpenCut-app/OpenCut-classic) codebase, which is now archived.

上游重写版本位于 [opencut-app/opencut](https://github.com/opencut-app/opencut)。

The upstream rewrite is happening at [opencut-app/opencut](https://github.com/opencut-app/opencut).

## 当前状态 | Current Status

- 适合用于中文界面的本地预览、演示和继续迭代
- 当前重点在 Web 端中文体验、基础稳定性和可回归测试
- 桌面端与底层 Rust 迁移仍沿用上游项目的原有方向
- Suitable for local preview, demos, and continued iteration with a Chinese UI
- Current work focuses on Web localization quality, baseline stability, and regression testing
- Desktop work and the lower-level Rust migration continue along the upstream direction

## Sponsors

Thanks to [Vercel](https://vercel.com?utm_source=github-opencut&utm_campaign=oss) and [fal.ai](https://fal.ai?utm_source=github-opencut&utm_campaign=oss) for their support of open-source software.

<a href="https://vercel.com/oss">
  <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge.svg" />
</a>

<a href="https://fal.ai">
  <img alt="Powered by fal.ai" src="https://img.shields.io/badge/Powered%20by-fal.ai-000000?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCAxMEwxMy4wOSAxNS43NEwxMiAyMkwxMC45MSAxNS43NEw0IDEwTDEwLjkxIDguMjZMMTIgMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" />
</a>

## Why? | 为什么做这个项目

- **Privacy / 隐私优先**: Your videos stay on your device. Your media stays local during editing.
- **Free core features / 核心功能免费可用**: Most basic CapCut features are now paywalled, while a lightweight editor still covers common editing needs.
- **Simple workflow / 简单易上手**: People want editors that are easy to use, and a familiar workflow lowers the learning curve.

## Project Structure | 项目结构

- `apps/web/`: Next.js web application for the browser-based editor and website
- `apps/web/`：基于 Next.js 的 Web 应用，承载官网和浏览器编辑器
- `apps/desktop/`: Native desktop app built with GPUI, currently still in progress
- `apps/desktop/`：基于 GPUI 的原生桌面端，当前仍在持续建设中
- `rust/`: Platform-agnostic core including the GPU compositor, effects, masks, and WASM bindings. Business logic is gradually moving here from TypeScript
- `rust/`：平台无关的核心层，包含 GPU 合成器、特效、蒙版和 WASM 绑定，业务逻辑正逐步从 TypeScript 迁移到这里
- `docs/`: Architecture and subsystem documentation
- `docs/`：架构设计与各子系统文档

## Getting Started | 快速开始

This section keeps the setup commands in their original form and adds bilingual guidance around them.

本节保留原始安装命令，并在命令前后补充双语说明，便于直接复制执行。

### Prerequisites | 前置依赖

- [Bun](https://bun.sh/docs/installation)
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

> **Note | 说明：** Docker is optional but recommended for running the local database and Redis. If you only want to work on frontend features, you can skip it.

### Setup | 安装步骤

1. Fork and clone the repository.
2. Fork 并克隆仓库。

3. Copy the environment file.
4. 复制环境变量文件。

   ```bash
   # Unix/Linux/Mac
   cp apps/web/.env.example apps/web/.env.local

   # Windows PowerShell
   Copy-Item apps/web/.env.example apps/web/.env.local
   ```

5. Start the database and Redis.
6. 启动数据库和 Redis。

   ```bash
   docker compose up -d db redis serverless-redis-http
   ```

7. Install dependencies and start the dev server.
8. 安装依赖并启动开发服务器。

   ```bash
   bun install
   bun dev:web
   ```

The application will be available at [http://localhost:3000](http://localhost:3000).

应用启动后可通过 [http://localhost:3000](http://localhost:3000) 访问。

The `.env.example` defaults match the Docker Compose config and should work out of the box.

`.env.example` 中的默认值已经与 Docker Compose 配置对齐，通常可直接运行。

### Desktop Setup | 桌面端准备

Desktop support is optional. Web-only contributors can skip this section.

桌面端环境属于可选内容，只开发 Web 端时可以直接跳过。

If you want to prepare `apps/desktop`, see [`apps/desktop/README.md`](apps/desktop/README.md). The setup has two stages: Rust toolchain first, then native desktop dependencies.

如果你要准备 `apps/desktop`，请查看 [`apps/desktop/README.md`](apps/desktop/README.md)。整体流程分两步：先安装 Rust 工具链，再安装桌面端原生依赖。

### Local WASM Development | 本地 WASM 开发

This section is only needed when editing `rust/wasm` and forcing the web app to use your local build instead of the published package.

只有在修改 `rust/wasm`，并且希望 Web 端使用本地构建产物时，才需要执行这部分内容。

**Prerequisites | 前置依赖** — install these once before anything else.

**前置依赖**：以下工具只需要预先安装一次。

```bash
# Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# build the WASM package
cargo install wasm-pack

# reruns the build on file changes, used by bun dev:wasm
cargo install cargo-watch
```

1. Build the package once from the repo root.
2. 在仓库根目录先构建一次包。

   ```bash
   bun run build:wasm
   ```

3. Register the generated package for linking.
4. 注册生成后的本地包，供链接使用。

   ```bash
   cd rust/wasm/pkg
   bun link
   ```

5. Link `apps/web` to the local package.
6. 让 `apps/web` 链接到本地包。

   ```bash
   cd apps/web
   bun link opencut-wasm
   ```

7. Rebuild on changes while you work.
8. 开发过程中在文件变更时自动重建。

   ```bash
   bun dev:wasm
   ```

To switch `apps/web` back to the published package, run the command below.

如果你需要让 `apps/web` 切回已发布版本，请执行下面的命令。

```bash
cd apps/web
bun add opencut-wasm
```

### Self-Hosting with Docker | 使用 Docker 自托管

To run everything, including a production build of the app, in Docker:

如果你希望通过 Docker 运行完整服务，并包含应用的生产构建，请执行：

```bash
docker compose up -d
```

The app will be available at [http://localhost:3100](http://localhost:3100).

应用会在 [http://localhost:3100](http://localhost:3100) 提供访问。

## Contributing | 贡献方式

We welcome contributions. The project is still evolving, and several areas are a good fit for focused improvements.

欢迎贡献代码和文档。项目仍在持续演进，当前有不少适合集中投入的改进方向。

**Recommended focus areas | 推荐优先方向**

- Timeline functionality and editing interactions
- Project management flows
- Performance improvements
- Bug fixes
- UI improvements outside the preview panel
- 时间线功能与编辑交互
- 项目管理流程
- 性能优化
- Bug 修复
- 预览面板之外的 UI 改进

**Current caution areas | 当前谨慎修改区域**

- Preview panel enhancements such as fonts, stickers, and effects
- Export-related functionality
- 预览面板增强功能，例如字体、贴纸、特效
- 导出相关功能

These parts are being reworked around a newer binary rendering approach, so changes there benefit from extra coordination.

这些部分正围绕新的二进制渲染方案进行重构，相关改动更适合先协调再推进。

See the [Contributing Guide](.github/CONTRIBUTING.md) for detailed setup instructions, development guidelines, and a fuller description of the current focus areas.

更详细的环境准备、开发约定和当前重点方向，请查看 [Contributing Guide](.github/CONTRIBUTING.md)。

**Quick start for contributors | 贡献者快速开始**

- Fork the repo and clone locally
- Follow the setup instructions in `CONTRIBUTING.md`
- If you work on `apps/desktop`, read [`apps/desktop/README.md`](apps/desktop/README.md)
- Create a feature branch and submit a PR
- Fork 仓库并克隆到本地
- 按 `CONTRIBUTING.md` 完成环境准备
- 如果你要修改 `apps/desktop`，请先阅读 [`apps/desktop/README.md`](apps/desktop/README.md)
- 创建功能分支并提交 PR

## License

[MIT LICENSE](LICENSE)

---

![Star History Chart](https://api.star-history.com/svg?repos=opencut-app/opencut&type=Date)
