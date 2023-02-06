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

describe('e2e', () => {
  it('should correctly calculate the given arithmetic expressions', () => {
    cy.visit('/calculator');

    for (const data of testData) {
      cy.findByRole('textbox', {
        name: /arithmetic expression/i,
      }).type(data.input);

      cy.findByRole('button', {
        name: /compute/i,
      }).click();

      cy.findByText(`Result: ${data.expectedResult}`).should('exist');

      cy.wait(1000);

      cy.findByRole('button', {
        name: /clear/i,
      }).click();

      cy.wait(500);
    }
  });
});

export {};
