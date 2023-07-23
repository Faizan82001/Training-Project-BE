/**
 *  routes and schema for billing admin
 */

/**
 * @openapi
 * /api/billing-manager/list-billing-admin:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [Billing-Manager]
 *      summary: list all active billing admin
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                      properties:
 *                                          id:
 *                                              type: uuid
 *                                              description: uuid of the user
 *                                          email:
 *                                              type: string
 *                                              description: email of the user
 *                              example:
 *                                  data:
 *                                      - id: 6c6c730f-0834-4e57-9d55-3be5be66c021
 *                                        email: maria@yopmail.com
 *          401:
 *              description: Invalid JWT token
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: Invalid token
 *          500:
 *              description: Server error
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: Server Error
 */
