class notificationUtils {
  constructor() {
    this.notifications = []
  }

  addNotification(notification) {
    try {
      this.validateNotification(notification)
      const formattedNotification = this.formatNotification(notification)
      this.notifications.push(formattedNotification)
      localStorage.setItem('notifications', JSON.stringify(this.notifications))
    } catch (error) {
      console.error(error)
    }
  }

  getStoredNotification() {
    const storedNotifications = localStorage.getItem('notifications')
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications)
    }
    return this.notifications
  }

  static getErrorMessage(error) {
    if (error.response) {
      const { status, data } = error.response
      const message = data?.message || 'An error occurred'

      switch (status) {
        case 400:
          return `Bad Request: ${message}`
        case 401:
          return `Unauthorized: ${message}`
        case 403:
          return `Forbidden: ${message}`
        case 404:
          return `Not Found: ${message}`
        case 500:
          return `Internal Server Error: ${message}`
        default:
          return `Error: ${message}`
      }
    } else if (error.request) {
      return 'Network Error: Unable to connect to the server'
    } else {
      return `Error: ${error.message}`
    }
  }

  static formatNotification(notification) {
    const { title, message, timestamp } = notification
    const formattedTimestamp = timestamp
      ? new Date(timestamp).toLocaleString()
      : new Date().toLocaleString()
    return {
      title,
      message,
      timestamp: formattedTimestamp,
      isRead: notification.isRead || false,
    }
  }

  static validateNotification(notification) {
    const { title, message } = notification
    if (!title || !message) {
      throw new Error('Title and message are required')
    }
    if (!message || message.trim() === '') {
      throw new Error('Message cannot be empty')
    }

    return true
  }

  static sortNotifications(notification) {
    return notification.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
    )
  }

  markAsRead(notificationId) {
    const notificationIndex = this.notifications.findIndex(
      notification => notification.id === notificationId,
    )
    if (notificationIndex !== -1) {
      this.notifications[notificationIndex].isRead = true
      localStorage.setItem('notifications', JSON.stringify(this.notifications))
    }
  }

  markAllAsRead() {
    this.notifications.forEach(notification => (notification.isRead = true))
    localStorage.setItem('notifications', JSON.stringify(this.notifications))
  }

  removeNotification(notificationId) {
    const notificationIndex = this.notifications.findIndex(
      notification => notification.id === notificationId,
    )
    if (notificationIndex !== -1) {
      this.notifications.splice(notificationIndex, 1)
      localStorage.setItem('notifications', JSON.stringify(this.notifications))
    }
  }

  removeAllNotifications() {
    this.notifications = []
    localStorage.removeItem('notifications')
  }

  deleteNotification(notificationId) {
    const notificationIndex = this.notifications.findIndex(
      notification => notification.id === notificationId,
    )
    if (notificationIndex !== -1) {
      this.notifications.splice(notificationIndex, 1)
      localStorage.setItem('notifications', JSON.stringify(this.notifications))
    }
  }

  clearAllNotification() {
    this.notifications = []
    localStorage.removeItem('notifications')
  }
}

export default new notificationUtils()
