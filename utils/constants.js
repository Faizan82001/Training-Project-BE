module.exports = {
    ROLE: {
        BILLING_ADMIN: 2,
        BILLING_MNG: 1,
        NURSE: 3
    },
    STATUS: {
        INVITED: 'invited',
        ACTIVE: 'active',
        INACTIVE: 'inactive'
    },
    REGEX: {
        EMAIL:
      /^[A-Za-z0-9](\.?[A-Za-z0-9_-]){0,}@[A-Za-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/,
        PASSWORD:
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,20}$/,
        DOCUMENT_NAME: /^\d+-\w+\.jpg$/,
        FACESHEET: {
            NAME: /^[a-zA-Z '.]+$/,
            GENDER: /^(male|female|other)$/i,
            DATE: /^(0[1-9]|[1-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            PHONE_NO: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
        },
        PCS: {
            CONTACT_PHONE: /^(?:\d{3}[-. ])?\d{3}[-. ]\d{4}$|^\d{7}$|^\d{10}$/
        }
    },
    EMAIL: {
        LOCAL: 'shail.parekh@growexx.com',
        DEVELOPMENT: 'shail.parekh@growexx.com',
        PRODUCTION: 'shail.parekh@growexx.com',
        ISSUE_REPORT: 'faizan.gigani@yopmail.com'
    },
    EMAIL_TEMPLATE: {
        LOCAL: {
            SET_PASSWORD: 'd-a226800cef804b48939cc89cd8a363d8',
            REPORT_ISSUE: 'd-b7cf3aad226344aba75845f3da58ca97'
        },
        DEVELOPMENT: {
            SET_PASSWORD: 'd-a226800cef804b48939cc89cd8a363d8',
            REPORT_ISSUE: 'd-b7cf3aad226344aba75845f3da58ca97'
        },
        PRODUCTION: {
            SET_PASSWORD: 'd-a226800cef804b48939cc89cd8a363d8',
            REPORT_ISSUE: 'd-b7cf3aad226344aba75845f3da58ca97'
        }
    },
    AMBULANCE_TYPE: {
        ALS: 'ALS',
        BLS: 'BLS',
        CCT: 'CCT'
    },
    TRIP_STATUS: {
        NEW: 'New Request',
        REVIEW: 'Assigned for Review',
        MORE_INFO: 'Request more Information',
        DATA_PROVIDED: 'Data Provided',
        APPROVED: 'Approved',
        EXCEPTION: 'Approved with Exception'
    },
    DOCUMENT_TYPE: {
        face_sheet: 'faceSheet',
        pcs: 'pcs',
        aob: 'aob',
        other_1: 'other1',
        other_2: 'other2',
        other_3: 'other3',
        other_4: 'other4'
    },
    TRIP_NOTIFICATION: {
        UNASSIGNED_REQUEST: 'Unassigned Request',
        ASSIGNED_REQUEST: 'Assigned for Review',
        APPROVED_REQUEST: 'Approved Request',
        APPROVED_WITH_EXCEPTION: 'Approved with Exception',
        REQUEST_MORE_INFO: 'Request for more Infomation',
        NEW_COMMENT: 'New Comment',
        NEW_REQUEST: 'New Request',
        DATA_PROVIDED: 'Data Provided',
        OCR_FAILURE: 'OCR Failure'
    },
    MAPPING: {
        FACE_SHEET: {
            name: { field: 'Patient Name', parentField: 'PATIENT' },
            mrn: { field: 'MRN', parentField: 'PATIENT' },
            dob: { field: 'Birth Date', parentField: 'PATIENT' },
            patientGender: { field: 'Sex', parentField: 'PATIENT' },
            patientAddress: { field: 'Mailing address', parentField: 'PATIENT' },
            healthcareFacility: { field: 'Healthcare Facility', parentField: 'ENCOUNTER DETAIL' },
            admissionDate: { field: 'Encounter Date/Time', parentField: 'ENCOUNTER DETAIL' },
            admissionType: { field: 'Admission Type', parentField: 'ENCOUNTER DETAIL' },
            attendingPhysician: { field: 'Attending Physician', parentField: 'ENCOUNTER DETAIL' },
            thirdPartyPayer: { field: 'Company/Payor', parentField: 'PRIMARY INSURANCE' },
            subscriberName: { field: 'Subscriber Name', parentField: 'PRIMARY INSURANCE' },
            insuranceAddress: { field: 'Address', parentField: 'PRIMARY INSURANCE' },
            insuranceContactNo: { field: 'Phone Number', parentField: 'PRIMARY INSURANCE' },
            policyNo: { field: 'Member ID', parentField: 'PRIMARY INSURANCE' },
            insuranceGroupName: { field: 'Group Name', parentField: 'PRIMARY INSURANCE' },
            insuranceGroupNo: { field: 'Group Number', parentField: 'PRIMARY INSURANCE' },
            guarantorName: { field: 'Guarantor Name', parentField: 'GUARANTOR' },
            guarantorAddress: { field: 'Address', parentField: 'GUARANTOR' },
            guarantorCity: { field: 'City/State/ZIP', parentField: 'GUARANTOR' },
            guarantorGender: { field: 'Sex', parentField: 'GUARANTOR' },
            guarantorWeight: { field: 'Weight', parentField: 'GUARANTOR' },
            guarantorHeight: { field: 'Height', parentField: 'GUARANTOR' },
            relationship: { field: 'Relationship to Patient', parentField: 'GUARANTOR' },
            diagnosis: { field: 'Admitting Diagnosis', parentField: 'ENCOUNTER DETAIL' }
        },
        PCS: {
            pickupLocation: { field: 'PICKUPLOCATION' },
            pickupDateTime: { field: 'PICKUPDATETIME' },
            requestedBy: { field: 'TRANSPORTREQUESTEDBY' },
            contactNumber: { field: 'CONTACTPHONE' },
            pickupLocationunitRoom: { field: 'PICKUPLOCATIONUNITROOM' },
            sendingMD: { field: 'SENDINGMDNAMEPHONE' },
            destinationAddress: { field: 'DESTINATIONADDRESS' },
            destinationUnitRoom: { field: 'DESTINATIONADDRESSUNITROOM' },
            acceptingMD: { field: 'ACCEPTINGMDNAMEPH' },
            appointmentDateTime: { field: 'APPOINTMENTTIME' }
        }
    },
    OCR_VALIDATION: {
        FACESHEET: {
            REQUIRED: ['name', 'mrn', 'dob', 'patientGender']
        },
        PCS: {
            REQUIRED: ['pickupLocation', 'pickupDateTime', 'destinationAddress']
        }
    },
    DURATION: {
        DEFAULT_MONTHS: 3
    },
    PAGINATION: {
        LIMIT: 10
    },
    CONFIDENCE: {
        PCS: {
            REQUIRED_FIELDS: 65,
            OTHER_FIELDS: 35
        },
        FACESHEET: {
            REQUIRED_FIELDS: 40,
            OTHER_FIELDS: 60
        }
    }
};
