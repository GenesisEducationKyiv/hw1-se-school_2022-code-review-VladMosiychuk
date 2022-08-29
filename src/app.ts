import cors from 'cors'
import routes from './routes'
import config from './config'
import swaggerDocs from './utils/swagger'
import express, { Express } from 'express'

// Create Express App
const app: Express = express()

// Use body parser
app.use(express.json())

// Put x-www-form-urlencoded data into request body
app.use(express.urlencoded({ extended: true }))

// Allow CQRS to be able to query API from other domains 
app.use(cors({
  origin: '*'
}))

// Run Express App
app.listen(config.PORT, async () => {
  console.log(`⚡️[sever]: Server is running at http://${config.HOSTNAME}:${config.PORT}`)

  // Set up routes
  routes(app)

  // Swagger API Documentation
  swaggerDocs(app)
})