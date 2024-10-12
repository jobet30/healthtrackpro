<template>
  <nav class="navbar">
    <div class="container">
      <div class="brand">HealthTrackPro</div>
      <div class="menu" @mouseleave="closeDropdown">
        <button class="menu-button" @click="toggleMenu">
          <span>{{ isAuthenticated ? userName : 'Menu' }}</span>
          <svg
            class="icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div v-if="menuOpen" class="dropdown">
          <ul>
            <li v-if="!isAuthenticated">
              <router-link to="/login" class="dropdown-item">Login</router-link>
            </li>
            <li v-if="!isAuthenticated">
              <router-link to="/register" class="dropdown-item"
                >Register</router-link
              >
            </li>
            <li v-if="isAuthenticated">
              <router-link to="/dashboard" class="dropdown-item"
                >Dashboard</router-link
              >
            </li>
            <li v-if="isAuthenticated">
              <button @click="logout" class="dropdown-item">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      userName: 'User',
      menuOpen: false,
    }
  },
  mounted() {
    this.checkAuthStatus()
  },
  methods: {
    checkAuthStatus() {
      this.isAuthenticated = localStorage.getItem('authToken') !== null
      this.userName = localStorage.getItem('userName') || 'User'
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    closeDropdown() {
      this.menuOpen = false
    },
    logout() {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userName')
      this.checkAuthStatus()
      this.$router.push({ name: 'Login' })
    },
  },
}
</script>
<style lang="scss" scoped>
$primary-color: #1f2937;
$secondary-color: #ffffff;
$hover-color: #e5e7eb;

.navbar {
  background-color: $primary-color;
  padding: 1rem;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .brand {
      color: $secondary-color;
      font-size: 1.5rem;
      font-weight: bold;
    }

    .menu {
      position: relative;

      .menu-button {
        background: none;
        border: none;
        color: $secondary-color;
        font-size: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:focus {
          outline: none;
        }

        .icon {
          width: 1rem;
          height: 1rem;
          margin-left: 0.5rem;
        }
      }

      .dropdown {
        position: absolute;
        right: 0;
        margin-top: 0.5rem;
        background: $secondary-color;
        border-radius: 0.375rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 50;

        ul {
          list-style: none;
          margin: 0;
          padding: 0;

          .dropdown-item {
            display: block;
            padding: 0.5rem 1rem;
            color: $primary-color;
            text-decoration: none;

            &:hover {
              background-color: $hover-color;
            }
          }
        }
      }
    }
  }

  @media (max-width: 640px) {
    .container {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
