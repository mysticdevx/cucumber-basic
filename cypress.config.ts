import { defineConfig } from 'cypress';

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {createEsbuildPlugin} = require('@badeball/cypress-cucumber-preprocessor/esbuild');
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    }),
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  watchForFileChanges: false,
  env: {
    cucumber: true,
    omitFiltered: true,
    filterSpecs: true,
  },
  e2e: {
    baseUrl: 'https://www.demoblaze.com/',
    specPattern: ['cypress/e2e/**/*.feature'],
    excludeSpecPattern: '*.ts',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents
  }
});
