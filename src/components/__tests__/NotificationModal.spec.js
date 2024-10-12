describe('NotificationModal Component', () => {
  beforeEach(() => {
    cy.visit('/') // Replace with the appropriate route to access the modal
  })

  it('should not be visible initially', () => {
    cy.get('.notification-modal').should('not.exist')
  })

  it('should display success message when registration is successful', () => {
    cy.get('.register-button').click() // Simulate registration success
    cy.get('.notification-modal').should('be.visible')
    cy.get('.notification-modal').should('contain', 'Registration successful')
  })

  it('should display error message for registration failure', () => {
    cy.get('.register-button').click() // Simulate registration failure
    cy.get('.notification-modal').should('be.visible')
    cy.get('.notification-modal').should('contain', 'Email already exists')
  })

  it('should close the modal when the close button is clicked', () => {
    cy.get('.register-button').click()
    cy.get('.notification-modal .close-button').click()
    cy.get('.notification-modal').should('not.exist')
  })

  it('should close the modal when clicking outside the modal', () => {
    cy.get('.register-button').click()
    cy.get('.notification-modal').click('topRight')
    cy.get('.notification-modal').should('not.exist')
  })

  it('should display correct message for profile updates', () => {
    cy.get('.update-profile-button').click() // Simulate profile update
    cy.get('.notification-modal').should('be.visible')
    cy.get('.notification-modal').should(
      'contain',
      'Profile updated successfully',
    )
  })

  it('should display error message for profile update failure', () => {
    cy.get('.update-profile-button').click() // Simulate profile update failure
    cy.get('.notification-modal').should('be.visible')
    cy.get('.notification-modal').should('contain', 'Error updating profile')
  })
})
