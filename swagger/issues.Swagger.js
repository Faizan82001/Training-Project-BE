/**
 *  routes and schema for report issues
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      reportIssues:
 *          type: object
 *          required:
 *              - title
 *              - description
 *          properties:
 *              title:
 *                  type: string
 *              description:
 *                  type: text
 *          example:
 *              title: trip issue
 *              description: this is a test issue
 */

/**
 * @openapi
 * /api/report-issue:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Report-Issue]
 *      summary: report issues.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/reportIssues'
 *      responses:
 *          200:
 *              description: Report Submitted Successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: Report Submitted Successfully.
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
 *                                  message: title field is required.
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
