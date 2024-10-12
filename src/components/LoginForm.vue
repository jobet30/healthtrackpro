<template>
  <div class="login-form">
    <div class="form-container">
      <h2 class="title">Login</h2>
      <form @submit.prevent="handleLogin">
        <v-text-field
          v-model="email"
          label="Email"
          :rules="[rules.required, rules.email]"
          outlined
          class="input-field"
        />
        <v-text-field
          v-model="password"
          label="Password"
          :rules="[rules.required, rules.password]"
          type="password"
          outlined
          class="input-field"
        />
        <v-btn type="submit" color="primary" class="submit-btn">Login</v-btn>
      </form>
      <p class="link">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import authService from '@/services/authService'

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      errorMessages: {
        email: '',
        password: '',
      },
    }
  },

  methods: {
    resetError() {
      this.errorMessage = ''
      this.errorMessages.email = ''
      this.errorMessages.password = ''
    },
    validateForm() {
      let isValid = true

      if (!this.email) {
        this.errorMessages.email = 'Email is required'
        isValid = false
      } else if (!this.isValidEmail(this.email)) {
        this.errorMessages.email = 'Email is not valid'
        isValid = false
      }

      if (!this.password) {
        this.errorMessages.password = 'Password is required.'
        isValid = false
      }
    },

    isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    },

    sanitizeInput(input) {
      return input.replace(/<[^>]*>/g, '').trim()
    },

    async handleLogin() {
      this.resetError()
      this.errorMessage = ''

      if (!this.validateForm()) {
        return
      }

      const sanitizedEmail = this.sanitizeInput(this.email)
      const sanitizedPassword = this.sanitizeInput(this.password)

      try {
        const response = await authService.login(
          sanitizedEmail,
          sanitizedPassword,
        )
        this.$emit('login-success', response)
      } catch (error) {
        this.errorMessage = error.message || 'Login failed. Please try again'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$primary-color: #1d4ed8;
$secondary-color: #f3f4f6;
$error-color: #dc2626;
$border-radius: 0.375rem;
$transition-duration: 0.3s;

.login-form {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: $secondary-color;
  padding: 1rem;

  form {
    @apply bg-white p-6 rounded-lg shadow-md w-80;
    transition: box-shadow $transition-duration;

    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    h2 {
      @apply text-2xl font-bold mb-4 text-center text-gray-800;
    }

    input {
      @apply mt-1 block w-full p-2 border border-gray-300 rounded-md;
      background-color: $secondary-color;
      color: #333;
      transition:
        border-color $transition-duration,
        box-shadow $transition-duration;

      &::placeholder {
        color: #a1a1aa;
      }

      &:focus {
        @apply focus:outline-none focus:ring-2 focus:ring-blue-500;
        border-color: $primary-color;
        box-shadow: 0 0 5px rgba($primary-color, 0.5);
      }
    }

    button {
      @apply w-full bg-blue-600 text-white py-2 rounded-md;
      transition:
        background-color $transition-duration,
        transform $transition-duration;

      &:hover {
        @apply bg-blue-700;
        transform: translateY(-2px);
      }

      &:active {
        @apply bg-blue-800;
        transform: translateY(0);
      }
    }

    .text-red-600 {
      @apply text-red-600 text-sm mt-2;
    }

    .error-message {
      @apply text-center;
      color: $error-color;
      font-weight: bold;
      margin-top: 1rem;
    }
  }

  @media (max-width: 640px) {
    form {
      width: 95%;
      padding: 4;
      border-radius: $border-radius;
    }

    h2 {
      font-size: 1.5rem;
    }

    input {
      padding: 1.5rem;
    }

    button {
      padding: 1.5rem;
    }
  }
}
</style>
