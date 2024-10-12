import ChartComponent2 from './ChartComponent2.vue'

describe('<ChartComponent2 />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ChartComponent2)
  })
})