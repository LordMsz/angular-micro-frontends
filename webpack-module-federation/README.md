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