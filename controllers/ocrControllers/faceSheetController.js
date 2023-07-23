const sendResponse = require('../../utils/sendResponse').response;
const Patient = require('../../models').patient;
const Document = require('../../models').document;
const Validation = require('../../utils/validations');
const Helper = require('../../utils/s3helper');
const { updateDocsStatus, getDocStatus, sendNotification } = require('../../utils/fireStoreHelper');
const { parseData } = require('../../utils/OCRParser/faceSheetParser');

const getData = (data, field, validation) => {
    if (data[field.parentField]) {
        const keys = Object.keys(data[field.parentField]);
        const result = keys.filter(key => key.includes(field.field));
        if (typeof validation === 'function' && data[field.parentField][result[0]]
            && validation(data[field.parentField][result[0]].trim())) {
            return data[field.parentField][result[0]].trim();
        }
        return data[field.parentField][result[0]] ? data[field.parentField][result[0]].trim() : null;
    }
    return null;
};

const dateFormatter = (dateString) => {
    const validation = Validation.facesheetDate(dateString);
    if (validation) {
        const d = dateString.split('/');
        return new Date(`${d[2]}/${d[1]}/${d[0]}`);
    }
    return null;
};

module.exports = async (req, res) => {
    try {
        const { data, key } = req.body;
        const validation = Validation.fieldsRequiredValidation([data, key], ['data', 'key']);

        if (validation.message) {
            throw {
                statusCode: 400,
                message: validation.message
            };
        }

        const parsedData = parseData(data);

        const patient = {
            name: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.name, Validation.facesheetName),
            mrn: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.mrn),
            dob: dateFormatter(getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.dob, Validation.facesheetDate)),
            patientGender: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.patientGender, Validation.genderValidation),
            patientAddress: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.patientAddress),
            healthcareFacility: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.healthcareFacility),
            admissionDate: dateFormatter(getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.admissionDate, Validation.facesheetDate)),
            admissionType: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.admissionType),
            attendingPhysician: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.attendingPhysician),
            thirdPartyPayer: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.thirdPartyPayer),
            subscriberName: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.subscriberName, Validation.facesheetName),
            insuranceAddress: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.insuranceAddress),
            insuranceContactNo: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.insuranceContactNo, Validation.phoneNumber),
            policyNo: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.policyNo),
            insuranceGroupName: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.insuranceGroupName),
            insuranceGroupNo: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.insuranceGroupNo),
            guarantorName: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.guarantorName, Validation.facesheetName),
            guarantorAddress: `${getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.guarantorAddress)}, \
            ${getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.guarantorCity)}`,
            guarantorGender: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.guarantorGender, Validation.genderValidation),
            guarantorWeight: isNaN(parseFloat(getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.guarantorWeight))) ?
                null : parseFloat(getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.guarantorWeight)),
            guarantorHeight: isNaN(parseFloat(getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.guarantorHeight))) ?
                null : parseFloat(getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.guarantorHeight)),
            relationship: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.relationship),
            diagnosis: getData(parsedData, CONSTANTS.MAPPING.FACE_SHEET.diagnosis),
            tripRunNo: +(key.replace(/\D/g, ''))
        };
        const ocrValidation = Validation.facesheetOCRValidation(patient);
        if (ocrValidation) {
            await updateDocsStatus(patient.tripRunNo, { faceSheetOCR: true });
            await Patient.upsert({ ...patient });
            sendResponse(res, null, null, MESSAGES.FACE_SHEET_LOGGED);
        } else {
            await Helper.delete(process.env.BUCKET_NAME, key);
            await Document.update({ [CONSTANTS.DOCUMENT_TYPE.face_sheet]: null }, { where: { runNo: patient.tripRunNo } });
            await updateDocsStatus(patient.tripRunNo, { faceSheetOCR: false, faceSheet: false });
            const { creatorId } = await getDocStatus(patient.tripRunNo);
            const notification = {
                receiverId: creatorId,
                status: CONSTANTS.TRIP_NOTIFICATION.OCR_FAILURE,
                runNo: patient.tripRunNo,
                documentType: CONSTANTS.DOCUMENT_TYPE.face_sheet
            };
            await sendNotification(notification);
            sendResponse(res, null, null, MESSAGES.FACE_SHEET_LOGGED_FAILED);
        }
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
