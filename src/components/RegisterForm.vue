<template>
  <div class="register-form">
    <div class="form-container">
      <h2 class="title">Register</h2>
      <form @submit.prevent="handleRegister">
        <v-text-field
          v-model="name"
          label="Full Name"
          :rules="[rules.required]"
          outlined
          class="input-field"
        />
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
        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          :rules="[rules.required, confirmPasswordRule]"
          type="password"
          outlined
          class="input-field"
        />
        <v-btn type="submit" color="primary" class="submit-btn">Register</v-btn>
      </form>
      <p class="link">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import { email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rules: {
        required: value => !!value || 'Required.',
        email: value => email(value) || 'Invalid email.',
        password: value => {
          const hasUpperCase = /[A-Z]/.test(value)
          const hasNumber = /\d/.test(value)
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)

          return (
            (hasUpperCase && hasNumber && hasSpecialChar) ||
            'Password must have at least one uppercase letter, one number, and one special character.'
          )
        },
      },
    }
  },
  computed: {
    confirmPasswordRule() {
      return value => {
        return value === this.password || 'Passwords do not match.'
      }
    },
  },

  methods: {
    ...mapActions('auth', [register]),
    sanitizeInput(input){
        return input.replace(/<[^>]*>/g, '').trim();
    }
  },
  async handleRegister(){
    const sanitizedUserData = {
        name: this.sanitizeInput(this.name),
        email: this.sanitizeInput(this.email),
        password: this.sanitizeInput(this.password);
    };

    try{
        await this.register(sanitizedUserData);
    }catch(error){
        console.error(error);
    }
  }
}
</script>

<style lang="scss" scoped>
$primary-color: #1e88e5;
$background-color: #f9f9f9;
$form-width: 400px;

.register-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: $background-color;

  .form-container {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: $form-width;

    .title {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 2rem;
      color: #333;
      font-weight: bold;
    }

    .input-field {
      margin-bottom: 1.5rem;
      width: 100%;

      input {
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 4px;

        &:focus {
          border-color: $primary-color;
          box-shadow: 0 0 5px rgba($primary-color, 0.5);
        }
      }
    }

    .submit-btn {
      width: 100%;
      padding: 0.8rem;
      font-size: 1.1rem;
      background-color: $primary-color;
      color: #fff;

      &:hover {
        background-color: darken($primary-color, 10%);
      }
    }

    .link {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;

      a {
        color: $primary-color;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
    max-width: 100%;
  }
}
</style>
