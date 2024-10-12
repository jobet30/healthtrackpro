import notificationService from '../services/notificationService'
import { ValidationError } from '../errors/ValidationError'

class NotificationController {
  async createNotification(req, res, next) {
    try {
      const { userId, message, type } = req.body

      if (!userId || !message || !type) {
        throw new ValidationError(
          'Missing required fields: userId, message, or type',
        )
      }

      const newNotification = await notificationService.createNotification({
        userId,
        message,
        type,
      })

      return res.status(201).json({
        success: true,
        data: newNotification,
      })
    } catch (error) {
      next(error)
    }
  }

  async getUserNotifications(req, res, next) {
    try {
      const { userId } = req.params

      if (!userId) {
        throw new ValidationError('User ID is required')
      }

      const notifications =
        await notificationService.getUserNotifications(userId)

      return res.status(200).json({
        success: true,
        data: notifications,
      })
    } catch (error) {
      next(error)
    }
  }

  async updateNotification(req, res, next) {
    try {
      const { notificationId } = req.params
      const { message, type } = req.body

      if (!notificationId) {
        throw new ValidationError('Notification ID is required')
      }

      if (!message && !type) {
        throw new ValidationError(
          'At least one field must be provided for update: message or type',
        )
      }

      const updatedNotification = await notificationService.updateNotification(
        notificationId,
        { message, type },
      )

      return res.status(200).json({
        success: true,
        data: updatedNotification,
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteNotification(req, res, next) {
    try {
      const { notificationId } = req.params

      if (!notificationId) {
        throw new ValidationError('Notification ID is required')
      }

      await notificationService.deleteNotification(notificationId)

      return res.status(200).json({
        success: true,
        message: 'Notification deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }

  async markNotificationAsRead(req, res, next) {
    try {
      const { notificationId } = req.params

      if (!notificationId) {
        throw new ValidationError('Notification ID is required')
      }

      const updatedNotification =
        await notificationService.markAsRead(notificationId)

      return res.status(200).json({
        success: true,
        data: updatedNotification,
      })
    } catch (error) {
      next(error)
    }
  }

  async getUnreadNotificationsCount(req, res, next) {
    try {
      const { userId } = req.params

      if (!userId) {
        throw new ValidationError('User ID is required')
      }

      const count =
        await notificationService.getUnreadNotificationsCount(userId)

      return res.status(200).json({
        success: true,
        count,
      })
    } catch (error) {
      next(error)
    }
  }

  async getNotificationById(req, res, next) {
    try {
      const { notificationId } = req.params

      if (!notificationId) {
        throw new ValidationError('Notification ID is required')
      }

      const notification =
        await notificationService.getNotificationById(notificationId)

      return res.status(200).json({
        success: true,
        data: notification,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new NotificationController()
