module.exports = {
    stepDefinitions: ["cypress/e2e/steps/**/*.ts"],
    filterSpecs: true,
    omitFiltered: true,
    messages: {
        enabled: true,
        output: `cypress/cucumber-json/output.ndjson`,
    },
    pretty: {
        enabled: false
    },
    json: {
        enabled: true,
        output: `cypress/cucumber-json/output.cucumber.json`,
    },
};
