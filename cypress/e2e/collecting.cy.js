describe('Collecting Functionality', () => {
  it('Validates Collecting Page load', () => {
    cy.visit('https://localhost:5175/Collecting');
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

        cy.get('.payment-container').should('be.visible')
        cy.get('[placeholder="e.g. John Smith"]').type('Sintu Tabata')
        cy.get('.card-input-container > input').type('4545454544545455')
        cy.get('.card-row > :nth-child(1) > input').type('06/27');
        cy.get('.card-row > :nth-child(2) > input').type('123')
        cy.get('.pay-btn').click()

    })
  });