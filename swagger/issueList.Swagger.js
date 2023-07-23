/**
 *  routes and schema for listing issues
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      issuelist:
 *          type: object
 *          required:
 *              - id
 *              - title
 *              - description
 *          properties:
 *              id:
 *                  type: uuid
 *                  description: the id of the issue
 *              title:
 *                  type: string
 *                  description: the title of the issue
 *              description:
 *                  type: string
 *                  description: the description of the issue
 *          example:
 *              data:
 *              - id: abc309bf-2cb5-4a4c-a82e-ba40d7abc882
 *                title: trip issue
 *                description: this is a test issue
 */

/**
 * @openapi
 * /api/report-issue/issue-list:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [Report-Issue]
 *      summary: list all issues added by EMT Nurse
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                      properties:
 *                                          id:
 *                                              type: uuid
 *                                              description: the id of the issue
 *                                          title:
 *                                              type: string
 *                                              description: the title of the issue
 *                                          description:
 *                                              type: string
 *                                              description: the description of the issue
 *                              example:
 *                                  data:
 *                                      - id: abc309bf-2cb5-4a4c-a82e-ba40d7abc882
 *                                        title: trip issue
 *                                        percentage: this is a test issue
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
 *                                      description: message from server
 *                              example:
 *                                  message: Server Error
 */
