/**
 *  routes and schema for dataProvided
 */

/**
 * @openapi
 * /api/trip-requests/dataprovided/{runNo}:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags: [Trips/Requests]
 *      summary: This API used for acknowledge billing admin about data provided.
 *      parameters:
 *          - in: path
 *            name: runNo
 *            required: true
 *            type: integer
 *            description: run number is required
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
 *                                  message: Trip data updated successfully.
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
