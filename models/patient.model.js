'use strict';

module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('patient', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            field: 'name',
            type: DataTypes.STRING
        },
        mrn: {
            field: 'mrn',
            type: DataTypes.STRING
        },
        dob: {
            field: 'dob',
            type: DataTypes.DATE
        },
        patientGender: {
            field: 'patient_gender',
            type: DataTypes.STRING
        },
        patientAddress: {
            field: 'patient_address',
            type: DataTypes.STRING
        },
        healthcareFacility: {
            field: 'healthcare_facility',
            type: DataTypes.STRING
        },
        admissionDate: {
            field: 'admission_date',
            type: DataTypes.DATE
        },
        admissionType: {
            field: 'admission_type',
            type: DataTypes.STRING
        },
        attendingPhysician: {
            field: 'attending_physician',
            type: DataTypes.STRING
        },
        thirdPartyPayer: {
            field: 'third_party_payer',
            type: DataTypes.STRING
        },
        subscriberName: {
            field: 'subscriber_name',
            type: DataTypes.STRING
        },
        insuranceAddress: {
            field: 'insurance_address',
            type: DataTypes.STRING
        },
        insuranceContactNo: {
            field: 'insurance_contact_no',
            type: DataTypes.STRING
        },
        policyNo: {
            field: 'policy_no',
            type: DataTypes.STRING
        },
        insuranceGroupName: {
            field: 'insurance_group_name',
            type: DataTypes.STRING
        },
        insuranceGroupNo: {
            field: 'insurance_group_no',
            type: DataTypes.STRING
        },
        guarantorName: {
            field: 'guarantor_name',
            type: DataTypes.STRING
        },
        guarantorAddress: {
            field: 'guarantor_address',
            type: DataTypes.STRING
        },
        guarantorGender: {
            field: 'guarantor_gender',
            type: DataTypes.STRING
        },
        guarantorWeight: {
            field: 'guarantor_weight',
            type: DataTypes.FLOAT
        },
        guarantorHeight: {
            field: 'guarantor_height',
            type: DataTypes.FLOAT
        },
        relationship: {
            field: 'relationship',
            type: DataTypes.STRING
        },
        diagnosis: {
            field: 'diagnosis',
            type: DataTypes.STRING
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            defaultValue: Date.now
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            defaultValue: Date.now
        },
        tripRunNo: {
            field: 'run_no',
            type: DataTypes.INTEGER,
            unique: true
        },
        pickupLocation: {
            field: 'pickup_location',
            type: DataTypes.STRING
        },
        pickupDateTime: {
            field: 'pickup_date_time',
            type: DataTypes.DATE
        },
        requestedBy: {
            field: 'transport_requested_by',
            type: DataTypes.STRING
        },
        contactNumber: {
            field: 'contact_number',
            type: DataTypes.STRING
        },
        pickupLocationunitRoom: {
            field: 'pickup_location_unit_room',
            type: DataTypes.STRING
        },
        sendingMD: {
            field: 'sending_md',
            type: DataTypes.STRING
        },
        destinationAddress: {
            field: 'destination_address',
            type: DataTypes.STRING
        },
        destinationUnitRoom: {
            field: 'destination_address_unit_room',
            type: DataTypes.STRING
        },
        acceptingMD: {
            field: 'accepting_md',
            type: DataTypes.STRING
        },
        appointmentDateTime: {
            field: 'appointment_date_time',
            type: DataTypes.DATE
        }
    }, {
        tableName: 'patient'
    });

    Patient.associate = (models) => {
        Patient.belongsTo(models.trip, {
            foreignKey: 'tripRunNo',
            as: 'run_no'
        });
    };

    return Patient;
};
