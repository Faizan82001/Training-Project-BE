/**
 *  routes and schema for ambulance type
 */

/**
 * @openapi
 * /api/trip-requests/ambulance-types:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Trips/Requests]
 *      summary: types of ambulance for dropdown.
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: Array
 *                                      description: data from server
 *                              example:
 *                                  data: ["ALS","BLS","CCT"]
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
