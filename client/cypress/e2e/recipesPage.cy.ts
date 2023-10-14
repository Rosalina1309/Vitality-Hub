describe('Recipes page', () => {
  it('Visits the recipes page', () => {
    cy.visit('http://localhost:3000');
    cy.get('#hamburger').click();
    cy.contains('Recipes').click();
    cy.url().should('include', '/recipes');
  });
});
