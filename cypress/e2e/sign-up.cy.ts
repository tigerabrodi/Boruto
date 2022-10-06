const DEMO_AVATAR = 'demo-avatar.jpg'
const newUser = {
  username: 'cat_lover123',
  email: 'annachan@gmail.com',
  password: 'demonslayer123',
  fullName: 'Anna Chan',
  age: '21',
  location: 'Tokyo, Japan',
  bio: `Technical Writer and Full Stack Developer ✨`,
}

it('Sign up and create an account', () => {
  cy.visit('/')

  // Redirected to "sign up" page
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

  // Redirected to "create account" page
  cy.get('[data-cy="sign-up-button"]').click()

  // User creates account
  cy.get('[data-cy="create-account-container"]').should('be.visible')
  cy.get('[data-cy="create-account-title"]').should('be.visible')
  cy.get('[data-cy="create-account-file-input"]').attachFile(DEMO_AVATAR)
  cy.get('[data-cy="create-account-name-input"]').type(newUser.fullName)
  cy.get('[data-cy="create-account-age-input"]').type(newUser.age)
  cy.get('[data-cy="create-account-location-input"]').type(newUser.location)
  cy.get('[data-cy="create-account-bio-teaxarea"]').type(newUser.bio)

  // Done button --> gets redirected to users profile
  cy.get('[data-cy="create-account-button"]').click()
})
