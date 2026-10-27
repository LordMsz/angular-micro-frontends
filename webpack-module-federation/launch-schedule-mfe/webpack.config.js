const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  // federation name to be camel case and same to be used in the host configuration
  // also some federation output types use name as a global JS variable, so camel case is preferred
  name: 'launchSchedule',

  exposes: {
    // './Component': './src/app/app.ts', // we don't want to expose the entire app, just a feature or component
    './LaunchRoutes': './src/app/launches/launch.routes.ts', // exposing the launch routes for module federation
    './LaunchStatusRoutes': './src/app/launches/launch-status.routes.ts', // expose route for "mini-component" with same principle
  },

  shared: {
    // shareAll shares everything in package.json including rxjs, router etc.
    // for now okay
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
