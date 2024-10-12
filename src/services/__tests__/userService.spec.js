describe('User Service Tests', () => {
  const userId = 'testUserId'
  const userProfile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
  }

  beforeEach(() => {
    cy.request('POST', '/api/resetDatabase') // Reset the database before each test
  })

  it('should create a new user profile', () => {
    cy.request('POST', `/api/users`, { userId, ...userProfile }).then(
      response => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id', userId)
        expect(response.body).to.have.property('name', userProfile.name)
        expect(response.body).to.have.property('email', userProfile.email)
      },
    )
  })

  it('should retrieve the user profile', () => {
    cy.request('POST', `/api/users`, { userId, ...userProfile }).then(() => {
      cy.request('GET', `/api/users/${userId}`).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id', userId)
        expect(response.body).to.have.property('name', userProfile.name)
        expect(response.body).to.have.property('email', userProfile.email)
      })
    })
  })

  it('should update the user profile', () => {
    const updatedProfile = {
      name: 'Jane Doe',
      email: 'janedoe@example.com',
    }

    cy.request('POST', `/api/users`, { userId, ...userProfile }).then(() => {
      cy.request('PUT', `/api/users/${userId}`, updatedProfile).then(
        response => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', userId)
          expect(response.body).to.have.property('name', updatedProfile.name)
          expect(response.body).to.have.property('email', updatedProfile.email)
        },
      )
    })
  })

  it('should delete the user profile', () => {
    cy.request('POST', `/api/users`, { userId, ...userProfile }).then(() => {
      cy.request('DELETE', `/api/users/${userId}`).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property(
          'message',
          'User profile deleted successfully.',
        )
      })
    })
  })

  it('should return all user profiles', () => {
    cy.request('POST', `/api/users`, { userId, ...userProfile })
    cy.request('POST', `/api/users`, {
      userId: 'testUserId2',
      name: 'Alice',
      email: 'alice@example.com',
    })

    cy.request('GET', `/api/users`).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body.length).to.be.gte(2)
    })
  })
})
