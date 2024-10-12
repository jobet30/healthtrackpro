describe('RegisterForm Component', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('should render the Register form', () => {
    cy.get('form').should('exist')
    cy.get('input[name="username"]').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('should register a new user with valid inputs', () => {
    cy.get('input[name="username"]').type('testUser')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('Password123!')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')
    cy.get('.notification-modal').should('contain', 'Registration successful')
  })

  it('should show error for existing email', () => {
    cy.get('input[name="username"]').type('testUser')
    cy.get('input[name="email"]').type('existing@example.com')
    cy.get('input[name="password"]').type('Password123!')
    cy.get('button[type="submit"]').click()
    cy.get('.notification-modal').should('contain', 'Email already exists')
  })

  it('should show validation error for invalid email', () => {
    cy.get('input[name="username"]').type('testUser')
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('input[name="password"]').type('Password123!')
    cy.get('button[type="submit"]').click()
    cy.get('.notification-modal').should('contain', 'Invalid email format')
  })

  it('should show validation error for weak password', () => {
    cy.get('input[name="username"]').type('testUser')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('weak')
    cy.get('button[type="submit"]').click()
    cy.get('.notification-modal').should(
      'contain',
      'Password must be at least 8 characters long and include a number and a special character',
    )
  })

  it('should clear input fields after successful registration', () => {
    cy.get('input[name="username"]').type('testUser')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('Password123!')
    cy.get('button[type="submit"]').click()
    cy.get('input[name="username"]').should('have.value', '')
    cy.get('input[name="email"]').should('have.value', '')
    cy.get('input[name="password"]').should('have.value', '')
  })

  it('should show error if form is submitted without required fields', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.notification-modal').should('contain', 'All fields are required')
  })
})
