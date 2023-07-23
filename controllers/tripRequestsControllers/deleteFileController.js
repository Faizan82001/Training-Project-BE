const sendResponse = require('../../utils/sendResponse').response;
const Document = require('../../models').document;
const Helper = require('../../utils/s3helper');
const { updateDocsStatus } = require('../../utils/fireStoreHelper');

module.exports = async (req, res) => {
    try {
        const runNo = req.params.runNo;
        let documentName = req.query.documentName;
        if (!documentName) {
            throw {
                statusCode: 400,
                message: MESSAGES.INVALID_REQUEST
            };
        }
        const documentType = CONSTANTS.DOCUMENT_TYPE[documentName.split('.')[0].split('-')[1]];

        if (documentType === CONSTANTS.DOCUMENT_TYPE.face_sheet || documentType === CONSTANTS.DOCUMENT_TYPE.pcs) {
            documentName = `ocr-docs/${documentName}`;
        }

        await Helper.delete(process.env.BUCKET_NAME, documentName);

        await Document.update({ [documentType]: null }, { where: { runNo } });

        if (documentType === CONSTANTS.DOCUMENT_TYPE.face_sheet || documentType === CONSTANTS.DOCUMENT_TYPE.pcs) {
            await updateDocsStatus(runNo, { [documentType]: false, [`${documentType}OCR`]: false });
        } else {
            await updateDocsStatus(runNo, { [documentType]: false });
        }

        sendResponse(res, null, null, `${documentType} ${MESSAGES.DELETE_SUCCESS_MSG}`, 200);
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
