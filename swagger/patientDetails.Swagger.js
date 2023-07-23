/* eslint-disable max-len */
/**
 *  routes and schema for patientdetails
 */

/**
 * @openapi
 * /api/billing-admin/patient/{runNo}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [Billing-Admin]
 *      summary: open detailed view of requests
 *      parameters:
 *          - in: path
 *            name: runNo
 *            type: integer
 *            required: true
 *            description: run number of patient whoes data we want
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: object
 *                              properties:
 *                                  data:
 *                                      type: object
 *                                      properties:
 *                                           id:
 *                                               type: uuid
 *                                               description: uuid of patient
 *                                           name:
 *                                               type: string
 *                                               description: name of patient
 *                                           mrn:
 *                                               type: string
 *                                               description: patient's mrn number
 *                                           dob:
 *                                               type: Date
 *                                               description: date of birth of patient
 *                                           patientGender:
 *                                               type: string
 *                                               description: gender of patient
 *                                           patientAddress:
 *                                               type: string
 *                                               description: patient's address
 *                                           healthcareFacility:
 *                                               type: string
 *                                               description: facility provided to patient
 *                                           admissionDate:
 *                                               type: Date
 *                                               description: admission date
 *                                           admissionType:
 *                                               type: string
 *                                               description: admission type
 *                                           attendingPhysician:
 *                                               type: string
 *                                               description: attending physician
 *                                           diagnostics:
 *                                               type: string
 *                                               description: diagnostics
 *                                           thirdPartyPayer:
 *                                               type: string
 *                                               description: third party player
 *                                           subscriberName:
 *                                               type: string
 *                                               description: subscriber name
 *                                           insuranceAddress:
 *                                               type: string
 *                                               description: Insurance company's address
 *                                           insuranceContactNo:
 *                                               type: string
 *                                               description: Insurance company's contact number
 *                                           policyNo:
 *                                               type: string
 *                                               description: Policy number
 *                                           insuranceGroupName:
 *                                               type: string
 *                                               description: Insurance group name
 *                                           insuranceGroupNo:
 *                                               type: string
 *                                               description: Insurance group number
 *                                           guarantorName:
 *                                               type: string
 *                                               description: Guarantor's name
 *                                           guarantorAddress:
 *                                               type: string
 *                                               description: Guaranter's address
 *                                           guarantorGender:
 *                                               type: string
 *                                               description: Guaranter's gender
 *                                           guarantorWeight:
 *                                               type: string
 *                                               description: Guaranter's gender
 *                                           guarantorHeight:
 *                                               type: string
 *                                               description: Guaranter's height
 *                                           relationship:
 *                                               type: string
 *                                               description: Relationship
 *                                           diagnosis:
 *                                               type: string
 *                                               description: Diagnosis
 *                                           createdAt:
 *                                               type: Date
 *                                               description: Date for creation of requestlist
 *                                           updatedAt:
 *                                               type: Date
 *                                               description: Updated date for creation of requestlist
 *                                           tripRunNo:
 *                                               type: integer
 *                                               description: run no of patient
 *                                           status:
 *                                               type: string
 *                                               description: status of request
 *                              example:
 *                                  data:
 *                                        id: 77aab84a-4d72-4db4-840b-24d5a3c937a3
 *                                        name: Mayank Makwana
 *                                        mrn: 69d55be5be66c021
 *                                        dob: 21/05/2002
 *                                        patientGender: male
 *                                        patientAddress: Mount abu
 *                                        healthcareFacility: Global Hospital
 *                                        admissionDate: 1/5/2023
 *                                        admissionType: Emergency
 *                                        attendingPhysician: Deep
 *                                        diagnostics: sonar
 *                                        thirdPartyPayer: Tata
 *                                        subscriberName: Arjun
 *                                        insuranceAddress: Ahmedabad
 *                                        insuranceContactNo: "9876543222"
 *                                        policyNo: "100215634215"
 *                                        insuranceGroupName: LIC
 *                                        insuranceGroupNo: "12023"
 *                                        guarantorName: Nisarg
 *                                        guarantorAddress: Ahmedabad
 *                                        guarantorGender: male
 *                                        guarantorWeight: 60kg
 *                                        guarantorHeight: 5 foot 7 inches
 *                                        relationship: Brother
 *                                        diagnosis: Covid-19
 *                                        createdAt: 2023-04-25T17:57:26.429Z
 *                                        updatedAt: 2023-04-25T17:57:26.429Z
 *                                        tripRunNo: 46239
 *                                        status: New Request
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
