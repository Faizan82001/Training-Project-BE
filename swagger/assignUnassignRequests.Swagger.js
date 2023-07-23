/**
 *  routes and schema for assign-unassign requests
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      assign-unassign request list:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  ddescription: response message for requests
 *          example:
 *              message: Request Assigned Successfully.
 */

/**
 * @openapi
 * /api/billing-admin/change-status/{tripNo}:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags: [Billing-Admin]
 *      summary: assign-unassign requests
 *      description: assign-unassign requests with given trip-no
 *      parameters:
 *          - in: path
 *            name: tripNo
 *            required: true
 *            description: trip no of the data to update the status and assignee
 *            schema:
 *              type: integer
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
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                      properties:
 *                                          runNo:
 *                                              type: integer
 *                                              description: trip run number
 *                              example:
 *                                  message: Request Assigned Successfully.
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
 *                                  message: Invalid Request.
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
