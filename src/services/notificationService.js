import notificationUtils from '@/utils/notificationUtils'

notificationUtils.addNotification({
  id: '1',
  title: 'New Notification',
  message: 'This is a new notification.',
  timestamp: new Date(),
  isRead: false,
})

const notifications = notificationUtils.getAllNotifications()
console.log(notifications)

notificationUtils.markAsRead('1')

notificationUtils.clearAllNotification()
