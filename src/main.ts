import "./style.css";

const tools = [
  {
    name: "Architecture diagram",
    credit: "Powered by GitDiagram",
    url: (path: string) => `https://gitdiagram.com/${path}`,
  },
  {
    name: "Codebase ingestion",
    credit: "Powered by GitIngest",
    url: (path: string) => `https://gitingest.com/${path}`,
  },
  {
    name: "AI documentation",
    credit: "Powered by DeepWiki",
    url: (path: string) => `https://deepwiki.com/${path}`,
  },
  {
    name: "MCP integration",
    credit: "Powered by GitMCP",
    url: (path: string) => `https://gitmcp.io/${path}`,
  },
  {
    name: "AI context export",
    credit: "Powered by uithub",
    url: (path: string) => `https://uithub.com/${path}`,
  },
  {
    name: "Browser code editor",
    credit: "Powered by GitHub1s",
    url: (path: string) => `https://github1s.com/${path}`,
  },
  {
    name: "Browser code editor",
    credit: "Powered by GitHub",
    url: (path: string) => `https://github.dev/${path}`,
  },
  {
    name: "Online development",
    credit: "Powered by CodeSandbox",
    url: (path: string) => `https://githubbox.com/${path}`,
  },
  {
    name: "Live development environment",
    credit: "Powered by StackBlitz",
    url: (path: string) => `https://stackblitz.com/github/${path}`,
  },
];

const sparklePath =
  "M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z";

const sparkle = (className: string) => `
  <svg class="sparkle ${className}" viewBox="0 0 24 24" aria-hidden="true">
    <path d="${sparklePath}" vector-effect="non-scaling-stroke" />
  </svg>
`;

const sparkleCluster = (side: "left" | "right", color: string) => `
  <div class="sparkles sparkles-${side}" style="--sparkle-color: ${color}" aria-hidden="true">
    ${sparkle("sparkle-big")}
    ${sparkle("sparkle-small sparkle-a")}
    ${sparkle("sparkle-small sparkle-b")}
  </div>
`;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="navbar-wrap">
    <nav id="navbar" class="page-container">
      <a href="/" class="brand">
        Git<span style="color:#6fb4f8">Governance</span>
      </a>

      <a
        href="https://github.com/wwwillgunnn/gitgovernance"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
        aria-label="GitHub"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.14 1.18a10.9 10.9 0 0 1 5.71 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.35.77 1.03.77 2.08v3.08c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
        </svg>
      </a>
    </nav>
  </div>

  <main id="main" class="page-container">

    <section id="hero">
      ${sparkleCluster("left", "#1e3a8a")}
      ${sparkleCluster("right", "#4db8ff")}
      <h1>Understand any codebase</h1>
      <p>Paste a GitHub URL for instant diagrams, docs, editors and more</p>
    </section>

    <section id="workspace">

      <form id="repository-form">
        <input
          id="repository-url"
          type="url"
          placeholder="https://github.com/owner/repository"
          autocomplete="url"
          required
        />

        <button type="submit">
          Analyse repository <span>→</span>
        </button>
      </form>

      <section id="artifacts">
          <h2>Explore with tools</h2>

        <div class="artifact-grid">
          ${tools
            .map(
              (tool, index) => `
            <button
              type="button"
              class="artifact-card tool-card"
              data-tool="${index}"
              disabled
            >
              <h3>${tool.name}</h3>
              <span class="tool-credit">${tool.credit}</span>
            </button>
          `,
            )
            .join("")}
        </div>

        <p id="tool-hint">
          Enter a GitHub repository above to explore it with these tools.
        </p>
      </section>
    </section>
  </main>

  <footer id="footer">
    <p>
      Made by
      <a
        href="https://github.com/wwwillgunnn"
        target="_blank"
        rel="noopener noreferrer"
      >William Gunn</a>
    </p>
  </footer>
`;

const form = document.querySelector<HTMLFormElement>("#repository-form")!;

const input = document.querySelector<HTMLInputElement>("#repository-url")!;

const cards = document.querySelectorAll<HTMLButtonElement>(".tool-card");

const hint = document.querySelector<HTMLParagraphElement>("#tool-hint")!;

let currentRepository = "";

function activateTools(repoPath: string) {
  currentRepository = repoPath;

  cards.forEach((card) => {
    card.disabled = false;
  });

  hint.textContent = `Showing ${tools.length} tools for ${repoPath}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const repository = new URL(input.value.trim());

    if (repository.hostname !== "github.com" && repository.hostname !== "www.github.com") {
      throw new Error("Please enter a valid GitHub repository URL.");
    }

    const parts = repository.pathname.split("/").filter(Boolean);

    if (parts.length < 2) {
      throw new Error("Please enter a repository URL with an owner and name.");
    }

    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/, "");

    if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo)) {
      throw new Error("Invalid repository URL.");
    }

    const remainingPath = parts.slice(2).join("/");

    const repoPath = [owner, repo, remainingPath].filter(Boolean).join("/");

    activateTools(repoPath);
  } catch (error) {
    hint.textContent = error instanceof Error ? error.message : "Something went wrong.";
  }
});

cards.forEach((card) => {
  const index = Number(card.dataset.tool);

  card.addEventListener("click", () => {
    if (card.disabled || !currentRepository) return;

    const tool = tools[index];

    window.open(tool.url(currentRepository), "_blank", "noopener,noreferrer");
  });
});
