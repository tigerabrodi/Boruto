const firstUser = {
  password: 'demonslayer123',
  email: 'borutouzumaki@gmail.com',
}

it('Should be able to sign in', () => {
  cy.visit('/')

  // Sign in page
  cy.get('[data-cy="authenticated-avatar"]').should('not.exist')
  cy.get('[data-cy="avatar"]').should('exist')
  cy.get('[data-cy="avatar"]').click()
  cy.get('[data-cy="menu-sign-in"]').click()
  cy.location('pathname').should('eq', '/signin')

  // User signs in
  cy.get('[data-cy="sign-in-email"]').type(firstUser.email)
  cy.get('[data-cy="sign-in-password"]').type(firstUser.password)
  cy.get('[data-cy="sign-in-submit-button"]').click()

  // Gets redirected to feed
  cy.location('pathname').should('eq', '/')
})
