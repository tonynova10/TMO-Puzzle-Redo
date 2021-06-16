describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  it('Then: I should see search results as I am typing', () => {
    cy.get('input[type="search"]').type('j');

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });
});

describe('When I add a book and want to undo', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to see book added', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('[data-testing="book-button"]').click();

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should('contain.text');
  });
})
