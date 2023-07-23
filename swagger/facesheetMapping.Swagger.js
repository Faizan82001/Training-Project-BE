/**
 *  routes and schema for upload documents images
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      facesheetMapping:
 *          type: object
 *          required:
 *              - key
 *              - data
 *          properties:
 *              key:
 *                  type: string
 *                  description: name of document.
 *              data:
 *                  type: object
 *                  additionalProperties:
 *                      type: object
 *                  description: data parsed from textract lambda
 *          example:
 *              key: ocr-docs/1111-face_sheet.jpg
 *              data:
 *                  heading1:
 *                      field1: value1
 *                  heading2:
 *                      field2: value2
 *                      field3: value3
 */

/**
 * @openapi
 * /api/ocr/face-sheet:
 *  post:
 *      tags: [OCR]
 *      summary: This API send parsed data from textract lambda to backend server.
 *      parameters:
 *          - in: header
 *            name: lambda-header
 *            type: string
 *            required: true
 *            description: authorization key.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/facesheetMapping'
 *      responses:
 *          200:
 *              description: data looged successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: face-sheet data logged successfully.
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
 *                                  message: key field is required.
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
