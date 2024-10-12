// passwordUtils.js

const ValidationError = require('../errors/ValidationError')

/**
 * Validates a password based on the following rules:
 * - Must be at least 8 characters long.
 * - Must contain at least one uppercase letter.
 * - Must contain at least one lowercase letter.
 * - Must contain at least one number.
 * - Must contain at least one special character (!@#$%^&*).
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if the password is valid, throws ValidationError if invalid.
 */
const validatePassword = password => {
  const MIN_LENGTH = 8
  const SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/
  const UPPERCASE_REGEX = /[A-Z]/
  const LOWERCASE_REGEX = /[a-z]/
  const NUMBER_REGEX = /[0-9]/

  if (typeof password !== 'string') {
    throw new ValidationError('Password must be a string.')
  }

  if (password.length < MIN_LENGTH) {
    throw new ValidationError(
      `Password must be at least ${MIN_LENGTH} characters long.`,
    )
  }

  if (!UPPERCASE_REGEX.test(password)) {
    throw new ValidationError(
      'Password must contain at least one uppercase letter.',
    )
  }

  if (!LOWERCASE_REGEX.test(password)) {
    throw new ValidationError(
      'Password must contain at least one lowercase letter.',
    )
  }

  if (!NUMBER_REGEX.test(password)) {
    throw new ValidationError('Password must contain at least one number.')
  }

  if (!SPECIAL_CHAR_REGEX.test(password)) {
    throw new ValidationError(
      'Password must contain at least one special character (!@#$%^&*).',
    )
  }

  return true
}

/**
 * Hashes the password for secure storage.
 *
 * @param {string} password - The plain text password to hash.
 * @param {function} hashFunction - A function that takes a password and returns a hashed version (e.g., bcrypt.hash).
 * @returns {Promise<string>} - Returns a Promise resolving to the hashed password.
 */
const hashPassword = async (password, hashFunction) => {
  try {
    if (!password || typeof password !== 'string') {
      throw new ValidationError('Invalid password provided for hashing.')
    }

    // Assume bcrypt or any other hashing library's hash function is passed in.
    const hashedPassword = await hashFunction(password)
    return hashedPassword
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message)
  }
}

/**
 * Compares a plain text password with a hashed password to verify if they match.
 *
 * @param {string} password - The plain text password.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @param {function} compareFunction - A comparison function (e.g., bcrypt.compare) that compares password with hashed.
 * @returns {Promise<boolean>} - Returns a Promise resolving to true if passwords match, otherwise false.
 */
const comparePasswords = async (password, hashedPassword, compareFunction) => {
  try {
    if (!password || !hashedPassword) {
      throw new ValidationError(
        'Both password and hashed password must be provided.',
      )
    }

    // Using the comparison function passed as argument (e.g., bcrypt.compare).
    const isMatch = await compareFunction(password, hashedPassword)
    return isMatch
  } catch (error) {
    throw new Error('Error comparing passwords: ' + error.message)
  }
}

/**
 * Generates a strong password with a given length.
 * The generated password contains at least one uppercase, one lowercase, one number, and one special character.
 *
 * @param {number} length - The length of the password to generate.
 * @returns {string} - Returns the generated strong password.
 */
const generateStrongPassword = (length = 12) => {
  const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz'
  const NUMERIC_CHARS = '0123456789'
  const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  const allChars =
    UPPERCASE_CHARS + LOWERCASE_CHARS + NUMERIC_CHARS + SPECIAL_CHARS

  let password = ''
  password += UPPERCASE_CHARS.charAt(
    Math.floor(Math.random() * UPPERCASE_CHARS.length),
  )
  password += LOWERCASE_CHARS.charAt(
    Math.floor(Math.random() * LOWERCASE_CHARS.length),
  )
  password += NUMERIC_CHARS.charAt(
    Math.floor(Math.random() * NUMERIC_CHARS.length),
  )
  password += SPECIAL_CHARS.charAt(
    Math.floor(Math.random() * SPECIAL_CHARS.length),
  )

  for (let i = 4; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length))
  }

  return shuffleString(password)
}

/**
 * Shuffles the characters of a given string randomly.
 *
 * @param {string} str - The string to shuffle.
 * @returns {string} - Returns the shuffled string.
 */
const shuffleString = str => {
  const array = str.split('')
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array.join('')
}

module.exports = {
  validatePassword,
  hashPassword,
  comparePasswords,
  generateStrongPassword,
}
