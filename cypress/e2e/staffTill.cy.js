/// <reference types="cypress" />

describe('Staff login and order item page navigation', () => {
  it('Logs in successfully and navigates to order items page', () => {
    cy.visit('http://localhost:53460/login');


    cy.get(':nth-child(2) > input').type('othandiwayoluntu@gmail.com')
    cy.get(':nth-child(3) > input').type('Nomntu07!')
    cy.get('#BtnLogin').click();

   cy.get('.navbar').should('be.visible');
       cy.get('.nav-links > :nth-child(1) > a').click()
       cy.contains('Orders').click(); 
       cy.contains('Order Items').should('exist');

      cy.get('.nav-links > :nth-child(2) > a').click()
      cy.get('.menu-grid > :nth-child(1)').click()
      cy.get('.menu-grid > :nth-child(3)').click()
      cy.get('.payment-options > :nth-child(3)').click()
      cy.get('.checkout').click()


  })
});







