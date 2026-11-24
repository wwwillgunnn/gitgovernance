<p align="center">
  <h1 align="center">GitGovernance</h1>
  <p align="center">
    <img src="https://shieldcn.dev/badge/Vite%2B-8b5cf6.svg?logo=vite&logoColor=ffffff" alt="Vite+" align="middle" />
    <img src="https://shieldcn.dev/badge/TypeScript.svg?variant=branded&brand=typescript" alt="TypeScript" align="middle" />
  </p>
</p>

Paste any GitHub URL and jump straight into diagrams, docs, editors and more.

Visit: [GitGovernance](https://gitgovernance.vercel.app)

![](/public/image.tiff)

## How It Works

1. Paste a GitHub repository URL into the input and hit **Analyse repository**.
2. The URL is validated (it must be on `github.com` and include an owner and repo name) and reduced to a path like `owner/repo`.
3. The tool cards unlock, each mapped to a third-party service that accepts a GitHub path.
4. Click a card and the repo opens in that tool in a new tab.

Everything runs in your browser, no repository data is sent to any server of mine.

## Tools

| Tool                         | Powered by                           |
| ---------------------------- | ------------------------------------ |
| Architecture diagram         | [GitDiagram](https://gitdiagram.com) |
| Codebase ingestion           | [GitIngest](https://gitingest.com)   |
| AI documentation             | [DeepWiki](https://deepwiki.com)     |
| MCP integration              | [GitMCP](https://gitmcp.io)          |
| AI context export            | [uithub](https://uithub.com)         |
| Browser code editor          | [GitHub1s](https://github1s.com)     |
| Browser code editor          | [github.dev](https://github.dev)     |
| Online development           | [CodeSandbox](https://githubbox.com) |
| Live development environment | [StackBlitz](https://stackblitz.com) |

## Setup

Built with [Vite+](https://viteplus.dev), so you'll need the `vp` CLI installed.

```bash
git clone https://github.com/wwwillgunnn/gitgovernance
cd gitgovernance
vp install
vp dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production build

```bash
vp build
vp preview
```
