/**
 *  routes and schema for requestlist
 */

/**
 * @openapi
 * /api/billing-admin/requests:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [Billing-Admin]
 *      summary: list all requests data
 *      parameters:
 *          - in: query
 *            name: requestType
 *            schema:
 *              type: string,
 *              description: type of request
 *          - in: query
 *            name: status
 *            schema:
 *              type: string,
 *              description: type of status in each request
 *          - in: query
 *            name: myRequest
 *            schema:
 *              type: string,
 *              description: myRequest toggle (default:false)
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer,
 *              description: listing details using pagination (default:1)
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
 *                                          serviceType:
 *                                              type: string
 *                                              description: trip service type
 *                                          creatorId:
 *                                              type: uuid
 *                                              description: creator id for that trip
 *                                          assignee:
 *                                              type: uuid
 *                                              description: assignee id for listing request
 *                                          status:
 *                                              type: string
 *                                              description: type of status for each request
 *                                          exceptionMessage:
 *                                              type: string
 *                                              description: exceptionMessage for each request
 *                                          createdAt:
 *                                              type: date
 *                                              description: date for creation of request list
 *                                          updatedAt:
 *                                              type: date
 *                                              description: date for updated request list
 *                                          patientName:
 *                                              type: string
 *                                              description: name of the patient
 *                                          creator_data.nurseName:
 *                                              type: string
 *                                              description: name of the nurse
 *                                          assignee_data.assigneeName:
 *                                              type: string
 *                                              description: name of the assignee
 *                                  paginationData:
 *                                      type: array
 *                                      properties:
 *                                          currentPage:
 *                                              type: integer
 *                                              description: current page of the requestlist
 *                                          limit:
 *                                              type: string
 *                                              description: limit to be displayed per page
 *                                          totalDocs:
 *                                              type: uuid
 *                                              description: total number of documents as per the request
 *                                          totalPages:
 *                                              type: uuid
 *                                              description: total number of pages as per the request
 *                                          hasPrevPage:
 *                                              type: uuid
 *                                              description: check for the previous page of the requestlist
 *                                          hasNextPage:
 *                                              type: uuid
 *                                              description: check for the next page of the requestlist
 *                                          prevPage:
 *                                              type: uuid
 *                                              description: prev page of the requestlist
 *                                          nextPage:
 *                                              type: uuid
 *                                              description: next page of the requestlist
 *                              example:
 *                                  data:
 *                                      - runNo: 46238
 *                                        serviceType: ALS
 *                                        creatorId: fb2e3e70-439f-483b-ad91-258fe03a95da
 *                                        assignee: null
 *                                        status: New Request
 *                                        exceptionMessage: null
 *                                        createdAt: 2023-04-25T17:57:26.429Z
 *                                        updatedAt: 2023-04-25T17:57:26.429Z
 *                                        patientName: Kit Powell
 *                                        creator_data.nurseName: Alex Bob
 *                                  requestCount: 1
 *                                  paginationData:
 *                                        currentPage: 1
 *                                        limit: 10
 *                                        totalDocs: 4
 *                                        totalPages: 1
 *                                        hasPrevPage: false
 *                                        hasNextPage: false
 *                                        prevPage: null
 *                                        nextPage: null
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
 *                                  message: Invalid Page request.
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
