import { object, string, TypeOf } from 'zod'

/**
 * @openapi
 * components:
 *  schemas:
 *    SubscribeInput:
 *      type: object
 *      required:
 *      - email
 *      properties:
 *        email:
 *          type: string
 *          default: example@example.com
 *    SendEmailResponse:
 *      type: object
 *      required:
 *      - failed
 *      properties:
 *        failed:
 *          type: array
 *          items:
 *            type: string
 */

export const SubscriberSchema = object({
  query: object({
    email: string().email('Invalid email format!')
  })
})

export type SubscribeInput = TypeOf<typeof SubscriberSchema>