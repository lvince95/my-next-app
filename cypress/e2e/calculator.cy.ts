const testData = [
  { input: '1 + 1', expectedResult: '2', numberOfOperations: 1 },
  { input: '2 * 2', expectedResult: '4', numberOfOperations: 1 },
  { input: '1 + 2 + 3', expectedResult: '6', numberOfOperations: 2 },
  { input: '6 / 2', expectedResult: '3', numberOfOperations: 1 },
  { input: '11 + 23', expectedResult: '34', numberOfOperations: 1 },
  { input: '11.1 + 23', expectedResult: '34.1', numberOfOperations: 2 },
  { input: '1 + 1 * 3', expectedResult: '4', numberOfOperations: 2 },
  {
    input: '( 11.5 + 15.4 ) + 10.1',
    expectedResult: '37',
    numberOfOperations: 2,
  },
  {
    input: '23 - ( 29.3 - 12.5 )',
    expectedResult: '6.2',
    numberOfOperations: 2,
  },
  { input: '( 1 / 2 ) - 1 + 1', expectedResult: '0.5', numberOfOperations: 3 },
  {
    input: '10 - ( 2 + 3 * ( 7 - 5 ) )',
    expectedResult: '2',
    numberOfOperations: 4,
  },
];

const testDataWrongInput = ['1 + )', '1 + - -5', '1+3', '11'];

describe('calculator e2e tests', () => {
  it('should correctly calculate the given arithmetic expressions', () => {
    cy.visit('/calculator');

    for (const data of testData) {
      cy.findByLabelText(/arithmetic expression/i).type(data.input);

      cy.wait(500);

      cy.findByLabelText(/arithmetic expression/i).should(
        'have.value',
        data.input,
      );

      cy.findByRole('button', {
        name: /compute/i,
      }).click();

      cy.wait(500);

      cy.findByText(`Result: ${data.expectedResult}`).should('exist');

      cy.wait(1000);

      cy.findByRole('button', {
        name: /clear/i,
      }).click();

      cy.wait(500);

      cy.findByText(`Result: ${data.expectedResult}`).should('not.exist');

      cy.findByLabelText(/arithmetic expression/i).should('have.value', '');
    }
  });

  it('should display an error message if given an invalid input', () => {
    cy.visit('/calculator');

    for (const data of testDataWrongInput) {
      cy.findByLabelText(/arithmetic expression/i).type(data);

      cy.wait(500);

      cy.findByLabelText(/arithmetic expression/i).should('have.value', data);

      cy.findByRole('button', {
        name: /compute/i,
      }).click();

      cy.wait(500);

      cy.findByText(`Result: ${/\d+/}`).should('not.exist');

      cy.findByText(/invalid expression/i).should('exist');

      cy.findByRole('button', {
        name: /clear/i,
      }).click();

      cy.wait(500);

      cy.findByLabelText(/arithmetic expression/i).should('have.value', '');
    }
  });
});

export {};
