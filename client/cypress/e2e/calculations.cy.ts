describe('BMI and WHR calculations', () => {
  it('calculates BMI', () => {
    cy.visit('http://localhost:3000');
    cy.get('#BMIButton').click();
    cy.get('#height').type('170').should('have.value', '170');
    cy.get('#weight').type('70').should('have.value', '70');
    cy.get('#calculateBMI').click();
    cy.get('p').should(
      'contain',
      'Your BMI: 24.22 - Your weight is normal. Maintain a healthy lifestyle for overall well-being.'
    );
  });

  it('calculates WHR', () => {
    cy.visit('http://localhost:3000');
    cy.get('#WHRButton').click();
    cy.get('#gender').select('female').should('have.value', 'female');
    cy.get('#waist').type('60').should('have.value', '60');
    cy.get('#hip').type('80').should('have.value', '80');
    cy.get('#calculateWHR').click();
    cy.get('p').should(
      'contain',
      'Your WHR is within the healthy range for females.'
    );
  });

  it('shows error if input is incorrect', () => {
    cy.visit('http://localhost:3000');
    cy.get('#WHRButton').click();
    cy.get('#gender').select('female').should('have.value', 'female');
    cy.get('#waist').type('incorrect value').should('have.value', 'incorrect value');
    cy.get('#hip').type('80').should('have.value', '80');
    cy.get('#calculateWHR').click();
    cy.get('#error').should('be.visible')
  });
});
