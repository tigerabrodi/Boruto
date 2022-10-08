import { faker } from '@faker-js/faker'

const DEMO_AVATAR = 'demo-avatar.jpg'

const newUser = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  fullName: faker.name.fullName(),
  age: '21',
  location: 'Tokyo, Japan',
  bio: faker.random.words(7),
}

it('Sign up and create an account', () => {
  cy.visit('/')

  // Redirected to "sign up" page
  cy.findByRole('button', { name: 'profile' }).should('not.exist')
  cy.findByRole('button', { name: 'unauthenticated nav menu' }).should(
    'be.visible'
  )

  // cy.get('[data-cy="authenticated-avatar"]').should('not.exist')
  // cy.get('[data-cy="avatar"]').should('exist')
  // cy.get('[data-cy="avatar"]').click()
  // cy.get('[data-cy="menu-sign-up"]').click()

  // User signs up
  // cy.get('[data-cy="sign-up"]').should('be.visible')
  // cy.get('[ data-cy="username-input"]').type(newUser.username)
  // cy.get('[ data-cy="email-input"]').type(newUser.email)
  // cy.get('[ data-cy="password-input"]').type(newUser.password)
  // cy.get('[ data-cy="confirm-password-input"]').type(newUser.password)

  // //  Toggeling password
  // cy.get('[data-cy="toggle-password-button"]').click()
  // cy.get('[data-cy="toggle-password-button"]').click()

  // // Redirected to "create account" page
  // cy.get('[data-cy="sign-up-button"]').click()

  // // User creates account
  // cy.get('[data-cy="create-account-container"]').should('be.visible')
  // cy.get('[data-cy="create-account-title"]').should('be.visible')
  // cy.get('[data-cy="create-account-file-input"]').attachFile(DEMO_AVATAR)
  // cy.get('[data-cy="create-account-name-input"]').type(newUser.fullName)
  // cy.get('[data-cy="create-account-age-input"]').type(newUser.age)
  // cy.get('[data-cy="create-account-location-input"]').type(newUser.location)
  // cy.get('[data-cy="create-account-bio-teaxarea"]').type(newUser.bio)

  // // Done button --> gets redirected to users profile
  // cy.get('[data-cy="create-account-button"]').click()
})
