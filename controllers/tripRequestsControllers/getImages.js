const Trip = require('../../models').trip;
const Document = require('../../models').document;
const sendResponse = require('../../utils/sendResponse').response;
const Helper = require('../../utils/s3helper');

const statusInclude = {
    model: Trip,
    as: 'trip_data',
    attributes: [
        [
            Trip.sequelize.col('status'),
            'status'
        ]
    ]
};

module.exports = async (req, res) => {
    try {
        const request = req.query.runNo;
        if (!request) {
            throw {
                statusCode: 400,
                message: MESSAGES.INVALID_PAGE
            };
        }
        const data = await Document.findOne({
            where: {
                runNo: +request
            },
            include: [statusInclude],
            raw: true
        });
        if (!data) {
            sendResponse(res, null, null, MESSAGES.TRIP_NOT_FOUND, 404);
        } else {
            data.status = data['trip_data.status'];
            data.faceSheet = data.faceSheet ? await Helper.getSignedURL(data.faceSheet) : null;
            data.pcs = data.pcs ? await Helper.getSignedURL(data.pcs) : null;
            data.aob = data.aob ? await Helper.getSignedURL(data.aob) : null;
            data.other1 = data.other1 ? await Helper.getSignedURL(data.other1) : null;
            data.other2 = data.other2 ? await Helper.getSignedURL(data.other2) : null;
            data.other3 = data.other3 ? await Helper.getSignedURL(data.other3) : null;
            data.other4 = data.other4 ? await Helper.getSignedURL(data.other4) : null;
            sendResponse(res, null, { data }, null);
        }
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
