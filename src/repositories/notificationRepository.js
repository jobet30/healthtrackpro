import { db } from '../utils/apiUtils'

class NotificationRepository {
  constructor() {
    this.collection = db.collection('notifications')
  }

  /**
   * Add a new notification to the system.
   * @param {Object} notificationData - The notification data object.
   * @returns {Object} The added notification data with the generated ID.
   */
  async addNotification(notificationData) {
    try {
      const notificationRef = await this.collection.add({
        ...notificationData,
        isRead: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      return { id: notificationRef.id, ...notificationData }
    } catch (error) {
      throw new Error('Error adding notification: ' + error.message)
    }
  }

  /**
   * Get all notifications for a specific user.
   * @param {string} userId - The ID of the user.
   * @param {boolean} [unreadOnly=false] - Flag to filter only unread notifications.
   * @returns {Array<Object>} Array of notification objects.
   */
  async getNotificationsByUserId(userId, unreadOnly = false) {
    try {
      let query = this.collection.where('userId', '==', userId)

      if (unreadOnly) {
        query = query.where('isRead', '==', false)
      }

      const snapshot = await query.orderBy('createdAt', 'desc').get()
      if (snapshot.empty)
        throw new Error('No notifications found for this user.')

      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      throw new Error('Error retrieving notifications: ' + error.message)
    }
  }

  /**
   * Mark a specific notification as read by its ID.
   * @param {string} notificationId - The ID of the notification.
   * @returns {Object} The updated notification with the read status set to true.
   */
  async markNotificationAsRead(notificationId) {
    try {
      const notificationRef = this.collection.doc(notificationId)
      await notificationRef.update({
        isRead: true,
        updatedAt: new Date().toISOString(),
      })
      return { id: notificationId, isRead: true }
    } catch (error) {
      throw new Error('Error marking notification as read: ' + error.message)
    }
  }

  /**
   * Mark all notifications for a user as read.
   * @param {string} userId - The ID of the user.
   * @returns {Array<Object>} Array of updated notification objects.
   */
  async markAllNotificationsAsRead(userId) {
    try {
      const snapshot = await this.collection
        .where('userId', '==', userId)
        .where('isRead', '==', false)
        .get()

      if (snapshot.empty) return []

      const batch = db.batch()
      const updatedNotifications = []

      snapshot.docs.forEach(doc => {
        const notificationRef = this.collection.doc(doc.id)
        batch.update(notificationRef, {
          isRead: true,
          updatedAt: new Date().toISOString(),
        })
        updatedNotifications.push({ id: doc.id, ...doc.data(), isRead: true })
      })

      await batch.commit()
      return updatedNotifications
    } catch (error) {
      throw new Error(
        'Error marking all notifications as read: ' + error.message,
      )
    }
  }

  /**
   * Delete a specific notification by its ID.
   * @param {string} notificationId - The ID of the notification.
   * @returns {Object} Confirmation message for deletion.
   */
  async deleteNotification(notificationId) {
    try {
      await this.collection.doc(notificationId).delete()
      return { message: 'Notification deleted successfully' }
    } catch (error) {
      throw new Error('Error deleting notification: ' + error.message)
    }
  }

  /**
   * Delete all notifications for a specific user.
   * @param {string} userId - The ID of the user.
   * @returns {Object} Confirmation message for bulk deletion.
   */
  async deleteAllNotificationsByUserId(userId) {
    try {
      const snapshot = await this.collection.where('userId', '==', userId).get()

      if (snapshot.empty) return { message: 'No notifications found to delete' }

      const batch = db.batch()
      snapshot.docs.forEach(doc => {
        const notificationRef = this.collection.doc(doc.id)
        batch.delete(notificationRef)
      })

      await batch.commit()
      return { message: 'All notifications deleted successfully' }
    } catch (error) {
      throw new Error('Error deleting all notifications: ' + error.message)
    }
  }

  /**
   * Retrieve notifications within a specific time range.
   * @param {string} userId - The ID of the user.
   * @param {string} startDate - Start date (ISO format) for the range.
   * @param {string} endDate - End date (ISO format) for the range.
   * @returns {Array<Object>} Array of notifications within the date range.
   */
  async getNotificationsByDateRange(userId, startDate, endDate) {
    try {
      const snapshot = await this.collection
        .where('userId', '==', userId)
        .where('createdAt', '>=', startDate)
        .where('createdAt', '<=', endDate)
        .orderBy('createdAt', 'desc')
        .get()

      if (snapshot.empty)
        throw new Error('No notifications found within the date range.')

      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      throw new Error(
        'Error retrieving notifications by date range: ' + error.message,
      )
    }
  }

  /**
   * Aggregate notification data for analytics (e.g., unread count, read count).
   * @param {string} userId - The ID of the user.
   * @returns {Object} Aggregated notification data (e.g., read and unread counts).
   */
  async getNotificationAnalytics(userId) {
    try {
      const snapshot = await this.collection.where('userId', '==', userId).get()

      if (snapshot.empty)
        throw new Error('No notifications found for this user.')

      let readCount = 0,
        unreadCount = 0
      snapshot.docs.forEach(doc => {
        const { isRead } = doc.data()
        if (isRead) readCount++
        else unreadCount++
      })

      return {
        totalNotifications: readCount + unreadCount,
        readCount,
        unreadCount,
      }
    } catch (error) {
      throw new Error('Error aggregating notification data: ' + error.message)
    }
  }
}

export default new NotificationRepository()
