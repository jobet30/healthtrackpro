<template>
  <div class="profile-container">
    <h1 class="profile-title">User Profile</h1>
    <form @submit.prevent="updateProfile" class="profile-form">
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          id="username"
          v-model="user.username"
          @blur="sanitizeInput('username')"
          class="form-input"
          required
        />
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          @blur="sanitizeInput('email')"
          class="form-input"
          required
        />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          v-model="user.password"
          class="form-input"
          required
        />
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-update">Update Profile</button>
        <button type="button" @click="logout" class="btn-logout">Logout</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
    }
  },
  mounted() {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile() {
      const storedUser = JSON.parse(localStorage.getItem('userProfile'))
      if (storedUser) {
        this.user = storedUser
      }
    },
    sanitizeInput(field) {
      this.user[field] = this.user[field].trim().replace(/<[^>]*>/g, '')
    },
    updateProfile() {
      localStorage.setItem('userProfile', JSON.stringify(this.user))
      alert('Profile updated successfully')
    },
    logout() {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userProfile')
      this.$router.push({ name: 'Login' })
    },
  },
}
</script>
<style scoped lang="scss">
$primary-color: #007bff;
$secondary-color: #dc3545;
$background-color: #f8f9fa;
$text-color: #343a40;
$input-border-color: #ced4da;
$input-focus-color: #80bdff;
$box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

@mixin transition($property, $duration) {
  transition: $property $duration;
}

.profile-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: $background-color;
  box-shadow: $box-shadow;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  .profile-title {
    font-size: 2rem;
    font-weight: bold;
    color: $text-color;
    margin-bottom: 1rem;
    text-align: center;
  }

  .profile-form {
    display: flex;
    flex-direction: column;

    .form-group {
      margin-bottom: 1.5rem;

      .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: $text-color;
      }

      .form-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid $input-border-color;
        border-radius: 0.25rem;
        @include transition(border-color, 0.2s);

        &:focus {
          border-color: $input-focus-color;
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba($primary-color, 0.25);
        }

        &::placeholder {
          color: lighten($text-color, 30%);
        }
      }
    }

    .form-actions {
      display: flex;
      justify-content: space-between;

      .btn-update,
      .btn-logout {
        padding: 0.75rem 1.25rem;
        border: none;
        border-radius: 0.25rem;
        color: #fff;
        cursor: pointer;
        @include transition(background-color, 0.2s);
        font-weight: bold;

        &.btn-update {
          background-color: $primary-color;

          &:hover {
            background-color: darken($primary-color, 10%);
          }
        }

        &.btn-logout {
          background-color: $secondary-color;

          &:hover {
            background-color: darken($secondary-color, 10%);
          }
        }
      }
    }
  }
}
</style>
