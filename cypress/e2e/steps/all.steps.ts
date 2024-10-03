import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given(/^visit base url$/, () => {
  cy.visit('/');
});

Given(/^use chained cypress command$/, () => {
  cy.get('.list-group').find('a').eq(1).click();
});

Given(/^verify items$/, () => {
  cy.get('.row').find('.card').should('have.length', 7);
});

Then(/^I should see "(.*)" in the browser url$/, (url: string) => {
  cy.log('i should see... step');
  cy.url().should('include', url);
});

Given(/^log anything$/, () => {
  cy.log('log anything step: command 1');
  cy.log('log anything step: command 2');
});

Given(/^use session command$/, () => {
  cy.session("sessionName", () => {
    cy.log('session is created here');
  });
});
