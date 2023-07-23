const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: env + '.env' });

const moment = require('moment');

exports.emailValidation = (email) => {
    const validate = {
        isValidated: false,
        message: ''
    };

    if (!email) {
        validate.message = `Email ${MESSAGES.FIELD_REQUIRED_MSG}`;
    } else if (!CONSTANTS.REGEX.EMAIL.test(email)) {
        validate.message = MESSAGES.INVALID_EMAIL;
    } else {
        validate.isValidated = true;
    }
    return validate;
};

exports.passwordValidation = (password) => {
    const validate = {
        isValidated: false,
        message: ''
    };
    if (!password) {
        validate.message = `Password ${MESSAGES.FIELD_REQUIRED_MSG}`;
    } else if (!CONSTANTS.REGEX.PASSWORD.test(password)) {
        validate.message = MESSAGES.INVALID_PASSWORD;
    } else {
        validate.isValidated = true;
    }
    return validate;
};

exports.confirmPasswordValidation = (newPassword, confirmPassword) => {
    const validate = {
        isValidated: false,
        message: ''
    };
    if (!confirmPassword) {
        validate.message = `Confirm Password ${MESSAGES.FIELD_REQUIRED_MSG}`;
    } else if (newPassword !== confirmPassword) {
        validate.message = MESSAGES.PASSWORD_NOT_MATCH;
    } else {
        validate.isValidated = true;
    }
    return validate;
};

exports.fieldRequiredValidation = (field, fieldName) => {
    const validate = {
        isValidated: false,
        message: ''
    };
    if (!field) {
        validate.message = `${fieldName} ${MESSAGES.FIELD_REQUIRED_MSG}`;
    } else {
        validate.isValidated = true;
    }
    return validate;
};

exports.fieldsRequiredValidation = (fields, fieldNames) => {
    const validate = {
        isValidated: false,
        message: ''
    };
    fields.forEach((field, index) => {
        if (!field) {
            validate.message = `${fieldNames[index]} ${MESSAGES.FIELD_REQUIRED_MSG}`;
        }
    });
    if (validate.message === '') {
        validate.isValidated = true;
    }
    return validate;
};

exports.facesheetName = (name) => {
    return CONSTANTS.REGEX.FACESHEET.NAME.test(name);
};

exports.genderValidation = (string) => {
    return CONSTANTS.REGEX.FACESHEET.GENDER.test(string);
};

exports.facesheetDate = (date) => {
    return CONSTANTS.REGEX.FACESHEET.DATE.test(date);
};

exports.phoneNumber = (number) => {
    return CONSTANTS.REGEX.FACESHEET.PHONE_NO.test(number);
};

exports.isValidDate = (dateString) => {
    return moment(dateString, 'YYYY-MM-DD', true).isValid();
};

exports.checkDateIntervalValidation = (startDateString, endDateString) => {
    const validate = {
        isValidated: false,
        message: ''
    };
    if (!exports.isValidDate(startDateString) || !exports.isValidDate(endDateString)) {
        validate.message = MESSAGES.INVALID_DATE_FORMAT;
        return { validate };
    }
    const startDate = moment(startDateString).startOf('day');
    const endDate = moment(endDateString).endOf('day');
    const minStartDate = moment(endDateString).startOf('day').subtract(CONSTANTS.DURATION.DEFAULT_MONTHS, 'months');
    if (minStartDate.isAfter(startDate) || endDate.isBefore(startDate)) {
        validate.message = MESSAGES.INVALID_DATE;
        return { validate, startDate, endDate };
    }
    validate.isValidated = true;
    return { validate, startDate, endDate };
};

exports.facesheetOCRValidation = (data) => {
    let confidence = 0;

    const keys = Object.keys(data);
    const requiredFields = CONSTANTS.OCR_VALIDATION.FACESHEET.REQUIRED;

    keys.forEach(key => {
        if (requiredFields.includes(key) && data[key]) {
            confidence += (CONSTANTS.CONFIDENCE.FACESHEET.REQUIRED_FIELDS / requiredFields.length);
        } else {
            confidence += data[key] ? (CONSTANTS.CONFIDENCE.FACESHEET.OTHER_FIELDS / (keys.length - requiredFields.length)) : 0;
        }
    });
    return confidence >= parseFloat(process.env.FACESHEET_CONFIDENCE_PERCENTAGE);
};

exports.patientDataValidation = (patient) => {
    return {
        name: patient.name ? exports.facesheetName(patient.name) : true,
        patientGender: patient.patientGender ? exports.genderValidation(patient.patientGender) : true,
        subscriberName: patient.subscriberName ? exports.facesheetName(patient.subscriberName) : true,
        insuranceContactNo: patient.insuranceContactNo ? exports.phoneNumber(patient.insuranceContactNo) : true,
        guarantorName: patient.guarantorName ? exports.facesheetName(patient.guarantorName) : true,
        guarantorGender: patient.guarantorGender ? exports.genderValidation(patient.guarantorGender) : true,
        contactNumber: patient.contactNumber ? exports.contactPhone(patient.contactNumber) : true
    };
};

exports.contactPhone = (number) => {
    return CONSTANTS.REGEX.PCS.CONTACT_PHONE.test(number);
};

exports.pcsOcrValidation = ({ data, signatures }) => {

    if (signatures.physicianSignature !== true) {
        return false;
    }

    let confidence = 0;
    const keys = Object.keys(data);
    const requiredFields = CONSTANTS.OCR_VALIDATION.PCS.REQUIRED;

    keys.forEach(key => {
        if (requiredFields.includes(key) && data[key]) {
            confidence += (CONSTANTS.CONFIDENCE.PCS.REQUIRED_FIELDS / requiredFields.length);
        } else {
            confidence += data[key] ? (CONSTANTS.CONFIDENCE.PCS.OTHER_FIELDS / (keys.length - requiredFields.length)) : 0;
        }
    });
    return confidence >= parseFloat(process.env.PCS_CONFIDENCE_PERCENTAGE);
};

