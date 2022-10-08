const COMMENT = "I just liked my own blog article, how fun isn't that 😆"

it('should be able to like and comment on an article', () => {
  cy.visit('/')

  // Gets redirected to the article
  cy.get('[data-cy="article-link"]').click()

  //   Likes the article
  cy.get('[data-cy="like-button"]').click()

  // Comments on the article
  cy.get('[data-cy="comment-teaxtarea"]').type(COMMENT)
  cy.get('[data-cy="post-comment-button"]').click()
})
