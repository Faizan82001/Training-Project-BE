/**
 *  routes and schema for chat data
 */

/**
 * @openapi
 * /api/trip-requests/chat-data/{runNo}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Trips/Requests]
 *      summary: This API gives ids to front-end for sending chats to right reciever.
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
 *                                  data:
 *                                      type: object
 *                                      description: data from server for various ids and initials
 *                              example:
 *                                  data:
 *                                      creatorId: fb2e3e70-439f-483b-ad91-258fe03a95da
 *                                      assignee: 6c6c730f-0834-4e57-9d55-3be5be66c021
 *                                      creatorInitial: AB
 *                                      assigneeInitial: MN
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
 *              description: trip not found
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: Trip not found.
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
