import { Express, Request, Response } from 'express'

// Contollers
import { getRateHandler } from './controller/rate.controller'
import {
  subscribeHandler,
  sendEmailsHandler
} from './controller/email.controller'

// Middleware
import validateResource from './middleware/validateResource'

// Schema
import {
  SubscriberSchema
} from './schema/email.schema'

function useRoutes(app: Express) {

  app.get('/', async (req: Request, res: Response) => res.redirect('/docs'))

  /**
   * @openapi
   * '/api/rate':
   *  get:
   *    tags:
   *    - Rate
   *    summary: Get current BTC price
   *    responses:
   *      200:
   *        description: Current BTC price in UAH is returned
   *        content:
   *          application/json:
   *            schema:
   *              type: number
   *              example: 914477.47
   *      400:
   *        description: Invalid status value
   */
  app.get('/api/rate', getRateHandler)

  /**
   * @openapi
   * '/api/subscribe':
   *  post:
   *    tags:
   *    - Subscription
   *    summary: Subscribe email to BTC price updates
   *    parameters:
   *    - name: email
   *      in: query
   *      description: Valid email address
   *      required: true
   *      type: string
   *    responses:
   *      200:
   *        description: Email address was added to list successfully
   *      400:
   *        description: Email is invalid
   *      409:
   *        description: Email was already added to list
   */
  app.post('/api/subscribe', validateResource(SubscriberSchema), subscribeHandler)

  /**
   * @openapi
   * '/api/sendEmails':
   *  post:
   *    tags:
   *    - Subscription
   *    summary: Send message with current BTC price to all the subscribers
   *    responses:
   *      200:
   *        description: A letter with current BTC price was sent to all the subscribers
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/SendEmailResponse'
   */
  app.post('/api/sendEmails', sendEmailsHandler)
}

export default useRoutes