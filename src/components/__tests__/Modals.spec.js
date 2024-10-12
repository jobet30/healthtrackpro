describe('Modals Component', () => {
  beforeEach(() => {
    cy.visit('/') // Replace with the appropriate route to access the modals
  })

  it('should not be visible initially', () => {
    cy.get('.modals').should('not.exist')
  })

  it('should display success modal when registration is successful', () => {
    cy.get('.register-button').click() // Simulate registration success
    cy.get('.modals').should('be.visible')
    cy.get('.modals').should('contain', 'Registration successful')
  })

  it('should display error modal when registration fails', () => {
    cy.get('.register-button').click() // Simulate registration failure
    cy.get('.modals').should('be.visible')
    cy.get('.modals').should('contain', 'Email already exists')
  })

  it('should display profile update success modal', () => {
    cy.get('.update-profile-button').click() // Simulate profile update success
    cy.get('.modals').should('be.visible')
    cy.get('.modals').should('contain', 'Profile updated successfully')
  })

  it('should display error modal when profile update fails', () => {
    cy.get('.update-profile-button').click() // Simulate profile update failure
    cy.get('.modals').should('be.visible')
    cy.get('.modals').should('contain', 'Error updating profile')
  })

  it('should close the modal when the close button is clicked', () => {
    cy.get('.register-button').click()
    cy.get('.modals .close-button').click()
    cy.get('.modals').should('not.exist')
  })

  it('should close the modal when clicking outside of the modal', () => {
    cy.get('.register-button').click()
    cy.get('.modals').click('topRight')
    cy.get('.modals').should('not.exist')
  })
})
