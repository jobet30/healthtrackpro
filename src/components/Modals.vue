<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <header class="modal-header">
        <h2 class="modal-title">{{ title }}</h2>
        <button class="close-button" @click="closeModal">×</button>
      </header>
      <div class="modal-body">
        <p class="modal-message">{{ message }}</p>
      </div>
      <footer class="modal-footer">
        <button class="btn-close" @click="closeModal">Close</button>
      </footer>
    </div>
  </div>
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
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped lang="scss">
$modal-bg: rgba(0, 0, 0, 0.7);
$modal-color: #fff;
$modal-border-radius: 0.5rem;
$modal-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
$close-button-color: #333;

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
    max-width: 400px;
    overflow: hidden;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid lighten($modal-color, 10%);

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
      justify-content: center;
      padding: 1rem;
      border-top: 1px solid lighten($modal-color, 10%);

      .btn-close {
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: $modal-border-radius;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: darken(#007bff, 10%);
        }
      }
    }
  }
}
</style>
