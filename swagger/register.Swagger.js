/**
<<<<<<< HEAD
 *  routes and schema for register
=======
 *  routes and schema for create user
>>>>>>> 16f845244c028b83817b6b384b877d145ba66ddd
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      usercreation:
 *          type: object
 *          required:
 *              - firstName
 *              - lastName
 *              - email
 *              - roleId
 *          properties:
 *              firstName:
 *                  type: string
 *                  description: user firstName
 *              lastName:
 *                  type: string
 *                  description: user lastName
 *              email:
 *                  type: string
 *                  description: user email
 *              roleId:
 *                  type: Integer
 *                  description: user roleId
 *          example:
 *              firstName: jay
 *              lastName: prajapati
 *              email: jp22@gmail.com
 *              roleId: 2
 */

/**
 * @openapi
 * /api/billing-manager/user:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags: [Billing-Manager]
 *      summary: user register
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/usercreation'
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: Message from Server
 *                              example:
 *                                   message: User created and activation email sent to user.
 *          400:
 *              description: Validation error/ Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: Message from Server
 *                              example:
 *                                  message: Invalid request.
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
 *                                      description: Message from server
 *                              example:
 *                                  message: Server Error
 */
