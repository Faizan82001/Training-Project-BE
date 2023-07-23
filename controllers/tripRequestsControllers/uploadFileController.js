const sendResponse = require('../../utils/sendResponse').response;
const Validation = require('../../utils/validations');
const Document = require('../../models').document;
const Helper = require('../../utils/s3helper');
const { updateDocsStatus } = require('../../utils/fireStoreHelper');

module.exports = async (req, res) => {
    try {
        const runNo = req.params.runNo;
        let documentName = req.body.documentName;
        const base64String = req.body.image;
        const validation = Validation.fieldsRequiredValidation([documentName, base64String], ['documentName', 'image']);

        if (validation.message) {
            throw {
                statusCode: 400,
                message: validation.message
            };
        }
        const documentType = CONSTANTS.DOCUMENT_TYPE[documentName.split('.')[0].split('-')[1]];

        if (documentType === CONSTANTS.DOCUMENT_TYPE.face_sheet || documentType === CONSTANTS.DOCUMENT_TYPE.pcs) {
            documentName = `ocr-docs/${documentName}`;
        }

        const buffer = Buffer.from(base64String, 'base64');

        await Helper.upload(process.env.BUCKET_NAME, buffer, documentName, 'image/jpeg');

        await Document.upsert({ runNo, [documentType]: documentName });

        await updateDocsStatus(runNo, { [documentType]: true });

        sendResponse(res, null, null, `${documentType} ${MESSAGES.UPLOAD_SUCCESS_MSG}`, 201);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
