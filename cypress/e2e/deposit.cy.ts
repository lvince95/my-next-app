const depositPlans = [
  {
    id: 0,
    portfolio: 'High risk',
    amount: 10000,
    depositFrequency: 'One-Time',
  },
  {
    id: 1,
    portfolio: 'Retirement',
    amount: 500,
    depositFrequency: 'One-Time',
  },
  {
    id: 2,
    portfolio: 'Retirement',
    amount: 100,
    depositFrequency: 'Monthly',
  },
];

const fundDeposits = [
  {
    id: 1,
    amount: 10500,
  },
  {
    id: 2,
    amount: 100,
  },
];

const expectedResult = {
  totalDepositAmount: 10600,
  allocation: ['High risk = $10000', 'Retirement = $600'],
};

describe('e2e', () => {
  it('should handle depositing funds correctly', () => {
    cy.visit('/deposit');

    cy.wait(500);

    cy.findByRole('button', {
      name: /deposit funds/i,
    }).click();

    cy.findByRole('button', {
      name: /next/i,
    }).should('be.disabled');

    for (const data of depositPlans) {
      cy.findByRole('textbox', {
        name: /portfolio name/i,
      }).type(data.portfolio);

      cy.findByRole('spinbutton', {
        name: /amount/i,
      }).type(data.amount.toString());

      cy.findByRole('radio', {
        name: /one-time/i,
      }).should('be.checked');

      if (data.depositFrequency === 'Monthly') {
        cy.findByRole('radio', {
          name: /monthly/i,
        }).click();

        cy.findByRole('radio', {
          name: /monthly/i,
        }).should('be.checked');

        cy.wait(500);
      }

      cy.findByRole('button', {
        name: /add/i,
      }).click();

      cy.wait(500);
    }

    cy.findByRole('button', {
      name: /next/i,
    }).click();

    cy.wait(500);

    for (const data of fundDeposits) {
      cy.findByRole('spinbutton', {
        name: /amount/i,
      }).type(data.amount.toString());

      cy.findByRole('button', {
        name: /add/i,
      }).click();

      cy.wait(500);
    }

    cy.findByRole('button', {
      name: /next/i,
    }).click();

    cy.wait(1000);

    cy.findByText(`$${expectedResult.totalDepositAmount.toString()}`).should(
      'exist',
    );

    for (const data of expectedResult.allocation) {
      cy.findByText(data).should('exist');
    }
  });
});

export {};
