const controllers = {
    requestMoreInformation: require('./requestMoreInformation'),
    approveWithException: require('./approveWithException'),
    changeStatusAssignUnAssign: require('./assignUnassignRequests'),
    requestListController: require('./requestList'),
    approveRequests: require('./approveRequests'),
    patientDetails: require('./patientDetails')
};

module.exports = controllers;
