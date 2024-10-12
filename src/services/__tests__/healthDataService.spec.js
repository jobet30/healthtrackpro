/// <reference types="cypress" />

describe('Health Data Service Tests', () => {
  const userId = 'testUserId'
  let recordId

  beforeEach(() => {
    cy.request('POST', '/api/resetDatabase') // Reset database before each test
  })

  it('should add health data', () => {
    const healthData = {
      userId,
      weight: 70,
      height: 175,
      bloodPressure: '120/80',
    }

    cy.request('POST', '/api/healthData', healthData).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('userId', userId)
      expect(response.body).to.have.property('weight', healthData.weight)
      recordId = response.body.id // Store recordId for later use
    })
  })

  it('should retrieve health data', () => {
    const healthData = {
      userId,
      weight: 70,
      height: 175,
      bloodPressure: '120/80',
    }

    cy.request('POST', '/api/healthData', healthData).then(() => {
      cy.request('GET', `/api/healthData/${userId}`).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('userId', userId)
        expect(response.body).to.have.property('weight', healthData.weight)
      })
    })
  })

  it('should update health data', () => {
    const healthData = {
      userId,
      weight: 70,
      height: 175,
      bloodPressure: '120/80',
    }

    cy.request('POST', '/api/healthData', healthData).then(response => {
      recordId = response.body.id

      const updatedHealthData = {
        userId,
        recordId,
        weight: 75,
        height: 180,
        bloodPressure: '125/85',
      }

      cy.request('PUT', `/api/healthData/${recordId}`, updatedHealthData).then(
        response => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property(
            'weight',
            updatedHealthData.weight,
          )
        },
      )
    })
  })

  it('should delete health data', () => {
    const healthData = {
      userId,
      weight: 70,
      height: 175,
      bloodPressure: '120/80',
    }

    cy.request('POST', '/api/healthData', healthData).then(response => {
      recordId = response.body.id

      cy.request('DELETE', `/api/healthData/${recordId}`).then(response => {
        expect(response.status).to.eq(200)
      })

      cy.request('GET', `/api/healthData/${recordId}`).then(response => {
        expect(response.status).to.eq(404) // Expecting 404 when trying to retrieve deleted data
      })
    })
  })

  it('should retrieve all health data for a user', () => {
    const healthData1 = {
      userId,
      weight: 70,
      height: 175,
      bloodPressure: '120/80',
    }

    const healthData2 = {
      userId,
      weight: 75,
      height: 180,
      bloodPressure: '125/85',
    }

    cy.request('POST', '/api/healthData', healthData1)
    cy.request('POST', '/api/healthData', healthData2)

    cy.request('GET', `/api/healthData/all/${userId}`).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array').that.has.lengthOf(2) // Ensuring two records exist
    })
  })
})
