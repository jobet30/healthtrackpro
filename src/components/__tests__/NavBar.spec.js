describe('Navbar Component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render the Navbar', () => {
    cy.get('nav').should('exist')
    cy.get('a').should('have.length.greaterThan', 0)
  })

  it('should navigate to the Login page', () => {
    cy.get('a').contains('Login').click()
    cy.url().should('include', '/login')
  })

  it('should navigate to the Register page', () => {
    cy.get('a').contains('Register').click()
    cy.url().should('include', '/register')
  })

  it('should navigate to the Profile page when logged in', () => {
    cy.login() // Custom command to log in a user
    cy.get('a').contains('Profile').click()
    cy.url().should('include', '/profile')
  })

  it('should show the logout button when logged in', () => {
    cy.login()
    cy.get('button').contains('Logout').should('exist')
  })

  it('should log out and navigate to Login page', () => {
    cy.login()
    cy.get('button').contains('Logout').click()
    cy.url().should('include', '/login')
  })

  it('should display the logo', () => {
    cy.get('img[alt="Logo"]').should('exist')
  })

  it('should have a mobile menu toggle', () => {
    cy.get('.mobile-menu-toggle').should('exist').click()
    cy.get('.navbar-menu').should('be.visible')
  })

  it('should close the mobile menu when a link is clicked', () => {
    cy.get('.mobile-menu-toggle').click()
    cy.get('a').contains('Login').click()
    cy.get('.navbar-menu').should('not.be.visible')
  })

  it('should highlight the active link', () => {
    cy.get('a').contains('Home').click()
    cy.get('a.active').should('contain', 'Home')
  })
})
