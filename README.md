# Angular Micro-Frontends — Mission Control

Minimal, hands-on study of Angular micro-frontends (MFE). Each app simulates a **separate repository, build and deployment** (own `package.json`, own Docker image). No workspace, no monorepo tooling.

**Thesis:** federated MFEs integrated via routes can feel like local lazy-loaded routes — no iframe-like islands, no duplicated layout.

## Tracks

| Folder | Approach | Status |
|---|---|---|
| `webpack-module-federation/` | Webpack Module Federation | Active. Demonstrates an **older stack on purpose** — Angular's webpack builder is deprecated. |
| `native-federation/` | Native Federation (esbuild, ES modules, import maps) | Planned. The natural successor for Angular. |
| `web-components/` | Angular Elements | Maybe. Separate runtimes, framework-agnostic. |
| `backends/` | Per-team APIs | Later. |

Approach overview (as of 2026 — verify versions in the official docs):

| Approach | Since | Notes |
|---|---|---|
| Webpack Module Federation | 2020 (webpack 5) | Mature, widespread; tied to a deprecated Angular builder. |
| Rspack + Module Federation | ~2024 | Webpack-compatible, much faster. A bridge for existing webpack setups. |
| Native Federation | ~2023 | Same concepts as MF, built on browser standards. Fits Angular's esbuild builder. |
| Web Components | ~2018 (standard) | Common in design systems; each MFE brings its own runtime. |
| iframes | — | Full isolation, poor UX. Not covered. |

## Domain

| Part | Role |
|---|---|
| `mission-control-shell` | Host: layout, navigation, dashboard |
| `launch-schedule-mfe` | Remote: launch schedule (feature routes + one widget) |
| `@mission/shared` | Shared library: operator session (the cross-MFE contract) |

## Principles

- **One Angular runtime per page.** Two copies of `@angular/core` don't isolate — they break (DI and rendering rely on module-level state).
- **DI tokens are object identity.** A service is "the same" across MFEs only if its package is *shared*. Otherwise `providedIn: 'root'` silently creates a second instance.
- **Scope on purpose.** MFE-internal services go into route-level `providers`. Root singletons only via the shared library.
- **The shared library is the public API** between shell and MFEs. Keep it tiny.
- **Remotes expose feature routes, not layouts.** A remote's own app frame exists only for standalone development.
- **Shell knows names, not URLs.** Remote locations come from a runtime manifest → build once, deploy anywhere.
- **Shared singletons move in lockstep** (Angular major, shared libs). Everything else may differ per team.
- **Federated code runs with full page privileges.** CORS only governs reading responses; the trust boundary is CSP + who can deploy remotes.
- **Relative URLs inside a remote resolve against the shell.** Remote assets and API calls need a base URL of their own.
- **MFE is an organisational tool.** Deployables ≈ teams, not features.

## Links

- Angular: https://angular.dev
- Module Federation plugin: https://github.com/angular-architects/module-federation-plugin
- Native Federation: https://github.com/native-federation
