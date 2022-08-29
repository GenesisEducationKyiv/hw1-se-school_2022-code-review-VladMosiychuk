import { Express, Request, Response } from 'express'
import jsdoc from 'swagger-jsdoc'
import ui from 'swagger-ui-express'
import config from '../config'

const options: jsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BTC API Docs',
      version: config.VERSION
    },
    host: config.HOSTNAME,
    basePath: '/api'
  },
  apis: ['**/routes.js', '**/schema/*.js'],
}

const swaggerSpec: object = jsdoc(options)

function swaggerDocs(app: Express) {

  // Swagger page
  app.use('/docs', ui.serve, ui.setup(swaggerSpec))

  // Docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  console.log(`🔎[swagger]: API Docs available at http://${config.HOSTNAME}:${config.PORT}/docs`)
}

export default swaggerDocs