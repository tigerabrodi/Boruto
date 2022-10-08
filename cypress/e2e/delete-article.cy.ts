it('Should be able to delete an article', () => {
  cy.visit('/')

  // Gets redirected users profile
  cy.get('[data-cy="authenticated-avatar"]').click()
  cy.get('[data-cy="my-profile-link"]').click()

  // Gets redirected to the article
  cy.get('[data-cy="users-article"]').eq(1).click()

  // Delete article
  cy.get('[data-cy="delete-article-button"]').click()
  // cy.get('[data-cy="delete-article-modal-button"]').click()
})
