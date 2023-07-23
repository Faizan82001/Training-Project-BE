const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'testing';
dotenv.config({ path: env + '.env' });

require('./init.spec');

require('./allTests/ambulanceTypes.spec');
require('./allTests/changePassword.spec');
require('./allTests/forgotPassword.spec');
require('./allTests/login.spec');
require('./allTests/register.spec');
require('./allTests/searchTrip.spec');
require('./allTests/setPassword.spec');
require('./allTests/userlist.spec');
require('./allTests/uploadImage.spec');
require('./allTests/deleteImage.spec');
require('./allTests/assignUnassignRequests.spec');
require('./allTests/requestList.spec');
require('./allTests/patientDetails.spec');
require('./allTests/createTrip.spec');
require('./allTests/requestMoreInfo.spec');
require('./allTests/dataProvided.spec');
require('./allTests/approveRequests.spec');
require('./allTests/approveWithException.spec');
require('./allTests/listAuditTrail.spec');
require('./allTests/getImages.spec');
require('./allTests/facesheetOCR.spec');
require('./allTests/issues.spec');
require('./allTests/totalRequests.spec');
require('./allTests/issueList.spec');
require('./allTests/chatData.spec');
require('./allTests/avgTimeTaken.spec');
require('./allTests/pcsOCR.spec');
require('./allTests/logout.spec');
require('./allTests/getTrips.spec');
require('./allTests/perfomanceCounter.spec');
require('./allTests/listBillingAdmin.spec');
require('./allTests/changeUserStatus.spec');
require('./allTests/setFcmToken.spec');

require('./end.spec');

