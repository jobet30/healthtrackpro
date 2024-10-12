import { db } from '../config/firebase'
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
} from 'firebase/firestore'

const validateUserData = data => {
  const errors = []

  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required')
  }

  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('A valid email is required')
  }

  return errors.length ? errors : null
}

const userService = {
  async createOrUpdateUserProfile(userId, data) {
    const validationErrors = validateUserData(data)
    if (validationErrors) {
      throw new Error(validationErrors.join(', '))
    }

    const userRef = doc(db, 'users', userId)
    try {
      await setDoc(userRef, data, { merge: true })
      return { id: userId, ...data }
    } catch (error) {
      console.error('Error creating or updating user profile:', error)
      throw new Error('Error creating or updating user profile')
    }
  },

  async getUserProfile(userId) {
    const userRef = doc(db, 'users', userId)

    try {
      const userSnapshot = await getDoc(userRef)
      if (!userSnapshot.exists()) {
        return { id: userId, ...userSnapshot.data() }
      } else {
        throw new Error('User profile not found')
      }
    } catch (error) {
      console.error('Error retrieving user profile:', error)
      throw new Error('Error retrieving user profile')
    }
  },

  async updateUserProfile(userId, data) {
    const validationErrors = validateUserData(data)
    if (validationErrors) {
      throw new Error(validationErrors.join(', '))
    }

    const userRef = doc(db, 'users', userId)
    try {
      await updateDoc(userRef, data)
      return { id: userId, ...data }
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw new Error('Error updating user profile')
    }
  },

  async deleteUserProfile(userId) {
    const userRef = doc(db, 'users', userId)

    try {
      await deleteDoc(userRef)
      return true
    } catch (error) {
      console.error('Error deleting user profile:', error)
      throw new Error('Error deleting user profile')
    }
  },

  async getAllUserProfiles() {
    try {
      const usersRef = collection(db, 'users')
      const usersSnapshot = await getDocs(usersRef)

      const users = []
      usersSnapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() })
      })
      return users
    } catch (error) {
      console.error('Error retrieving all user profiles:', error)
      throw new Error('Error retrieving all user profiles')
    }
  },
}

export default userService
