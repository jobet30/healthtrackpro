import ChartComponent1 from './ChartComponent1.vue'

describe('<ChartComponent1 />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ChartComponent1)
  })
})