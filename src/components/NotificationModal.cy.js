import NotificationModal from './NotificationModal.vue'

describe('<NotificationModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(NotificationModal)
  })
})