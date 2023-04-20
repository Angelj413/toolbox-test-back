import logger from '../utils/logger/index.js'
/**
 *
 * @param {*} err   - Error object
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error('[errorHandler] Error: ', err)

  // Check for custom error status code, otherwise default to 500
  const statusCode = err.statusCode || 500

  // Set the response status code
  res.status(statusCode)

  // Send the error response as JSON
  res.json({
    status: false,
    error: {
      message: err.message,
      statusCode
    }
  })
}

export default errorHandler
