describe('Exercises page', () => {
  it('Visits the exercises page', () => {
  	cy.visit('http://localhost:3000');
  	cy.get('#hamburger').click();
  	cy.contains('Exercises').click();
  	cy.url().should('include', '/exercises');
  });
});