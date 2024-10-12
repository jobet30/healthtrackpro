// errors/ValidationError.js

/**
 * Custom error class for handling validation errors in the application.
 * Extends the built-in Error class and includes additional details about validation errors.
 */
class ValidationError extends Error {
  /**
   * Creates a new instance of ValidationError.
   *
   * @param {string} message - The error message describing the validation issue.
   * @param {Object} [details] - Additional details about the validation error.
   * @param {number} [statusCode=400] - The HTTP status code associated with this validation error. Defaults to 400.
   * @param {string} [code='VALIDATION_ERROR'] - A specific error code to identify the type of validation error.
   */
  constructor(
    message,
    details = {},
    statusCode = 400,
    code = 'VALIDATION_ERROR',
  ) {
    super(message)

    this.name = this.constructor.name // Sets the error name to "ValidationError"
    this.details = details // Stores additional error details (optional)
    this.statusCode = statusCode // Stores the HTTP status code (default 400)
    this.code = code // Stores a custom error code (default 'VALIDATION_ERROR')

    // Capture the stack trace (optional: omit constructor from the stack trace)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  /**
   * Converts the validation error to a JSON-like object, useful for API responses.
   *
   * @returns {Object} - A plain object representing the error, including the message, code, and additional details.
   */
  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        details: this.details,
        statusCode: this.statusCode,
        code: this.code,
      },
    }
  }

  /**
   * Static method to easily create an instance from another error (like validation libraries).
   * This helps wrap errors from third-party libraries into a standardized format.
   *
   * @param {Error} error - The original error object to wrap.
   * @param {Object} [details] - Additional details to include in the error.
   * @param {number} [statusCode=400] - Optional status code, defaults to 400.
   * @param {string} [code='VALIDATION_ERROR'] - Optional error code, defaults to 'VALIDATION_ERROR'.
   * @returns {ValidationError} - A wrapped ValidationError instance.
   */
  static from(
    error,
    details = {},
    statusCode = 400,
    code = 'VALIDATION_ERROR',
  ) {
    return new ValidationError(error.message, details, statusCode, code)
  }
}

module.exports = ValidationError
