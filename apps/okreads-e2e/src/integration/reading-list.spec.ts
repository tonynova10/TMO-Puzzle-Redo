describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
});

describe('When: I remove a book from my list', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="remove-button"]').first().click();

    cy.get('[data-testing="reading-list-container"]').should('be.empty');
  });
});

describe('When I mark a book as read', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: finished date should appear', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('[data-testing="book-button"]').first().click();

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="mark-as-read-button"]').first().click();

    cy.get('[data-testing="finished-date"]').should('be.visible');
  })
});
