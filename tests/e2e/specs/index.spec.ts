describe('home', () => {
  it('button click', () => {
    cy.visit('http://localhost:3001');
    cy.contains('main div', 'Index');
  });
});
