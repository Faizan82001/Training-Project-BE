/**
 *  routes and schema for create trip
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      createTrip:
 *          type: object
 *          required:
 *              - runNo
 *              - serviceType
 *          properties:
 *              runNo:
 *                  type: integer
 *                  description: run no of trip which we want to create
 *              serviceType:
 *                  type: string
 *                  description: ambulance service type
 *          example:
 *              runNo: 12345
 *              serviceType: ALS
 */

/**
 * @openapi
 * /api/trip-requests/create:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Trips/Requests]
 *      summary: create trip.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/createTrip'
 *      responses:
 *          200:
 *              description: trip created successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: Trip created successfully.
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
 *                                  message: Please upload face sheet and pcs documents.
 *          401:
 *              description: Unauthorized access/ Invalid token
 *              content:
 *                  application/json:
 *                       schema:
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
