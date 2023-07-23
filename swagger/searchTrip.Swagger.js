/**
 *  routes and schema for search trips
 */

/**
 * @openapi
 * /api/trip-requests/search/{runNo}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Trips/Requests]
 *      summary: search already created trip/request.
 *      parameters:
 *          - in: path
 *            name: runNo
 *            type: integer
 *            required: true
 *            description: run number for trip/request.
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: Object
 *                                      description: data from server
 *                                      properties:
 *                                          runNo:
 *                                              type: integer
 *                                              description: run number of requests
 *                                          serviceType:
 *                                              type: string
 *                                              description: ambulance service type
 *                                          creatorId:
 *                                              type: uuid
 *                                              description: user id of nurse who created trip
 *                                          assignee:
 *                                              type: uuid
 *                                              description: user id of billing admin who assigned in this trip request
 *                                          status:
 *                                              type: string
 *                                              description: status of trip/requests
 *                                          exceptionMessage:
 *                                              type: string
 *                                              description: message for approved with exception status
 *                                          createdAt:
 *                                              type: date-time
 *                                              description: time when trip is created
 *                                          updatedAt:
 *                                              type: date-time
 *                                              description: time when trip last updated
 *                                          nurseName:
 *                                              type: string
 *                                              description: name of nurse who created trip
 *                                          assigneeName:
 *                                              type: string
 *                                              description: name of billing admin who assigned this trip
 *                              example:
 *                                  data:
 *                                      runNo: 46238
 *                                      serviceType: ALS
 *                                      creatorId: fb2e3e70-439f-483b-ad91-258fe03a95da
 *                                      assignee: null
 *                                      status: New Request
 *                                      exceptionMessage: null
 *                                      createdAt: 2023-04-25T03:37:43.168Z
 *                                      updatedAt: 2023-04-25T03:37:43.168Z
 *                                      nurseName: Alex Bob
 *                                      assigneeName: null
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
 *          404:
 *              description: Data not found.
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: Data not found.
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
