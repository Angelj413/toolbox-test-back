import winston from 'winston'
import colors from 'colors'
import { format } from 'date-fns'

// Create a new logger instance with default settings
const logger = winston.createLogger({
  level: 'debug', // Set the logging level
  format: winston.format.combine(
    winston.format.colorize(), // Enable colorization
    winston.format.simple() // Use the default log format
  ),
  transports: [
    new winston.transports.Console() // Log to the console
  ]
})

// Define custom log levels with colors for colorization
const logLevels = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  success: 'green'
}

// Define custom log format for the logger
const logFormat = winston.format.printf(({ level, message }) => {
  const color = colors[logLevels[level]] || colors.white
  return `${color(
    `[${format(new Date(), 'MM/dd/yyyy mm:ss')}] [${level.toUpperCase()}]:`
  )} ${message}`
})

// Update the logger with custom log format
logger.format = logFormat

export default logger
