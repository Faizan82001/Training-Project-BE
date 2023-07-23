/**
 *  routes and schema for login
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      userlogin:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: user email address
 *              password:
 *                  type: string
 *                  description: password for login
 *              fcmToken:
 *                  type: string
 *                  description: fcm token for notification
 *          example:
 *              email: john.doe12@gmail.com
 *              password: U2FsdGVkX18YqtYHy94boKUw7FlkEXPV6HtbpocwZuA
 *              fcmToken: andehwncaijewmc
 */

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags: [Authentication]
 *      summary: user login
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userlogin'
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
 *                                      description: message from server
 *                                  data:
 *                                      type: Object
 *                                      description: user details from server
 *                                      properties:
 *                                          id:
 *                                              type: uuid
 *                                              description: user id
 *                                          firstName:
 *                                              type: string
 *                                              description: first name of user
 *                                          lastName:
 *                                              type: string
 *                                              description: last name of user
 *                                          email:
 *                                              type: string
 *                                              description: email of user
 *                                          roleId:
 *                                              type: integer
 *                                              description: role id of user
 *                                  token:
 *                                      type: string
 *                                      description: token for login
 *                              example:
 *                                  message: Logged in successfully.
 *                                  data:
 *                                      id: 8dfdcf58-52f7-4ec1-ba7f-93ec9c3ed3e3
 *                                      firstName: John
 *                                      lastName: Doe
 *                                      email: john.doe12@gmail.com
 *                                      roleId: 1
 *                                  token: <JWT token from the server>
 *
 *          400:
 *              description: Validation error/ Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: You have entered invalid email address. Please, enter a valid email address.
 *          401:
 *              description: Unauthorized access
 *              content:
 *                  application/json:
 *                       schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: Either email id or password is incorrect.
 *          403:
 *              description: Forbidden access
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: You are currently inactived user. Contanct system admin for login.
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
