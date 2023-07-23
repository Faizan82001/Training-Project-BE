/**
 *  routes and schema for change the fcmToken of user
 */

/**
 * @openapi
 * /api/auth/set-fcm-token:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags: [User]
 *      summary: change fcmToken of the user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                        type: object
 *                        required:
 *                            - fcmToken
 *                        properties:
 *                            fcmToken:
 *                               type: string
 *                               description: change fcm of the user
 *                        example:
 *                            fcmToken: eAV5dADPt9oACJy6FCo-qj:APA91bG8cl-ju4r0wvMBNw2UmIpdqOI8mR
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
 *                                  message: User fcmToken updated successfully.
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
 *          404:
 *              description: Not Found
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      description: message from server
 *                              example:
 *                                  message: User not found.
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
