// cypress/integration/chartComponent2.spec.js

describe('ChartComponent2 Tests', () => {
  beforeEach(() => {
    cy.visit('/dashboard') // Adjust the URL as necessary to navigate to the Dashboard
  })

  it('should render the pie chart correctly', () => {
    cy.get('[data-testid="pie-chart"]').should('be.visible')
    cy.get('[data-testid="pie-chart-title"]').should(
      'contain',
      'User Distribution',
    )
    cy.get('canvas').first().should('exist')
  })

  it('should display the correct data in the pie chart', () => {
    cy.get('canvas')
      .first()
      .then($canvas => {
        const chartInstance = $canvas[0].__chartjs_instances__[0]
        expect(chartInstance.data.datasets[0].data).to.deep.equal([55, 30, 15])
      })
  })

  it('should respond to hover events on the pie chart', () => {
    cy.get('canvas')
      .first()
      .trigger('mousemove', { force: true })
      .trigger('mouseenter', { force: true })

    cy.get('canvas').first().should('have.class', 'hover-effect') // Assuming you have defined this class in your CSS
  })

  it('should be responsive on smaller screens', () => {
    cy.viewport('iphone-6')
    cy.get('[data-testid="pie-chart"]').should('be.visible')
  })
})
