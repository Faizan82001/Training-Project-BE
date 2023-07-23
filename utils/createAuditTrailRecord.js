const User = require('../models').user;
const auditTrail = require('../models').audit_trail;

const createAuditTrailRecord = async ({ data }) => {

    const userData = await User.findOne({
        where: {
            id: data.assigneeId
        }
    });

    await auditTrail.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        roleId: userData.roleId,
        status: data.updateStatus,
        runNo: data.runNo
    });
};

module.exports = { createAuditTrailRecord };

