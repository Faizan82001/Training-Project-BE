/**
 *  routes and schema for change the status of the users
 */

/**
 * @openapi
 * /api/billing-manager/users/activity-status/{userId}:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags: [Billing-Manager]
 *      summary: change status of the user from active to in-active
 *      parameters:
 *          - in: path
 *            name: userId
 *            required: true
 *            type: uuid
 *            description: id of the user is required
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
 *                              example:
 *                                  message: User status updated successfully.
 *
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
 *          404:
 *              description: Not Found
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: User not found.
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
