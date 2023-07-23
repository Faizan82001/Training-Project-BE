const Patient = require('../../models').patient;
const Trip = require('../../models').trip;
const sendResponse = require('../../utils/sendResponse').response;

const statusInclude = {
    model: Trip,
    as: 'run_no',
    attributes: []
};

module.exports = async (req, res) => {
    try {
        const tripRunNo = req.params.runNo;
        const data = await Patient.findOne({
            attributes: { include: [[Trip.sequelize.col('run_no.status'), 'status']] },
            where: { tripRunNo },
            include: [statusInclude],
            raw: true
        });
        if (data) {
            sendResponse(res, null, { data }, null);
        } else {
            throw {
                statusCode: 404,
                message: MESSAGES.PATIENT_NOT_FOUND
            };
        }
    } catch (error) {
        sendResponse(res, error, null, error.message);
    }
};
