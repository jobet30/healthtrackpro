<template>
  <div class="login-container">
    <h1 class="login-title">Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          id="username"
          v-model="credentials.username"
          class="form-input"
          required
        />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          v-model="credentials.password"
          class="form-input"
          required
        />
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-login">Login</button>
        <button type="button" @click="goToSignup" class="btn-signup">
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    handleLogin() {
      // Implement your login logic here
      alert(`Logging in with ${this.credentials.username}`)
    },
    goToSignup() {
      this.$router.push({ name: 'Signup' })
    },
  },
}
</script>

<style scoped lang="scss">
$primary-color: #007bff;
$background-color: #f8f9fa;
$text-color: #343a40;
$input-border-color: #ced4da;
$input-focus-color: #80bdff;
$box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: $background-color;
  box-shadow: $box-shadow;

  .login-title {
    font-size: 2rem;
    font-weight: bold;
    color: $text-color;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .login-form {
    display: flex;
    flex-direction: column;

    .form-group {
      margin-bottom: 1.5rem;

      .form-label {
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: $text-color;
      }

      .form-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid $input-border-color;
        border-radius: 0.25rem;

        &:focus {
          border-color: $input-focus-color;
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba($primary-color, 0.25);
        }
      }
    }

    .form-actions {
      display: flex;
      justify-content: space-between;

      .btn-login,
      .btn-signup {
        padding: 0.75rem 1.25rem;
        border: none;
        border-radius: 0.25rem;
        color: #fff;
        cursor: pointer;
        font-weight: bold;

        &.btn-login {
          background-color: $primary-color;

          &:hover {
            background-color: darken($primary-color, 10%);
          }
        }

        &.btn-signup {
          background-color: $text-color;

          &:hover {
            background-color: darken($text-color, 10%);
          }
        }
      }
    }
  }
}
</style>
