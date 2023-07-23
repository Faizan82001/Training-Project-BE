const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../config/firebase-admin-sdk');
initializeApp({ credential: cert(serviceAccount) });
const User = require('../models/index').user;

exports.db = getFirestore();
exports.admin = require('firebase-admin');

const messageHelper = (status, runNo, documentType) => {
    switch (status) {
        case CONSTANTS.TRIP_NOTIFICATION.NEW_REQUEST:
            return `New Request has been created with Run No. ${runNo}`;

        case CONSTANTS.TRIP_NOTIFICATION.ASSIGNED_REQUEST:
            return `Request with Run No. ${runNo} has been Assigned for Review`;

        case CONSTANTS.TRIP_NOTIFICATION.REQUEST_MORE_INFO:
            return `Request with Run No. ${runNo} Requires more information`;

        case CONSTANTS.TRIP_NOTIFICATION.DATA_PROVIDED:
            return `Request with Run No. ${runNo} has been submitted again for Approval`;

        case CONSTANTS.TRIP_NOTIFICATION.APPROVED_REQUEST:
            return `Request with Run No. ${runNo} has been Approved`;

        case CONSTANTS.TRIP_NOTIFICATION.APPROVED_WITH_EXCEPTION:
            return `Request with Run No. ${runNo} has been Approved with Exception`;

        case CONSTANTS.TRIP_NOTIFICATION.UNASSIGNED_REQUEST:
            return `Request with Run No. ${runNo} has been Unassigned`;

        case CONSTANTS.TRIP_NOTIFICATION.OCR_FAILURE:
            return `Request with Run No. ${runNo} has OCR Failure of ${documentType}`;

        default:
            return '';
    }
};

exports.sendMessage = async (data) => {
    await exports.db.collection(data.runNo).add({
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: messageHelper(data.status, data.runNo),
        status: data.status,
        subMessage: data.subMessage,
        timestamp: Date.now()
    });
};

exports.searchNewMessage = async (runNo) => {
    const res = await exports.db.collection(runNo).where('status', '==', CONSTANTS.TRIP_NOTIFICATION.NEW_REQUEST).get();
    return !res.empty;
};

exports.updateDocsStatus = async (runNo, status) => {
    await exports.db.collection('uploaded-doc-status').doc(`${runNo}`).update({
        ...status
    });
};

exports.getDocStatus = async (runNo) => {
    const doc = await exports.db.collection('uploaded-doc-status').doc(`${runNo}`).get();
    return doc.exists ? doc.data() : null;
};

exports.setDocStatus = async (runNo, creatorId) => {
    await exports.db.collection('uploaded-doc-status').doc(`${runNo}`).set({
        faceSheet: false,
        pcs: false,
        aob: false,
        other1: false,
        other2: false,
        other3: false,
        other4: false,
        faceSheetOCR: false,
        pcsOCR: false,
        creatorId
    });
};

exports.sendNotification = async (data) => {
    try {
        const { fcmToken } = await User.findOne({ attributes: ['fcmToken'], where: { id: data.receiverId }, raw: true });
        if (fcmToken) {
            const payload = {
                notification: {
                    title: data.status,
                    body: messageHelper(data.status, data.runNo, data.documentType ? data.documentType : null)
                },
                token: fcmToken
            };
            await exports.admin.messaging().send(payload);
        }
    } catch (err) {
        // NO ACTION HERE
    }
};
