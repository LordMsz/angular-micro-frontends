Webpack Module Federation track: shell + remote + shared lib. Older stack on purpose.

# Commands and steps used

## New Angular app
- standard `ng new` basically; `npx @angular/cli@22.2.4 new launch-schedule-mfe --skip-git --style=scss --ssr=false --zoneless --prefix=ls --routing --ai-config=none`
- same for shell, different --prefix=mc to distringuish in DOM

## Module federation package to MFE (Webpack)
`npx ng add @angular-architects/module-federation@^22.0.0 --project launch-schedule-mfe --type remote --port 4201`

- using "webpack" here instead of rspack or instead of Native Federation alternative (by design)

## Module federation package to shell (Webpack)
`npx ng add @angular-architects/module-federation@^22.0.0 --project mission-control-shell --type dynamic-host --port 4200`

# Gotchas
- .dockerignore and .gitignore have no inline comments
- Windows node_modules must never reach a Linux image
- the SPA fallback turns missing JS into HTML with status 200 (careful with nginx config and try_files)
- Running the schematic on Windows writes backslash paths (webpack.config.js, angular.json), which break in JS strings and Linux builds
- The remote schematic exposes the whole App by default. Expose feature routes instead
- the mf.manifest.json file key has to match exactly the webpack-defined MFE federated module name / remote's name
- Three names must match exactly, none are type-checked (fail only at runtime, on navigation):
    - manifest key <-> remote `name` in webpack.config.js (`launchSchedule`)
    - `exposedModule` <-> remote `exposes` key (`./LaunchRoutes`)
    - property used in `.then(m => m.X)` <-> exported symbol/variable (`LAUNCH_ROUTES`)
    - a wrong export name shows up as NG0919 "Cannot read @NgModule metadata" (router gets `undefined`), which is misleading slightly
- another untyped contract is the communication between components
    - e.g. `NextLaunchCountdown` `launchId` input that would break at runtime if renamed only on one side
- NgComponentOutlet for direct component rendering doesn't support output binding
- Tests run on the esbuild pipeline, the app on webpack (MF). A test passing doesn't prove the federated build works.
- Router config is the host's: a remote's `app.config.ts` never runs when federated. Remotes must not depend on host router features
    - e.g. `withComponentInputBinding()` is app-wide, binds by name from path/query params + route data into any routed component (collisions across teams). Remotes read `ActivatedRoute.paramMap` instead
- Remote links stay relative (`[id]`, `..`): the remote doesn't know its mount path in the shell

# Lesson: one missing import in the shell breaks a remote
**Symptom:** the remote works standalone; inside the shell it throws `NG0203: toSignal() can only be used within an injection context`. No config is wrong.

**Cause:**
- `toSignal` lives in `@angular/core/rxjs-interop`, a secondary entry point. It imports core internals via *relative private chunks* (`./_not_found-chunk.mjs` holds the "current injector" state), not via `'@angular/core'`
- `shareAll` lists it, but webpack only *provides* shared modules the build actually imports. Shell never used `toSignal` -> not in the share scope
- the remote falls back to its own copy, with its own copy of core internals. Shell's core sets the injector in its copy, `toSignal` checks the remote's copy → NG0203
- i.e. "one Angular runtime" broken through a side door: `@angular/core` itself is shared fine

**Fixes:**
- shell imports it (see the commented-out line in `mission-control-shell/src/app/app.ts`). Works, but the shell's build silently becomes the platform contract: every secondary entry point any remote uses must be imported by the shell
- remote avoids it (what we do, `launch-detail.ts`: `paramMap` + `async` pipe). Sidesteps, doesn't fix; the next remote using `toSignal` hits it again
- Native Federation pre-builds all shared secondary entry points into the import map -> this class of bug mostly goes away (to verify in that track)

**Takeaway:** MFE integration fails at runtime, only when federated, with misleading errors. Unit tests won't catch it (different build pipeline, no federation). Every shell + remote combination needs automated integration tests against the real federated build (e2e on deployed/composed apps). Budget for it; the cost of MFE is higher than it looks.
