/**
 *  routes and schema for userlist
 */

/**
 * @openapi
 * /api/billing-manager/users:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [Billing-Manager]
 *      summary: list all users
 *      parameters:
 *          - in: query
 *            name: role_id
 *            schema:
 *              type: integer,
 *              description: user role id
 *          - in: query
 *            name: status
 *            schema:
 *              type: integer,
 *              description: user status
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer,
 *              description: listing users using pagination (default:1)
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
 *                                      type: object
 *                                      properties:
 *                                      data:
 *                                          type: object
 *                                          properties:
 *                                          count:
 *                                              type: integer
 *                                              description: Total count of users
 *                                          rows:
 *                                              type: array
 *                                              properties:
 *                                              firstName:
 *                                                  type: string
 *                                                  description: user first name
 *                                              lastName:
 *                                                  type: string
 *                                                  description: user last name
 *                                              email:
 *                                                  type: string
 *                                                  description: user email
 *                                              roleId:
 *                                                  type: Integer
 *                                                  description: user role id
 *                                              status:
 *                                                  type: string
 *                                                  description: user status
 *                              example:
 *                                  data:
 *                                      count: 1
 *                                      rows:
 *                                      - firstName: Steve
 *                                        lastName: Smith
 *                                        email: steve@yopmail.com
 *                                        roleId: 2
 *                                        status: invited
 *                                  limit: 10
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
 *                                  message: Invalid Page request.
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
