import authenticationService from '../services/authenticationService'

const authController = {
  async signIn(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    try {
      const user = await authenticationService.signIn(email, password)
      return res.status(200).json({ user })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async signUp(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    try {
      const user = await authenticationService.signUp(email, password)
      return res.status(200).json({ user })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async signOut(req, res) {
    try {
      await authenticationService.signOut()
      console.log(`User signed out: ${req.user?.email || 'unknown'}`)
      return res.status(200).json({ message: 'Signed out successfully' })
    } catch (error) {
      console.error('Sign-out error:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  },

  async getCurrentUser(res) {
    const user = authenticationService.getCurrentUser()

    if (user) {
      console.log(`Current user requested: ${user.email}`)
      return res.status(200).json({ user })
    } else {
      return res
        .status(404)
        .json({ message: 'No user is currently signed in.' })
    }
  },

  onAuthStateChanged(res) {
    return new Promise((resolve, reject) => {
      authenticationService.onAuthStateChanged(
        user => {
          if (user) {
            console.log(`Auth state changed: User signed in - ${user.email}`)
            resolve(res.status(200).json({ user }))
          } else {
            console.log('Auth state changed: No user is currently signed in.')
            reject(new Error('No user is currently signed in.'))
          }
        },
        error => {
          console.error('Error observing auth state:', error)
          reject(new Error('Error observing authentication state.'))
        },
      )
    })
      .then(response => response)
      .catch(error => {
        return res.status(404).json({ message: error.message })
      })
  },
}

export default authController
