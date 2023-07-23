/**
 *  routes and schema for upload documents images
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      uploadDocuments:
 *          type: object
 *          required:
 *              - documentName
 *              - image
 *          properties:
 *              documentName:
 *                  type: string
 *                  description: name of document. (naming format = 'runNumber'-'documentName'.jpg)
 *              image:
 *                  type: string
 *                  description: base64 string conversion of image
 *          example:
 *              documentName: 12345-face_sheet.jpg
 *              image: <base64 string>
 */

/**
 * @openapi
 * /api/trip-requests/docs/{runNo}:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Trips/Requests]
 *      summary: upload documents for trips/requests.
 *      parameters:
 *          - in: path
 *            name: runNo
 *            type: integer
 *            required: true
 *            description: run number for trip/request.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/uploadDocuments'
 *      responses:
 *          201:
 *              description: document uploaded successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: Image uploaded successfully.
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
 *                                  message: documentName field is required.
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
