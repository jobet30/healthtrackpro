describe('Profile Component', () => {
  beforeEach(() => {
    cy.visit('/profile')
  })

  it('should display user profile information', () => {
    cy.get('.profile-info').should('be.visible')
    cy.get('.username').should('contain', 'Test User')
    cy.get('.email').should('contain', 'testuser@example.com')
  })

  it('should allow user to update profile information', () => {
    cy.get('.edit-profile-button').click()
    cy.get('input[name="username"]').clear().type('Updated User')
    cy.get('input[name="email"]').clear().type('updateduser@example.com')
    cy.get('.save-button').click()
    cy.get('.modals')
      .should('be.visible')
      .should('contain', 'Profile updated successfully')
  })

  it('should show error message for invalid email', () => {
    cy.get('.edit-profile-button').click()
    cy.get('input[name="email"]').clear().type('invalid-email')
    cy.get('.save-button').click()
    cy.get('.error-message')
      .should('be.visible')
      .should('contain', 'Invalid email format')
  })

  it('should reset fields when cancel button is clicked', () => {
    cy.get('.edit-profile-button').click()
    cy.get('input[name="username"]').clear().type('Temp User')
    cy.get('.cancel-button').click()
    cy.get('.username').should('contain', 'Test User')
  })

  it('should display loading state during update', () => {
    cy.get('.edit-profile-button').click()
    cy.get('input[name="username"]').clear().type('Loading User')
    cy.get('.save-button').click()
    cy.get('.loading-indicator').should('be.visible')
  })
})
