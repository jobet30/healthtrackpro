class ValidationError extends Error {
  constructor(errors) {
    super('Validation Error')
    this.errors = errors
    this.name = 'ValidationError'
  }
}

const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePassword = password => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%^&*()_+=[\]{}|\\:;"'<>,.?/~`]).{8,}$/
  return passwordRegex.test(password)
}

const validatedPhoneNumber = phoneNumber => {
  const phoneNumberRegex = /^\+?\d{1,3}\s?\d{3}\s?\d{3}\s?\d{4}$/
  return phoneNumberRegex.test(phoneNumber)
}

const validateRequiredFields = (data, requiredFields) => {
  const errors = []
  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push(`${field} is required`)
    }
  })
  return errors
}

const validateUserData = userData => {
  const errors = {}

  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'password',
    'phoneNumber',
  ]
  const requiredErrors = validateRequiredFields(userData, requiredFields)
  Object.assign(errors, requiredErrors)

  if (userData.email && !validateEmail(userData.email)) {
    errors.email = 'Invalid email address'
  }

  if (userData.password && !validatePassword(userData.password)) {
    errors.password =
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  }

  if (userData.phoneNumber && !validatedPhoneNumber(userData.phoneNumber)) {
    errors.phoneNumber = 'Invalid phone number'
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors)
  }

  return true
}

const validateHealthData = healthData => {
  const errors = {}

  const requiredFields = ['userId', 'weight', 'height', 'bloodPressure']
  const requiredErrors = validateRequiredFields(healthData, requiredFields)
  Object.assign(errors, requiredErrors)

  if (!healthData.userId) {
    errors.userId = 'User ID is required'
  }

  if (!healthData.weight) {
    errors.weight = 'Weight is required'
  }

  if (!healthData.height) {
    errors.height = 'Height is required'
  }

  if (!healthData.bloodPressure) {
    errors.bloodPressure = 'Blood Pressure is required'
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors)
  }

  return true
}

export {
  validateEmail,
  validatePassword,
  validatedPhoneNumber,
  validateRequiredFields,
  validateUserData,
  validateHealthData,
  ValidationError,
}
