<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <header class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
          <button
            class="close-button"
            @click="closeModal"
            aria-label="Close modal"
          >
            ×
          </button>
        </header>
        <div class="modal-body">
          <p class="modal-message">{{ message }}</p>
        </div>
        <footer class="modal-footer">
          <button class="btn-close" @click="closeModal" aria-label="Close">
            Close
          </button>
          <button
            v-if="showSecondaryButton"
            class="btn-secondary"
            @click="handleSecondaryAction"
          >
            {{ secondaryButtonText }}
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NotificationModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    showSecondaryButton: {
      type: Boolean,
      default: false,
    },
    secondaryButtonText: {
      type: String,
      default: 'Okay',
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    handleSecondaryAction() {
      this.$emit('secondary-action')
    },
  },
}
</script>

<style scoped lang="scss">
$modal-bg: rgba(0, 0, 0, 0.8);
$modal-color: #fff;
$modal-border-radius: 0.5rem;
$modal-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
$close-button-color: #333;
$primary-color: #007bff;
$secondary-color: #6c757d;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $modal-bg;
  z-index: 999;

  .modal-container {
    background-color: $modal-color;
    border-radius: $modal-border-radius;
    box-shadow: $modal-shadow;
    width: 90%;
    max-width: 500px;
    overflow: hidden;
    transition: transform 0.3s ease;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid lighten($modal-color, 10%);
      background-color: lighten($modal-color, 5%);

      .modal-title {
        font-size: 1.5rem;
        color: $close-button-color;
      }

      .close-button {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: $close-button-color;
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
          color: darken($close-button-color, 20%);
        }
      }
    }

    .modal-body {
      padding: 1rem;
      color: $close-button-color;

      .modal-message {
        font-size: 1rem;
        text-align: center;
      }
    }

    .modal-footer {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      border-top: 1px solid lighten($modal-color, 10%);

      .btn-close,
      .btn-secondary {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: $modal-border-radius;
        cursor: pointer;
        transition:
          background-color 0.2s,
          transform 0.2s;
        font-weight: bold;

        &.btn-close {
          background-color: $primary-color;
          color: #fff;

          &:hover {
            background-color: darken($primary-color, 10%);
            transform: scale(1.05);
          }
        }

        &.btn-secondary {
          background-color: $secondary-color;
          color: #fff;

          &:hover {
            background-color: darken($secondary-color, 10%);
            transform: scale(1.05);
          }
        }
      }
    }
  }
}
</style>
