import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import chalk from 'chalk'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'

import indexRoute from './routes/index.js'
import errorHandler from './middlewares/errorHandlers.js'
import logger from './utils/logger/index.js'
import { PORT } from './config/app.js'
import { getFilesContent } from './services/files/index.js'
import { swaggerOptions } from './config/swagger.js'

const app = express()

// Middleware setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan(':method :url :status :response-time ms'))

app.use('/', indexRoute)

// Custom error handler middleware
app.use(errorHandler)

app.use(cors())

// Start the Express.js server
const port = PORT || 4000

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
  console.log(
    chalk.bgBlue.bold.white('╔════════════════════════════════════════════╗')
  )
  console.log(
    chalk.bgBlue.bold.white('║               Toolbox Test Server          ║')
  )
  console.log(
    chalk.bgBlue.bold.white('╚════════════════════════════════════════════╝')
  )
})

const swaggerSpec = swaggerJsdoc(swaggerOptions)

// Serve Swagger UI
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
)

//  Start the files service
getFilesContent()

export default app
