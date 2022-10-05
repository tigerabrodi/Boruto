// const DEMO_COVER_IMAGE = '../fixtures/demo-cover-image.png'

const firstUser = {
  password: 'demonslayer123',
  email: 'borutouzumaki@gmail.com',
}

// const article = {
//   readMin: 3,
//   title: 'Meaning of Lorem Ipsum',
//   subtitle: 'Lorem ipsum was purposefully designed to have no meaning',
//   text: `What I find remarkable is that this text has been the industry's standard dummy text ever since some printer in the 1500s took a galley of type and scrambled it to make a type specimen book; it has survived not only four centuries of letter-by-letter resetting but even the leap into electronic typesetting, essentially unchanged except for an occasional 'ing' or 'y' thrown in. It's ironic that when the then-understood Latin was scrambled, it became as incomprehensible as Greek; the phrase 'it's Greek to me' and 'greeking' have common semantic roots!`,
// }

it('Should be able to sign in', () => {
  cy.visit('/')

  // Sign in page
  cy.get('[data-cy="authenticated-avatar"]').should('not.exist')
  cy.get('[data-cy="avatar"]').should('exist')
  cy.get('[data-cy="avatar"]').click()
  cy.get('[data-cy="menu-sign-in"]').click()

  // User signs in
  cy.get('[data-cy="sign-in-email"]').type(firstUser.email)
  cy.get('[data-cy="sign-in-password"]').type(firstUser.password)
  cy.get('[data-cy="sign-in-submit-button"]').click()

  // Gets redirected to feed
  cy.location('pathname').should('eq', '/')
})

// it('Should create a blog article', () => {
//   // Redirected to "write article page"
//   cy.get('[data-cy="write-button"]').click()

//   cy.get('[data-cy="write-file-input"]').click().attachFile(DEMO_COVER_IMAGE)
// })
