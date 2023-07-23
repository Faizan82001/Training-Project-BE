/**
 *  routes and schema for totalrequest for analytics dashboard
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      totalrequest:
 *          type: object
 *          required:
 *              - status
 *              - count
 *              - percentage
 *          properties:
 *              status:
 *                  type: string
 *                  description: the status of the request
 *              count:
 *                  type: integer
 *                  description: the count of the requests with this status
 *              percentage:
 *                  type: string
 *                  description: the percentage of requests with this status
 *          example:
 *              totalCount: 20
 *              data:
 *              - status: Approved with Exception
 *                count: 2
 *                percentage: 10.00
 *              - status: Data Provided
 *                count: 3
 *                percentage: 15.00
 *              - status: Request more Information
 *                count: 1
 *                percentage: 5.00
 *              - status: Assigned for Review
 *                count: 14
 *                percentage: 70.00
 */

/**
 * @openapi
 * /api/billing-manager/total-requests:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [Billing-Manager]
 *      summary: list all total requests for analytical dashboard
 *      parameters:
 *          - in: query
 *            name: startDate
 *            schema:
 *              type: date,
 *              description: starting date
 *          - in: query
 *            name: endDate
 *            schema:
 *              type: date,
 *              description: ending Date
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
 *                                  totalCount: 20
 *                                  data:
 *                                      - status: Approved with Exception
 *                                        count: 2
 *                                        percentage: '10.00'
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
