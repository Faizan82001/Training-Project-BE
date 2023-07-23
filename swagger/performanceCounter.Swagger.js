/**
 *  routes and schema for performance-counter for analytics dashboard
 */

/**
 * @openapi
 * /api/billing-manager/performance-counter:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [Billing-Manager]
 *      summary: list all total requests for analytical dashboard
 *      parameters:
 *          - in: query
 *            name: id
 *            type: uuid
 *            description: id of the user.
 *            required: true
 *          - in: query
 *            name: startDate
 *            type: date
 *            description: starting date
 *          - in: query
 *            name: endDate
 *            type: date
 *            description: ending Date
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  totalCount:
 *                                      type: integer
 *                                      description: the total number of requests
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                      properties:
 *                                          status:
 *                                              type: string
 *                                              description: the status of the request
 *                                          count:
 *                                              type: integer
 *                                              description: the count of request with status
 *                                          percentage:
 *                                              type: string
 *                                              description: The percentage of requests with this status
 *                              example:
 *                                  totalCount: 3
 *                                  data:
 *                                      - status: Assigned for Review
 *                                        count: 1
 *                                        percentage: '33.33'
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
 *                                  message: Please verify start and end date.
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
