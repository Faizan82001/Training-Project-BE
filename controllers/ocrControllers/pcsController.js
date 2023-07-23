const sendResponse = require('../../utils/sendResponse').response;
const Patient = require('../../models').patient;
const Document = require('../../models').document;
const Validation = require('../../utils/validations');
const { updateDocsStatus, getDocStatus, sendNotification } = require('../../utils/fireStoreHelper');
const Helper = require('../../utils/s3helper');
const moment = require('moment');
const { parseData, checkSignatures } = require('../../utils/OCRParser/pcsParser');
const { similarity } = require('../../utils/utilFunctions');

const getData = (data, field, validation) => {
    const keys = Object.keys(data).find((key) => {
        const updatedKey = key.trim().replace(/[ #(),/]/g, '').toUpperCase();
        return (updatedKey === field.field) || (similarity(updatedKey, field.field) >= 0.85);
    });
    const result = data[keys] ? data[keys].trim() : '';

    if (result === '' || (typeof validation === 'function' && !validation(result))) {
        return null;
    }
    return result;
};

const dateFormatter = (dateString) => {
    if (dateString === null) {
        return null;
    }
    const dateFormats = ['D/M/YYYY H:mm', 'DD/MM/YY,h:mma', 'DD/MM/YY', 'h:mma', 'HH:mm'];
    let momentDate = null;

    for (let i = 0; i < dateFormats.length; i++) {
        const format = dateFormats[i];
        momentDate = moment(dateString, format);
        if (momentDate.isValid()) {
            break;
        }
    }
    return momentDate;
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
        const signatures = checkSignatures(data);

        const patient = {
            pickupLocation: getData(parsedData, CONSTANTS.MAPPING.PCS.pickupLocation),
            pickupDateTime: dateFormatter(getData(parsedData, CONSTANTS.MAPPING.PCS.pickupDateTime)),
            requestedBy: getData(parsedData, CONSTANTS.MAPPING.PCS.requestedBy),
            contactNumber: getData(parsedData, CONSTANTS.MAPPING.PCS.contactNumber, Validation.contactPhone),
            pickupLocationunitRoom: getData(parsedData, CONSTANTS.MAPPING.PCS.pickupLocationunitRoom),
            sendingMD: getData(parsedData, CONSTANTS.MAPPING.PCS.sendingMD),
            destinationAddress: getData(parsedData, CONSTANTS.MAPPING.PCS.destinationAddress),
            destinationUnitRoom: getData(parsedData, CONSTANTS.MAPPING.PCS.destinationUnitRoom),
            acceptingMD: getData(parsedData, CONSTANTS.MAPPING.PCS.acceptingMD),
            appointmentDateTime: dateFormatter(getData(parsedData, CONSTANTS.MAPPING.PCS.appointmentDateTime)),
            tripRunNo: +(key.replace(/\D/g, ''))
        };
        const ocrValidation = Validation.pcsOcrValidation({ data: patient, signatures });
        if (ocrValidation) {
            await updateDocsStatus(patient.tripRunNo, { pcsOCR: true });
            await Patient.upsert({ ...patient });
            sendResponse(res, null, null, MESSAGES.PCS_LOGGED);
        } else {
            await Helper.delete(process.env.BUCKET_NAME, key);
            await Document.update({ [CONSTANTS.DOCUMENT_TYPE.pcs]: null }, { where: { runNo: patient.tripRunNo } });
            await updateDocsStatus(patient.tripRunNo, { pcsOCR: false, pcs: false });
            const { creatorId } = await getDocStatus(patient.tripRunNo);
            const notification = {
                receiverId: creatorId,
                status: CONSTANTS.TRIP_NOTIFICATION.OCR_FAILURE,
                runNo: patient.tripRunNo,
                documentType: CONSTANTS.DOCUMENT_TYPE.pcs
            };
            await sendNotification(notification);
            sendResponse(res, null, null, MESSAGES.PCS_LOGGED_FAILED);
        }
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
