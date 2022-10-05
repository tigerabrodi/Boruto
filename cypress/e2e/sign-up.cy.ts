const newUser = {
  username: 'elon_musk',
  email: 'elonmusk@gmail.com',
  password: 'elonmusk123',
  fullName: 'Elon Musk',
  age: '51',
  location: 'Moon, Space',
  bio: `I'm a business magnate and investor. I'm also the founder, CEO, and chief engineer of SpaceX; angel investor, CEO, and product architect of Tesla, Inc.; founder of The Boring Company; and co-founder of Neuralink and OpenAI 🌌`,
}

it('Should be able to sign in', () => {
  cy.visit('/')

  // Sign in page
  cy.get('[data-cy="authenticated-avatar"]').should('not.exist')
  cy.get('[data-cy="avatar"]').should('exist')
  cy.get('[data-cy="avatar"]').click()
  cy.get('[data-cy="menu-sign-up"]').click()

  // User signs up
  cy.get('[data-cy="sign-up"]').should('be.visible')
  cy.get('[ data-cy="username-input"]').type(newUser.username)
  cy.get('[ data-cy="email-input"]').type(newUser.email)
  cy.get('[ data-cy="password-input"]').type(newUser.password)
  cy.get('[ data-cy="confirm-password-input"]').type(newUser.password)

  //  Toggeling password
  cy.get('[data-cy="toggle-password-button"]').click()
  cy.get('[data-cy="toggle-password-button"]').click()

  cy.get('[data-cy="sign-up-button"]').click()
})
