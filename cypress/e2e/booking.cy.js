/// <reference types="cypress" />



///customer
describe('Customer login', () => {
  it('Validates login page load', () => {
    cy.visit('https://localhost:5175/login');
  }); 

  it('Customer login functionality', () => {
    cy.visit('https://localhost:5175/login');
      cy.get(':nth-child(3) > input').type('sintu.tabata@redacademy.co.za')
      cy.get(':nth-child(4) > input').type('Nomntu07!')
      cy.get('#BtnLogin').click();
      cy.get('.navbar').should('be.visible');
      cy.get('.navbar').contains('Home').click();
      cy.get('h1').contains('Welcome to Sippin\' Pretty').should('be.visible');
      cy.get('.tagline').should('be.visible');
      cy.get('.rotating-mug').should('be.visible');

      //booking tables
      cy.get('.cta-button').contains('Book a Table').click();
      cy.get('#fullName').type('Sintu Tabata');
      cy.get('#phoneNumber').type('0685090385');
      cy.get('#email').type('sintu.tabata@redacademy.co.za');
      cy.get('#date').type('2025-08-19');
      cy.get('#time').select('11:00'); 
      cy.get('#guests').type('6');
      cy.wait(2000)

      //table selection
      cy.get('.available-tables').should('be.visible');
       cy.wait(2000)
      cy.get('.available-tables').contains('Select a table:').should('be.visible')
      cy.get('ul > :nth-child(1) > label').click()
      cy.get('.booking-form > button').contains('Confirm Booking').click();

      //payment form
   
      cy.get('#cardName').type('Sintu Tabata');
      cy.get('#cardNumber').type('4111111111111111');
      cy.get('#expiry').type('12/25');
      cy.get('#cvc').type('123');
      cy.get('.pay-btn').contains('Confirm & Pay').click();

      //confirmation page
      cy.wait(2000);
      cy.get('.confirmation-container').should('exist');
      cy.get('.confirmation-container').contains('Booking Confirmed').should('be.visible');
      cy.get('.confirmation-actions > :nth-child(1)').click();

     cy.get('.navbar').contains('About Us').click();
     cy.get('.map-section').should('exist');
    

      // cy.get('.navbar').contains('Contact Us').click();
      // cy.get('.navbar').contains('Logout').click();
    })
});