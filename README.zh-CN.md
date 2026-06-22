<p align="right"><a href="./README.zh-CN.md">简体中文</a> | <a href="./README.md">English</a></p>

# OpenCut-ZHS

> 中文说明页，English documentation is available in [README.md](./README.md).

OpenCut-ZHS 是一个面向中文用户的 OpenCut Classic 维护分支，提供默认简体中文界面、持续补齐的站点与编辑器汉化，以及基础可回归的 Web 端测试。

## 预览截图

![OpenCut-ZHS 预览截图](./apps/web/public/landing-page-dark.png)

## 项目定位

- 默认语言为简体中文，优先优化中文用户的上手体验
- 保留 OpenCut Classic 的 Web 编辑能力与现有工程结构
- 持续补齐可见文案、交互提示和关键页面的中文化
- 为主要页面与编辑器链路补充 Playwright e2e 回归

## 原仓库

本仓库基于原始 [OpenCut-app/OpenCut-classic](https://github.com/OpenCut-app/OpenCut-classic) 代码库继续维护。原仓库当前已经归档。

上游重写版本位于 [opencut-app/opencut](https://github.com/opencut-app/opencut)。

## 当前状态

- 适合用于中文界面的本地预览、演示和继续迭代
- 当前重点在 Web 端中文体验、基础稳定性和可回归测试
- 桌面端与底层 Rust 迁移仍沿用上游项目的原有方向

## 赞助支持

感谢 [Vercel](https://vercel.com?utm_source=github-opencut&utm_campaign=oss) 和 [fal.ai](https://fal.ai?utm_source=github-opencut&utm_campaign=oss) 对开源软件项目的支持。

<a href="https://vercel.com/oss">
  <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge.svg" />
</a>

<a href="https://fal.ai">
  <img alt="Powered by fal.ai" src="https://img.shields.io/badge/Powered%20by-fal.ai-000000?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCAxMEwxMy4wOSAxNS43NEwxMiAyMkwxMC45MSAxNS43NEw0IDEwTDEwLjkxIDguMjZMMTIgMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" />
</a>

## 为什么做这个项目

- **隐私优先**：视频保留在你的设备上，编辑过程中的媒体资源保持本地处理
- **核心功能免费可用**：许多 CapCut 基础能力已经转入付费，而轻量编辑器依然可以覆盖常见需求
- **简单易上手**：用户需要容易理解和快速上手的编辑流程，熟悉的交互方式可以降低学习成本

## 项目结构

- `apps/web/`：基于 Next.js 的 Web 应用，承载官网和浏览器编辑器
- `apps/desktop/`：基于 GPUI 的原生桌面端，当前仍在持续建设中
- `rust/`：平台无关的核心层，包含 GPU 合成器、特效、蒙版和 WASM 绑定，业务逻辑正逐步从 TypeScript 迁移到这里
- `docs/`：架构设计与各子系统文档

## 快速开始

本节保留原始安装命令，便于直接复制执行。

### 前置依赖

- [Bun](https://bun.sh/docs/installation)
- [Docker](https://docs.docker.com/get-docker/) 和 [Docker Compose](https://docs.docker.com/compose/install/)

> **说明：** Docker 属于可选依赖，适合运行本地数据库和 Redis。只开发前端功能时可以跳过。

### 安装步骤

1. Fork 并克隆仓库。
2. 复制环境变量文件。

```bash
# Unix/Linux/Mac
cp apps/web/.env.example apps/web/.env.local

# Windows PowerShell
Copy-Item apps/web/.env.example apps/web/.env.local
```

3. 启动数据库和 Redis。

```bash
docker compose up -d db redis serverless-redis-http
```

4. 安装依赖并启动开发服务器。

```bash
bun install
bun dev:web
```

应用启动后可通过 [http://localhost:3000](http://localhost:3000) 访问。

`.env.example` 中的默认值已经与 Docker Compose 配置对齐，通常可直接运行。

### 桌面端准备

桌面端环境属于可选内容，只开发 Web 端时可以直接跳过。

如果你要准备 `apps/desktop`，请查看 [`apps/desktop/README.md`](apps/desktop/README.md)。整体流程分两步：先安装 Rust 工具链，再安装桌面端原生依赖。

### 本地 WASM 开发

只有在修改 `rust/wasm`，并且希望 Web 端使用本地构建产物时，才需要执行这部分内容。

**前置依赖**：以下工具只需要预先安装一次。

```bash
# Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Build the WASM package
cargo install wasm-pack

# Rebuild on file changes, used by bun dev:wasm
cargo install cargo-watch
```

1. 在仓库根目录先构建一次包。

```bash
bun run build:wasm
```

2. 注册生成后的本地包，供链接使用。

```bash
cd rust/wasm/pkg
bun link
```

3. 让 `apps/web` 链接到本地包。

```bash
cd apps/web
bun link opencut-wasm
```

4. 开发过程中在文件变更时自动重建。

```bash
bun dev:wasm
```

如果你需要让 `apps/web` 切回已发布版本，请执行下面的命令。

```bash
cd apps/web
bun add opencut-wasm
```

### 使用 Docker 自托管

如果你希望通过 Docker 运行完整服务，并包含应用的生产构建，请执行：

```bash
docker compose up -d
```

应用会在 [http://localhost:3100](http://localhost:3100) 提供访问。

## 贡献方式

欢迎贡献代码和文档。项目仍在持续演进，当前有不少适合集中投入的改进方向。

**推荐优先方向**

- 时间线功能与编辑交互
- 项目管理流程
- 性能优化
- Bug 修复
- 预览面板之外的 UI 改进

**当前谨慎修改区域**

- 预览面板增强功能，例如字体、贴纸、特效
- 导出相关功能

这些部分正围绕新的二进制渲染方案进行重构，相关改动更适合先协调再推进。

更详细的环境准备、开发约定和当前重点方向，请查看 [Contributing Guide](.github/CONTRIBUTING.md)。

**贡献者快速开始**

- Fork 仓库并克隆到本地
- 按 `CONTRIBUTING.md` 完成环境准备
- 如果你要修改 `apps/desktop`，请先阅读 [`apps/desktop/README.md`](apps/desktop/README.md)
- 创建功能分支并提交 PR

## 许可证

本项目基于 [MIT License](LICENSE) 发布。

---

## Star 历史

![Star History Chart](https://api.star-history.com/svg?repos=opencut-app/opencut&type=Date)
