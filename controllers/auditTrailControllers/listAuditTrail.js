const auditTrail = require('../../models').audit_trail;
const sendResponse = require('../../utils/sendResponse').response;

module.exports = async (req, res) => {
    try {
        const runNo = req.params.runNo;
        const data = await auditTrail.findAll({
            attributes: ['firstName', 'lastName', 'createdAt', 'updatedAt', 'status', 'runNo', 'roleId'],
            where: {
                runNo
            },
            order: [['updatedAt', 'DESC']]
        });

        if (data.length === 0) {
            throw {
                statusCode: 400,
                message: MESSAGES.INVALID_REQUEST
            };
        }

        data.map((item) => {
            switch (item.status) {
                case CONSTANTS.TRIP_STATUS.NEW:
                    item.dataValues.message = `New Request has been created with Run No ${item.runNo}`;
                    break;
                case CONSTANTS.TRIP_STATUS.REVIEW:
                    item.dataValues.message = `Request with Run No ${item.runNo} has been Assigned for Review`;
                    break;
                case CONSTANTS.TRIP_STATUS.MORE_INFO:
                    item.dataValues.message = `Request with Run No ${item.runNo} Requires more information`;
                    break;
                case CONSTANTS.TRIP_STATUS.DATA_PROVIDED:
                    item.dataValues.message = `Data provided by the EMT Nurse for the Run No ${item.runNo}`;
                    break;
                case CONSTANTS.TRIP_STATUS.EXCEPTION:
                    item.dataValues.message = `Request with Run No ${item.runNo} has been Approved with Exception`;
                    break;
                case CONSTANTS.TRIP_STATUS.APPROVED:
                    item.dataValues.message = `Request with Run No ${item.runNo} has been Approved`;
                    break;
                case CONSTANTS.TRIP_NOTIFICATION.UNASSIGNED_REQUEST:
                    item.dataValues.message = `Request with Run No ${item.runNo} has been Unassigned`;
                    break;
                default:
                    item.dataValues.message = MESSAGES.INVALID_REQUEST;
                    break;
            }
            return item;
        });
        sendResponse(res, null, { data }, null);
    } catch (error) {
        sendResponse(res, error, null, error.message, 400);
    }
};
