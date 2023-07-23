/**
 *  routes and schema for listaudittrail
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      listaudittrail:
 *          type: object
 *          required:
 *              - firstName
 *              - lastName
 *              - createdAt
 *              - updatedAt
 *              - status
 *              - runNo
 *              - message
 *          properties:
 *              firstName:
 *                  type: string
 *                  description: first name of the billing admin
 *              lastName:
 *                  type: string
 *                  description: last name of the billing admin
 *              createdAt:
 *                  type: date
 *                  description: created date for the request more information
 *              updatedAt:
 *                  type: date
 *                  description: updated date for the request more information
 *              status:
 *                  type: enum
 *                  description: current status for requestlist
 *              runNo:
 *                  type: integer
 *                  description: run number for requestlist
 *              message:
 *                  type: string
 *                  description: action message added to Audit-trail
 *          example:
 *              firstName: Maria,
 *              lastName: Nelson,
 *              createdAt: 2023-05-02T11:06:01.639Z,
 *              updatedAt: 2023-05-02T11:06:01.640Z,
 *              status: Request more Information,
 *              runNo: 46240,
 *              message: Request with Run No 46240 Requires more information
 */

/**
 * @openapi
 * /api/audit-trail/list/{runNo}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [Audit Trail]
 *      summary: list audit trail data
 *      parameters:
 *          - name: runNo
 *            in: path
 *            required: true
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
 *                                          firstName:
 *                                              type: string
 *                                              description: billing-admin first name
 *                                          lastName:
 *                                              type: string
 *                                              description: billing-admin last name
 *                                          status:
 *                                              type: string
 *                                              description: type of status for each request
 *                                          runNo:
 *                                              type: integer
 *                                              description: run no for each request
 *                                          createdAt:
 *                                              type: date
 *                                              description: date for creation of request list
 *                                          updatedAt:
 *                                              type: date
 *                                              description: date for updated request list
 *                                          message:
 *                                              type: string
 *                                              description: action message added to Audit-trail
 *                              example:
 *                                  data:
 *                                      - firstName: Maria,
 *                                        lastName: Nelson,
 *                                        status: Request more Information,
 *                                        createdAt: 2023-05-02T11:06:01.639Z,
 *                                        updatedAt: 2023-05-02T11:06:01.640Z,
 *                                        runNo: 46240
 *                                        message: Request with Run No 46240 Requires more information
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
