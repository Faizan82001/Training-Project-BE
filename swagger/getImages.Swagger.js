/* eslint-disable max-len */
/**
 *  routes and schema for search trips
 */

/**
 * @openapi
 * /api/trip-requests/trip-image:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Trips/Requests]
 *      summary: search already created trip/request.
 *      parameters:
 *          - in: query
 *            name: runNo
 *            type: integer
 *            required: true
 *            description: run number for trip/request.
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: Object
 *                                      description: data from server
 *                                      properties:
 *                                          runNo:
 *                                              type: integer
 *                                              description: run number of requests
 *                                          faceSheet:
 *                                              type: string
 *                                              description: link for facesheet
 *                                          pcs:
 *                                              type: string
 *                                              description: link for pcs
 *                                          aob:
 *                                              type: string
 *                                              description: link foraob
 *                                          other1:
 *                                              type: string
 *                                              description: link for other1
 *                                          other2:
 *                                              type: string
 *                                              description: link for other2
 *                                          other3:
 *                                              type: string
 *                                              description: link for other2
 *                                          other4:
 *                                              type: string
 *                                              description: link for other2
 *                                          createdAt:
 *                                              type: Date
 *                                              description: time when trip is created
 *                                          updatedAt:
 *                                              type: Date
 *                                              description: time when trip last updated
 *                                          "trip_data.status":
 *                                              type: string
 *                                              description: status of trip
 *                                          status:
 *                                              type: string
 *                                              description: status of trip
 *                              example:
 *                                  data:
 *                                   - runNo: 1111
 *                                     faceSheet: https://s3-docs-mddata-intern.s3.us-west-1.amazonaws.com/55-face_sheet.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2O2YV62RN4IPI4KW%2F20230505%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230505T095454Z&X-Amz-Expires=3600&X-Amz-Signature=3ef169665ae7db4c650079186c7991999077ed68f53fbaa41c96e4cb1cacdd39&X-Amz-SignedHeaders=host&x-id=GetObject
 *                                     pcs: https://s3-docs-mddata-intern.s3.us-west-1.amazonaws.com/1111-pcs.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2O2YV62RN4IPI4KW%2F20230505%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230505T095454Z&X-Amz-Expires=3600&X-Amz-Signature=751abb6952b15405c7cefeeb503c8f7554f56c2cd828493e57f0d1413988ab1a&X-Amz-SignedHeaders=host&x-id=GetObject
 *                                     aob: null
 *                                     other1: null
 *                                     other2: null
 *                                     other3: null
 *                                     other4: null
 *                                     createdAt: "2023-05-05T07:47:40.964Z"
 *                                     updatedAt: "2023-05-05T08:33:28.211Z"
 *                                     "trip_data.status": "New Request"
 *                                     status: New Request
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
 *              description: Data not found.
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: Data not found.
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
