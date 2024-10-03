import { defineConfig } from 'cypress';

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {createEsbuildPlugin} = require('@badeball/cypress-cucumber-preprocessor/esbuild');
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';


export default defineConfig({
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
    async setupNodeEvents(cypressOn, config) {
      const on = require('cypress-on-fix')(cypressOn);
      await addCucumberPreprocessorPlugin(on, config);

      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on('file:preprocessor', bundler);


      return config;
    },
  }
});
