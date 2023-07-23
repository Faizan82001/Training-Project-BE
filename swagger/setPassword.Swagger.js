/**
 *  routes and schema for set password
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      setPassword:
 *          type: object
 *          required:
 *              - password
 *              - confirmPassword
 *          properties:
 *              password:
 *                  type: string
 *                  description: new password which user want to change
 *              confirmPassword:
 *                  type: string
 *                  description: same password as new password
 *          example:
 *              password: U2FsdGVkX18PoAC/IbCsvjdAQtzIYz6aVaPbCN6mKds=
 *              confirmPassword: U2FsdGVkX18PoAC/IbCsvjdAQtzIYz6aVaPbCN6mKds=
 */

/**
 * @openapi
 * /api/auth/set-password/{token}:
 *  post:
 *      tags: [Authentication]
 *      summary: set password
 *      parameters:
 *          - in: path
 *            name: token
 *            type: string
 *            required: true
 *            description: token sent from email.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/setPassword'
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
 *                              example:
 *                                  message: Password changed successfully.
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
 *                                  message: Please enter a password that has minimum 8 and maximum 20 character.
 *                                           It should contain atleast 1 uppercase, 1 lowercase letter, 1 special character and 1 number.
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
