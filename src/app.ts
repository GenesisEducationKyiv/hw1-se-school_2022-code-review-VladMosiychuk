import cors from 'cors'
import routes from './routes'
import config from './config'
import swaggerDocs from './utils/swagger'
import express, { Express } from 'express'

const app: Express = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: '*'
}))

app.listen(config.PORT, async () => {
  console.log(`⚡️[sever]: Server is running at http://${config.HOSTNAME}:${config.PORT}`)

  routes(app)

  swaggerDocs(app)
})