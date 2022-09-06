import cors from 'cors'
import config from './config'
import useRoutes from './routes'
import useSwaggerDocs from './utils/swagger'
import express, { Express } from 'express'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ 
  extended: true 
}))
app.use(cors({
  origin: '*'
}))

useRoutes(app)
useSwaggerDocs(app)

app.listen(config.PORT, async () => {
  console.log(`⚡️[server]: Server is running at http://${config.HOSTNAME}:${config.PORT}`)
})