'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('patient', {
            id: {
                primaryKey: true,
                type: Sequelize.DataTypes.UUID
            },
            run_no: {
                type: Sequelize.DataTypes.INTEGER,
                reference: {
                    model: 'trip',
                    key: 'run_no_patient'
                },
                unique: true
            },
            name: {
                type: Sequelize.DataTypes.STRING
            },
            mrn: {
                type: Sequelize.DataTypes.STRING
            },
            dob: {
                type: Sequelize.DataTypes.DATE
            },
            patient_gender: {
                type: Sequelize.DataTypes.STRING
            },
            patient_address: {
                type: Sequelize.DataTypes.STRING
            },
            healthcare_facility: {
                type: Sequelize.DataTypes.STRING
            },
            admission_date: {
                type: Sequelize.DataTypes.DATE
            },
            admission_type: {
                type: Sequelize.DataTypes.STRING
            },
            attending_physician: {
                type: Sequelize.DataTypes.STRING
            },
            diagnostics: {
                type: Sequelize.DataTypes.STRING
            },
            third_party_payer: {
                type: Sequelize.DataTypes.STRING
            },
            subscriber_name: {
                type: Sequelize.DataTypes.STRING
            },
            insurance_address: {
                type: Sequelize.DataTypes.STRING
            },
            insurance_contact_no: {
                type: Sequelize.DataTypes.STRING
            },
            policy_no: {
                type: Sequelize.DataTypes.STRING
            },
            insurance_group_name: {
                type: Sequelize.DataTypes.STRING
            },
            insurance_group_no: {
                type: Sequelize.DataTypes.STRING
            },
            guarantor_name: {
                type: Sequelize.DataTypes.STRING
            },
            guarantor_address: {
                type: Sequelize.DataTypes.STRING
            },
            guarantor_gender: {
                type: Sequelize.DataTypes.STRING
            },
            guarantor_weight: {
                type: Sequelize.DataTypes.STRING
            },
            guarantor_height: {
                type: Sequelize.DataTypes.STRING
            },
            relationship: {
                type: Sequelize.DataTypes.STRING
            },
            diagnosis: {
                type: Sequelize.DataTypes.STRING
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    async down (queryInterface) {
        await queryInterface.dropTable('patient');
    }
};
