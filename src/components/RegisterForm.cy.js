import RegisterForm from '../views/RegisterForm.vue'

describe('<RegisterForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(RegisterForm)
  })
})
