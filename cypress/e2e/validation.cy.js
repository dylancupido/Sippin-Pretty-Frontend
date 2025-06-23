/// <reference types="cypress" />

describe('Validating login Functionality', () => {
  it('Validates login page load', () => {
    cy.visit('http://localhost:53460/login');
  });

  it('Validates login functionality', () => {
    cy.visit('http://localhost:53460/login');
cy.get(':nth-child(2) > input').type('dylancupido@gmail.com')
cy.get(':nth-child(3) > input').type('Nomntu07!')
cy.get('#BtnLogin').click();

//promotion edit,add function
cy.get('.navbar').contains('Manage Promotions').click()
cy.get('.slider-container > :nth-child(4)').contains('Add New').click()
cy.get('.custom-modal').contains('Add Promotion').should('be.visible')
cy.get('[placeholder="Title"]').type('Test Promotion')
cy.get('textarea').type('Test Description')
cy.get('[placeholder="Image Path"]').type('Test Image Path')
cy.get('[placeholder="Catch Phrase"]').type('Test Catch Phrase')
cy.get('.custom-modal').contains('Save').click();

cy.get(':nth-child(4) > .slide-content > .button-group > :nth-child(2)').contains('Edit').click()
cy.get('.custom-modal').contains('Edit Promotion').should('be.visible')
cy.get('[placeholder="Title"]').clear().type('Updated Promotion')
cy.get('.custom-modal').contains('Update').click();

cy.get('.nav-links > :nth-child(2) > a').contains('Manage Menu').click()
cy.get(':nth-child(1) > .card-container > :nth-child(1)').contains('Edit').click()
cy.get('[placeholder="Product Name"]').clear().type('Updated Item')
cy.get('.custom-modal').contains('Save').click();


cy.get('.nav-links > :nth-child(3) > a').click()
cy.get('.orders-container').contains('Orders').should('be.visible');

cy.get('.nav-links > :nth-child(4) > a').click()
cy.get('.add-staff-button').click()
cy.get('[placeholder="Full Name*"]').type('phoney')
cy.get('[placeholder="Email Address*"]').type('yoluntu@gmail.com')
cy.get('[placeholder="Password*"]').type('Nomntu07!')
cy.get('[placeholder="Mobile Number*"]').type('0685090385')
cy.get('form > button').contains('Register').click()
cy.get('.nav-links > :nth-child(4) > a').click()



cy.get(':nth-child(5) > a').contains('Bookings').click()
cy.get('.logout-button').click()

  });
});
