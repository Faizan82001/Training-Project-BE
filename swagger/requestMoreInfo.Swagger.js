/**
 *  routes and schema for Request more Information
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      requestmoreinfo:
 *          type: object
 *          required:
 *              -message
 *          properties:
 *              message:
 *                  type: string
 *                  description: message provided by the billing admin
 *          example:
 *              message: MRN No is Misssing
 */

/**
 * @openapi
 * /api/billing-admin/request-more-info/{runNo}:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags: [Billing-Admin]
 *      summary: request more information message passed to the comments section and in addtion audit trail data inserted.
 *      parameters:
 *          - name: runNo
 *            in: path
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/requestmoreinfo'
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
 *                                      description: Message from Server
 *                              example:
 *                                   message: Message added to comments section and Audit trail updated.
 *          400:
 *              description: Validation error/ Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: Message from Server
 *                              example:
 *                                  message: Invalid request.
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
 *          500:
 *              description: Server error
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: Message from server
 *                              example:
 *                                  message: Server Error
 */
