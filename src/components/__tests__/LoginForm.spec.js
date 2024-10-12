describe('LoginForm Component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render the LoginForm', () => {
    cy.get('form').should('exist')
    cy.get('input[type="text"]')
      .should('exist')
      .and('have.attr', 'placeholder', 'Username')
    cy.get('input[type="password"]')
      .should('exist')
      .and('have.attr', 'placeholder', 'Password')
    cy.get('button[type="submit"]').should('exist').and('contain', 'Login')
  })

  it('should display validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error-message').should('exist')
    cy.get('.error-message').should('contain', 'Username is required')
    cy.get('.error-message').should('contain', 'Password is required')
  })

  it('should sanitize user input', () => {
    const username = '<script>alert("XSS")</script>'
    const password = 'Password123!'
    cy.get('input[type="text"]').type(username)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.get('input[type="text"]').should('have.value', '')
  })

  it('should submit the form with valid input', () => {
    cy.get('input[type="text"]').type('validUser')
    cy.get('input[type="password"]').type('ValidPassword123!')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })

  it('should show error on invalid login', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    }).as('loginRequest')
    cy.get('input[type="text"]').type('invalidUser')
    cy.get('input[type="password"]').type('InvalidPassword')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginRequest')
    cy.get('.error-message').should('exist')
    cy.get('.error-message').should('contain', 'Invalid credentials')
  })

  it('should disable the submit button while loading', () => {
    cy.intercept('POST', '/api/login', {
      delay: 1000,
      statusCode: 200,
      body: { token: 'dummyToken' },
    }).as('loginRequest')
    cy.get('input[type="text"]').type('validUser')
    cy.get('input[type="password"]').type('ValidPassword123!')
    cy.get('button[type="submit"]').click()
    cy.get('button[type="submit"]').should('be.disabled')
    cy.wait('@loginRequest')
    cy.get('button[type="submit"]').should('not.be.disabled')
  })

  it('should show a success message upon successful login', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: { token: 'dummyToken' },
    }).as('loginRequest')
    cy.get('input[type="text"]').type('validUser')
    cy.get('input[type="password"]').type('ValidPassword123!')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginRequest')
    cy.get('.success-message')
      .should('exist')
      .and('contain', 'Login successful!')
  })

  it('should handle API errors gracefully', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('loginRequest')
    cy.get('input[type="text"]').type('validUser')
    cy.get('input[type="password"]').type('ValidPassword123!')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginRequest')
    cy.get('.error-message')
      .should('exist')
      .and('contain', 'Internal Server Error')
  })

  it('should not allow form submission when inputs are invalid', () => {
    cy.get('input[type="text"]').type('validUser')
    cy.get('input[type="password"]').type('short')
    cy.get('button[type="submit"]').should('be.disabled')
  })
})
