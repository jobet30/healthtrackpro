import { db } from '@..utils/apiUtils'

class HealthDataRepository {
  constructor() {
    this.collection = db.collection('healthData')
  }

  /**
   * Add new health data for a user
   * @param {Object} healthData - Health Data object to be added
   * @returns {Object} The Added health data with the generated ID.
   */

  async addHealthData(healthData) {
    try {
      const healthDataRef = await this.collection.add({
        ...healthData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

      return { id: healthDataRef.id, ...healthData }
    } catch (error) {
      throw new Error('Error adding health data: ' + error.message)
    }
  }

  /**
   * Retrieve all health data for a user by their user ID.
   * @param {string} userId - The ID of the user.
   * @returns {Array<Object>} Array of health data objects.
   */

  async getHealthDataByUserId(userId) {
    try {
      const snapshot = await this.collection
        .where('userId', '==', userid)
        .orderBy('createdAt', 'desc')
        .get()

      if (snapshot.empty) throw new Error('No health data found for this user.')
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      throw new Error('Error retrieving health data: ' + error.message)
    }
  }

  /**
   * Update existing health data by record ID.
   * @param {string} recordId - The ID of the health data record to update.
   * @param {Object} updatedData - Data to update the health record with.
   * @returns {Object} The updated health data.
   */

  async updateHealthData(recordId, updatedData) {
    try {
      const healthDataRef = this.collection.doc(recordId)
      await healthDataRef.update({
        ...updatedData,
        updatedAt: new Date().toISOString(),
      })
      return { id: recordId, ...updatedData }
    } catch (error) {
      throw new Error('Error updating health data: ' + error.message)
    }
  }

  /**
   * Delete health data by record ID.
   * @param {string} recordId - The ID of the health data record to delete.
   * @returns {Object} Confirmation message for deletion.
   */
  async deleteHealthData(recordId) {
    try {
      await this.collection.doc(recordId).delete()
      return { message: 'Health data deleted successfully' }
    } catch (error) {
      throw new Error('Error deleting health data: ' + error.message)
    }
  }

  /**
   * Retrieve a specific health data record by record ID.
   * @param {string} recordId - The ID of the health data record.
   * @returns {Object} The health data record object.
   */
  async getHealthDataById(recordId) {
    try {
      const healthDataDoc = await this.collection.doc(recordId).get()
      if (!healthDataDoc.exists) throw new Error('Health data not found.')
      return { id: recordId, ...healthDataDoc.data() }
    } catch (error) {
      throw new Error('Error retrieving health data: ' + error.message)
    }
  }

  /**
   * Retrieve all health data for a user within a specific date range.
   * @param {string} userId - The ID of the user.
   * @param {string} startDate - Start date for the range (ISO format).
   * @param {string} endDate - End date for the range (ISO format).
   * @returns {Array<Object>} Array of health data objects within the date range.
   */
  async getHealthDataByDateRange(userId, startDate, endDate) {
    try {
      const snapshot = await this.collection
        .where('userId', '==', userId)
        .where('createdAt', '>=', startDate)
        .where('createdAt', '<=', endDate)
        .orderBy('createdAt', 'desc')
        .get()
      if (snapshot.empty)
        throw new Error('No health data found within the date range.')
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      throw new Error(
        'Error retrieving health data by date range: ' + error.message,
      )
    }
  }

  /**
   * Retrieve aggregated health data for a user (e.g., average weight, height, blood pressure).
   * @param {string} userId - The ID of the user.
   * @returns {Object} Aggregated health data such as average weight and blood pressure.
   */
  async getAggregatedHealthData(userId) {
    try {
      const snapshot = await this.collection.where('userId', '==', userId).get()
      if (snapshot.empty) throw new Error('No health data found for this user.')

      let totalWeight = 0,
        totalHeight = 0,
        count = 0
      snapshot.docs.forEach(doc => {
        const { weight, height } = doc.data()
        totalWeight += weight || 0
        totalHeight += height || 0
        count += 1
      })

      if (count === 0) throw new Error('No valid health data to aggregate.')

      return {
        averageWeight: totalWeight / count,
        averageHeight: totalHeight / count,
        recordCount: count,
      }
    } catch (error) {
      throw new Error('Error aggregating health data: ' + error.message)
    }
  }
}

export default new HealthDataRepository()
