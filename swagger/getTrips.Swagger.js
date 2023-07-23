/**
 *  routes and schema for getTrips
 */

/**
 * @openapi
 * /api/trip-requests/trips:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Trips/Requests]
 *      summary: This API gives list of runNo(Trips) for logged in billing admin or nurse.
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
 *                                          runNoOfTrips:
 *                                              type: list
 *                                          currentUser:
 *                                              type: string
 *                              example:
 *                                  data:
 *                                      runNoOfTrips:
 *                                          - "45"
 *                                          - "35"
 *                                      currentUser: 6c6c730f-0834-4e57-9d55-3be5be66c021
 *          401:
 *              description: Unauthorized access/ Invalid token
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: User not authorized.
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
