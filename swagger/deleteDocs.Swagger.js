/**
 *  routes and schema for delete documents images
 */


/**
 * @openapi
 * /api/trip-requests/docs/{runNo}:
 *  delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Trips/Requests]
 *      summary: delete documents for trips/requests.
 *      parameters:
 *          - in: path
 *            name: runNo
 *            type: integer
 *            required: true
 *            description: run number for trip/request.
 *          - in: query
 *            name: documentName
 *            type: string
 *            required: true
 *            description: name of the document which we want to delete.
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
 *                                  message: Image deleted successfully.
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
 *                                  message: Invalid Request.
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
