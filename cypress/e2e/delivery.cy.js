/// <reference types="cypress" />

describe('Delivery Functionality', () => {
  it('Validates Delivery Page load', () => {
    cy.visit('https://localhost:5175/delivery');
  });

  it('Customer login functionality', () => {
    cy.visit('https://localhost:5175/login');
      cy.get(':nth-child(2) > input').type('sintu.tabata@redacademy.co.za')
      cy.get(':nth-child(3) > input').type('Nomntu07!')
      cy.get('#BtnLogin').click();
//adding to cart 
        cy.get('.navbar').should('be.visible');
        cy.get('.nav-links > :nth-child(2) > a').click()
        cy.get(':nth-child(1) > .card-container > :nth-child(1) > .card-body > .buy-now-btn').click()
        cy.get('.nav-cart').click()
        cy.get('.cart-page').should('be.visible')
        cy.get('.checkout-button').click()
//card form 
        cy.get('.payment-container').should('be.visible')
        cy.get('[placeholder="e.g. John Smith"]').type('Sintu Tabata')
        cy.get('.card-input-container > input').type('4545454544545455')
        cy.get('.card-row > :nth-child(1) > input').type('06/27');
        cy.get('.card-row > :nth-child(2) > input').type('123')
//delivery option 
        cy.get('.order-type-selection > :nth-child(2)').click()
        cy.get('[name="street"]').type('36 Moshesh Avenue')
        cy.get('[name="city"]').type('Cape Town')
        cy.get('[value=""]').type('7455')
        cy.get('.pay-btn').click();

        cy.get('.confirmation-actions > :nth-child(1)').click()

      
    

    
   













//     cy.get('[placeholder="Delivery Time"]').type('12:00');
//     cy.get('.custom-modal').contains('Save').click();
//   });

//   it('Validates edit delivery functionality', () => {
//     cy.visit('http://localhost:53459/delivery');
//     cy.get(':nth-child(2) > .delivery-actions > :nth-child(2)').contains('Edit').click();
//     cy.get('.custom-modal').contains('Edit Delivery').should('be.visible');
//     cy.get('[placeholder="Delivery Name"]').clear().type('Updated Delivery');
//     cy.get('.custom-modal').contains('Update').click();
//   });

//   it('Validates delete delivery functionality', () => {
//     cy.visit('http://localhost:53459/delivery');
//     cy.get(':nth-child(2) > .delivery-actions > :nth-child(3)').contains('Delete').click();
//     cy.get('.custom-modal').contains('Confirm').click();
//     cy.get('.delivery-table').should('not.contain', 'Updated Delivery');
  });
});