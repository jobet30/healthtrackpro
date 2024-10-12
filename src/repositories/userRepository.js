import { db } from '..utils/apiUtils'

class UserRepository {
  constructor() {
    this.collection = db.collection('users')
  }

  async createUser(userData) {
    try {
      const userRef = await this.collection.add(userData)
      return { id: userRef.id, ...userData }
    } catch (error) {
      throw new Error('Error creating user: ' + error.message)
    }
  }

  async getUserBId(userId) {
    try {
      const userDoc = await this.collection.doc(userId).get()
      if (!userDoc.exists) {
        throw new Error('User not found')
      }
      return { id: userDoc.id, ...userDoc.data() }
    } catch (error) {
      throw new Error('Error retrieving user: ' + error.message)
    }
  }

  async updateUser(userId, updatedData) {
    try {
      const userRef = this.collection.doc(userId)
      await userRef.update(updatedData)
      return { id: userId, ...updatedData }
    } catch (error) {
      throw new Error('Error updating user: ' + error.message)
    }
  }

  async deleteUser(userId) {
    try {
      await this.collection.doc(userId).delete()
      return { message: 'User deleted successfully' }
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message)
    }
  }

  async getAllUsers() {
    try {
      const snapshot = await this.collection.get()
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      throw new Error('Error retrieving users: ' + error.message)
    }
  }

  async findUserByEmail(email) {
    try {
      const snapshot = await this.collection.where('email', '==', email).get()
      if (snapshot.empty) {
        throw new Error('No user found with this email')
      }
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]
    } catch (error) {
      throw new Error('Error finding user by email: ' + error.message)
    }
  }
}

export default new UserRepository()
