/**
 *  routes and schema for avgTimeTaken for analytics dashboard
 */


/**
 * @openapi
 * /api/billing-manager/avg-time-taken:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [Billing-Manager]
 *      summary: list average time taken for approval for analytical dashboard
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
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                          <<date>>:
 *                                              type: array
 *                                              items:
 *                                                  type: object
 *                                                  properties:
 *                                                      serviceType:
 *                                                          type: string
 *                                                          description: service type of trips
 *                                                      averageTimeTaken:
 *                                                          type: integer
 *                                                          description: average time taken to approve this type of trips
 *                              example:
 *                                  data:
 *                                      2023-02-22:
 *                                          - serviceType: ALS
 *                                            averageTimeTaken: 143
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
