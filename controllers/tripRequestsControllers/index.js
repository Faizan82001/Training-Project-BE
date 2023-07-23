const controllers = {
    ambulanceType: require('./ambulanceTypeController'),
    searchTrip: require('./searchTripController'),
    uploadFile: require('./uploadFileController'),
    deleteFile: require('./deleteFileController'),
    createTrip: require('./createTripController'),
    getImages: require('./getImages'),
    dataProvided: require('./dataProvidedController'),
    chatData: require('./chatDataController'),
    getTrips: require('./getTripsController')
};

module.exports = controllers;
