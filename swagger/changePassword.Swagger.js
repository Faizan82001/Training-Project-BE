/**
 *  routes and schema for change password
 */

/**
 * @openapi
 * components:
 *  schemas:
 *      changePassword:
 *          type: object
 *          required:
 *              - oldPassword
 *              - newPassword
 *              - confirmPassword
 *          properties:
 *              oldPassword:
 *                  type: string
 *                  description: old password of user
 *              newPassword:
 *                  type: string
 *                  description: new password which user want to change
 *              confirmPassword:
 *                  type: string
 *                  description: same password as new password
 *          example:
 *              oldPassword: U2FsdGVkX18PoAC/IbCsvjdAQtzIYz6aVaPbCN6mKds=
 *              newPassword: U2FsdGVkX18PoAC/IbCsvjdAQtzIYz6aVaPbCN6mKds=
 *              confirmPassword: U2FsdGVkX18PoAC/IbCsvjdAQtzIYz6aVaPbCN6mKds=
 */

/**
 * @openapi
 * /api/auth/change-password:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      tags: [User]
 *      summary: change password
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/changePassword'
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
 *                                  message: Please enter a password that has
 *                                           minimum 8 and maximum 20 character.
 *                                           It should contain atleast 1 uppercase,
 *                                           1 lowercase letter, 1 special character and 1 number.
 *          401:
 *              description: Unauthorized for password change
 *              content:
 *                  application/json:
 *                       schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: Your password is incorrect.Please enter correct password.
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
