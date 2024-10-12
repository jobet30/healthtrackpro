import { db } from '../config/firebaseConfig'
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'

const healthDataService = {
  async addHealthData({ userId, weight, height, bloodPressure }) {
    try {
      const newRecordRef = doc(collection(db, 'healthData'))
      await setDoc(newRecordRef, {
        userId,
        weight,
        height,
        bloodPressure,
        createdAt: new Date(),
      })
      return { id: newRecordRef.id, userId, weight, height, bloodPressure }
    } catch (error) {
      throw new Error('Error adding health data: ' + error.message)
    }
  },

  async getHealthData(userId) {
    try {
      const healthDataRef = collection(db, 'healthData')
      const q = query(healthDataRef, where('userId', '==', userId))
      const querySnapshot = await getDocs(q)

      let healthData = null
      querySnapshot.forEach(doc => {
        healthData = { id: doc.id, ...doc.data() }
      })
      return healthData
    } catch (error) {
      throw new Error('Error retrieving health data: ' + error.message)
    }
  },

  async updateHealthData({ userId, recordId, weight, height, bloodPressure }) {
    try {
      const healthDataRef = doc(db, 'healthData', recordId)
      const healthRecord = await getDoc(healthDataRef)

      if (!healthRecord.exists()) {
        throw new Error('Health record not found.')
      }

      await setDoc(
        healthDataRef,
        {
          ...(weight && { weight }),
          ...(height && { height }),
          ...(bloodPressure && { bloodPressure }),
          updatedAt: new Date(),
        },
        { merge: true },
      )
      return { id: recordId, userId, weight, height, bloodPressure }
    } catch (error) {
      throw new Error('Error updating health data: ' + error.message)
    }
  },

  async deleteHealthData(recordId) {
    try {
      const healthDataRef = doc(db, 'healthData', recordId)
      await deleteDoc(healthDataRef)
      return true
    } catch (error) {
      throw new Error('Error deleting health data: ' + error.message)
    }
  },

  async getAllHealthData(userId) {
    try {
      const healthDataRef = collection(db, 'healthData')
      const q = query(healthDataRef, where('userId', '==', userId))
      const querySnapshot = await getDocs(q)

      const healthRecords = []
      querySnapshot.forEach(doc => {
        healthRecords.push({ id: doc.id, ...doc.data() })
      })
      return healthRecords
    } catch (error) {
      throw new Error('Error retrieving all health data: ' + error.message)
    }
  },
}

export default healthDataService
